import { NextRequest, NextResponse } from 'next/server'
import { generateItinerary } from '@/lib/ai/gemini'
import { createClient } from '@/lib/supabase/server'
import type { Json } from '@/lib/database.types'

export async function POST(request: NextRequest) {
  try {
    const { duration, budget, preferences, userId } = await request.json()

    if (!duration || !budget) {
      return NextResponse.json(
        { error: 'Duration and budget are required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Fetch destinations matching preferences
    let query = supabase
      .from('destinations')
      .select('*')

    if (preferences && preferences.length > 0) {
      query = query.in('category', preferences)
    }

    const { data: destinations } = await query.limit(20)

    // Generate itinerary using AI
    const itinerary = await generateItinerary({
      duration,
      budget,
      preferences: preferences || [],
      // @ts-ignore - Supabase returns full row, but we only need subset for AI context
      destinations: destinations || []
    })

    // Save if user is authenticated
    if (userId) {
      // @ts-ignore - Supabase SSR v0.5.2 type inference bug
      await supabase
        .from('itineraries')
        .insert({
          user_id: userId,
          duration_days: duration,
          budget,
          preferences,
          generated_plan: itinerary as unknown as Json,
          title: `Itinerary ${duration} hari - Rp ${budget.toLocaleString('id-ID')}`
        })
    }

    return NextResponse.json({
      itinerary,
      success: true
    })

  } catch (error) {
    const err = error as Error
    console.error('Itinerary API error:', err)
    return NextResponse.json(
      { error: 'Gagal membuat itinerary' },
      { status: 500 }
    )
  }
}
