import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { chatWithContext } from '@/lib/ai/gemini'
import type { ChatMessage } from '@/lib/types/chat'
import type { Json } from '@/lib/database.types'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    // Defensive JSON parsing
    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const { message, userId, sessionId, language = 'id' } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Create Supabase client
    const supabase = await createClient()

    // Search for relevant destinations based on message keywords
    let query = supabase
      .from('destinations')
      .select('*')
      .limit(10)

    // Try to match category or location
    const categories = ['alam', 'budaya', 'kuliner', 'sejarah', 'modern', 'religi']
    const matchedCategory = categories.find(cat => 
      message.toLowerCase().includes(cat)
    )

    if (matchedCategory) {
      query = query.eq('category', matchedCategory)
    }

    const { data: destinations, error: destError } = await query

    if (destError) {
      console.error('Error fetching destinations:', destError)
    }

    // Get AI response with context (most likely failure point)
    let response: string
    try {
      response = await chatWithContext(
        message,
        // @ts-ignore - Supabase returns full row, but we only need subset for AI context
        destinations || [],
        language
      )
    } catch (aiError) {
      const err = aiError as Error
      console.error('Gemini AI error:', err)
      console.error('Possible causes: API key missing, timeout, rate limit, parsing error')
      return NextResponse.json(
        { 
          error: 'Maaf, asisten AI sedang tidak tersedia. Silakan coba lagi.',
          details: process.env.NODE_ENV === 'development' ? err.message : undefined
        },
        { status: 503 }
      )
    }

    // Save chat message if userId provided
    if (userId) {
      const chatMessage: ChatMessage = {
        role: 'user' as const,
        content: message,
        timestamp: new Date().toISOString()
      }

      if (sessionId) {
        // Update existing session with error handling
        const { data: session, error: sessionError } = await supabase
          .from('chat_sessions')
          .select('messages')
          .eq('id', sessionId)
          .single()

        if (sessionError) {
          console.error('Session fetch error:', sessionError)
          // Continue without saving - don't fail the chat response
        } else if (session) {
          // @ts-ignore - Supabase SSR v0.5.2 type inference bug
          const existingMessages = session.messages as unknown as ChatMessage[]
          const messages: ChatMessage[] = Array.isArray(existingMessages) ? existingMessages : []
          const newMessages: ChatMessage[] = [
            ...messages,
            chatMessage,
            { role: 'assistant' as const, content: response, timestamp: new Date().toISOString() }
          ]
          
          // @ts-ignore - Supabase SSR v0.5.2 type inference bug
          const { error: updateError } = await supabase
            .from('chat_sessions')
            .update({
              messages: newMessages as unknown as Json
            })
            .eq('id', sessionId)
          
          if (updateError) {
            console.error('Chat session update error:', updateError)
            console.error('Possible causes: RLS policy, invalid JSON type, permissions')
          }
        }
      } else {
        // Create new session with error handling
        const newMessages: ChatMessage[] = [
          chatMessage,
          { role: 'assistant' as const, content: response, timestamp: new Date().toISOString() }
        ]
        
        // @ts-ignore - Supabase SSR v0.5.2 type inference bug
        const { error: insertError } = await supabase
          .from('chat_sessions')
          .insert({
            user_id: userId,
            messages: newMessages as unknown as Json,
            language
          })
        
        if (insertError) {
          console.error('Chat session insert error:', insertError)
          console.error('Possible causes: RLS policy (user_id mismatch), invalid JSON type, missing auth')
        }
      }
    }

    return NextResponse.json({
      message: response,
      // Don't return destinations - let AI handle recommendations in text
    })

  } catch (error) {
    const err = error as Error
    console.error('Chat API error:', err)
    console.error('Error details:', {
      message: err.message,
      stack: err.stack,
      name: err.name
    })
    return NextResponse.json(
      { 
        error: 'Maaf, terjadi kesalahan saat menghubungi asisten AI.',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
      },
      { status: 500 }
    )
  }
}
