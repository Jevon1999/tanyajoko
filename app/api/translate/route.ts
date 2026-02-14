import { NextRequest, NextResponse } from 'next/server'
import { translateText } from '@/lib/ai/gemini'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { text, sourceLang = 'id', targetLang = 'en' } = await request.json()

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    if (!['id', 'en', 'jv'].includes(sourceLang) || !['id', 'en', 'jv'].includes(targetLang)) {
      return NextResponse.json(
        { error: 'Invalid language code' },
        { status: 400 }
      )
    }

    // Check cache first
    const supabase = createAdminClient()
    
    const { data: cached } = await supabase
      .from('translations')
      .select('translated_text')
      .eq('source_text', text)
      .eq('source_lang', sourceLang)
      .eq('target_lang', targetLang)
      .single()

    if (cached) {
      return NextResponse.json({
        translatedText: cached.translated_text,
        cached: true
      })
    }

    // Translate using Gemini
    const translatedText = await translateText(text, sourceLang, targetLang)

    // Cache the result
    // @ts-ignore - Supabase SSR v0.5.2 type inference bug
    await supabase
      .from('translations')
      .insert({
        source_text: text,
        source_lang: sourceLang,
        target_lang: targetLang,
        translated_text: translatedText
      })
      .select()

    return NextResponse.json({
      translatedText,
      cached: false
    })

  } catch (error) {
    const err = error as Error
    console.error('Translation error:', err)
    return NextResponse.json(
      { error: 'Gagal menerjemahkan teks' },
      { status: 500 }
    )
  }
}
