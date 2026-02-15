import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const lat = parseFloat(searchParams.get('lat') || '0')
    const lng = parseFloat(searchParams.get('lng') || '0')
    const radius = parseFloat(searchParams.get('radius') || '5') // km
    const category = searchParams.get('category')

    if (!lat || !lng) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Use the database function for nearby search
    // @ts-expect-error - Supabase RPC function not in generated types
    const { data, error } = await supabase
      .rpc('get_nearby_destinations', {
        user_lat: lat,
        user_lng: lng,
        radius_km: radius,
        category_filter: category
      })

    if (error) {
      console.error('Nearby search error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch nearby destinations' },
        { status: 500 }
      )
    }

    // @ts-ignore - data type inference
    return NextResponse.json({
      destinations: data || [],
      count: Array.isArray(data) ? data.length : 0,
      radius,
      userLocation: { lat, lng }
    })

  } catch (error) {
    const err = error as Error
    console.error('Nearby API error:', err)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mencari tempat terdekat' },
      { status: 500 }
    )
  }
}
