import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateItinerary } from '@/lib/ai/gemini'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { days, budget, preferences } = await req.json()

    // Fetch destinations from Supabase based on preferences
    let query = supabase.from('destinations').select('*')

    // Filter by preferences if any
    if (preferences && preferences.length > 0) {
      query = query.in('category', preferences)
    }

    const { data: destinations, error } = await query.limit(15)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Gagal mengambil data destinasi' },
        { status: 500 }
      )
    }

    if (!destinations || destinations.length === 0) {
      return NextResponse.json(
        { error: 'Tidak ada destinasi yang sesuai dengan preferensi Anda' },
        { status: 404 }
      )
    }

    // Generate itinerary using AI
    const itinerary = await generateItinerary({
      duration: days,
      budget: budget,
      preferences: preferences,
      destinations: destinations as any,
    })

    return NextResponse.json({ itinerary })
  } catch (error) {
    console.error('Error in planner API:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat membuat itinerary' },
      { status: 500 }
    )
  }
}
