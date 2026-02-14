import { NextRequest, NextResponse } from 'next/server'
import { analyzeSentiment } from '@/lib/ai/gemini'

export async function POST(request: NextRequest) {
  try {
    const { reviewText } = await request.json()

    if (!reviewText) {
      return NextResponse.json(
        { error: 'Review text is required' },
        { status: 400 }
      )
    }

    const result = await analyzeSentiment(reviewText)

    return NextResponse.json(result)

  } catch (error) {
    const err = error as Error
    console.error('Analyze review error:', err)
    return NextResponse.json(
      { error: 'Gagal menganalisis review' },
      { status: 500 }
    )
  }
}
