import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set in environment variables')
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export interface AIRecommendation {
  name: string
  location: string
  description: string
  rating?: number
  estimatedCost: string
  pros: string[]
  cons: string[]
  recommendedFor: string[]
  tips?: string
  imageKeyword?: string
}

interface Destination {
  name: string
  location: string  
  category: string | null
  price_range: string | null
  rating: number | null
  description?: string | null
}

// Schema untuk structured output
const recommendationSchema = {
  type: SchemaType.OBJECT,
  properties: {
    name: { type: SchemaType.STRING, description: "Nama tempat wisata" },
    location: { type: SchemaType.STRING, description: "Lokasi detail di Jogja" },
    description: { type: SchemaType.STRING, description: "Deskripsi singkat dan menarik" },
    rating: { type: SchemaType.NUMBER, description: "Rating 0-5" },
    estimatedCost: { type: SchemaType.STRING, description: "Estimasi biaya dalam IDR" },
    pros: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "Kelebihan tempat ini"
    },
    cons: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "Kekurangan tempat ini"
    },
    recommendedFor: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "Cocok untuk siapa"
    },
    tips: { type: SchemaType.STRING, description: "Tips praktis untuk pengunjung" },
    imageKeyword: { type: SchemaType.STRING, description: "Keyword untuk mencari gambar" }
  },
  required: ["name", "location", "description", "estimatedCost", "pros", "cons", "recommendedFor"]
}

// Model 1: Conversational (Ringkas) - untuk chat sehari-hari
const conversationalModel = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  systemInstruction: `Kamu adalah Joko, asisten wisata Jogja yang ramah dan to-the-point.

ATURAN PENTING:
1. Jawaban maksimal 12 baris (ringkas!)
2. Jika pertanyaan umum → jawab langsung tanpa basa-basi
3. Jika user tidak jelas → tanya balik secara singkat
4. Hindari kalimat pembuka panjang
5. Jangan ulang informasi yang sudah jelas
6. Gunakan markdown (**, -, list) untuk struktur jelas
7. Jika jawaban >15 baris → ringkas jadi bullet points
8. MULTI-BAHASA: Deteksi bahasa user dan jawab DENGAN BAHASA YANG SAMA
   - Bahasa Indonesia (default)
   - English
   - Bahasa Jawa
9. Jangan pernah switch bahasa di tengah percakapan

Prioritas: Singkat, padat, informatif, bahasa yang konsisten.`,
  generationConfig: {
    temperature: 0.7,
    topP: 0.9,
    maxOutputTokens: 500, // Batasi untuk jawaban ringkas
  }
})

// Model 2: Intent Detection - klasifikasi user intent
const intentModel = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  generationConfig: { 
    maxOutputTokens: 20,
    temperature: 0.3 
  }
})

// Model 3: Structured Recommendation - untuk rekomendasi terstruktur
const structuredModel = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  generationConfig: {
    temperature: 0.5,
  }
})

// Model 4: Utility - untuk translation, sentiment, dll
const utilityModel = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  generationConfig: {
    temperature: 0.6,
    maxOutputTokens: 800
  }
})

// Detect user intent
async function detectIntent(message: string): Promise<'casual' | 'recommendation' | 'itinerary' | 'translation' | 'sentiment'> {
  try {
    const prompt = `Klasifikasikan intent dari pesan ini:
"${message}"

Pilihan:
- casual (obrolan umum, tanya info)
- recommendation (minta rekomendasi tempat spesifik)
- itinerary (minta rencana perjalanan multi-hari)
- translation (terjemahkan)
- sentiment (analisis perasaan)

Jawab satu kata saja.`

    const result = await intentModel.generateContent(prompt)
    const intent = result.response.text().trim().toLowerCase() as 'casual' | 'recommendation' | 'itinerary' | 'translation' | 'sentiment'
    
    // Validate intent
    if (['casual', 'recommendation', 'itinerary', 'translation', 'sentiment'].includes(intent)) {
      return intent
    }
    
    return 'casual' // default
  } catch (error) {
    console.error('Intent detection error:', error)
    return 'casual' // fallback
  }
}

// Detect language dari user message
async function detectLanguage(message: string): Promise<'id' | 'en' | 'jv'> {
  try {
    // Simple heuristic detection
    const lowerMsg = message.toLowerCase()
    
    // English indicators
    const englishWords = ['recommend', 'where', 'what', 'how', 'can', 'please', 'thank', 'help', 'show', 'want']
    const hasEnglish = englishWords.some(word => lowerMsg.includes(word))
    
    // Javanese indicators
    const javaneseWords = ['matur', 'nuwun', 'punapa', 'kados', 'pundi', 'wonten', 'saged', 'nggih']
    const hasJavanese = javaneseWords.some(word => lowerMsg.includes(word))
    
    if (hasJavanese) return 'jv'
    if (hasEnglish) return 'en'
    return 'id' // default Indonesian
  } catch (error) {
    console.error('Language detection error:', error)
    return 'id' // fallback
  }
}

// Chat dengan konteks dari database
export async function chatWithContext(
  userMessage: string,
  contextDestinations: Destination[] = [],
  _language: 'id' | 'en' | 'jv' = 'id' // Prefix with _ to mark as intentionally unused
) {
  try {
    // Detect intent and language
    const [intent, detectedLang] = await Promise.all([
      detectIntent(userMessage),
      detectLanguage(userMessage)
    ])
    
    let prompt = userMessage

    // Add language hint to prompt
    const langHint = detectedLang === 'en' ? 'Respond in English.' : 
                     detectedLang === 'jv' ? 'Respond in Javanese (Bahasa Jawa).' : 
                     'Respond in Indonesian (Bahasa Indonesia).'
    
    // Jika ada konteks destinasi, tambahkan ke prompt
    if (contextDestinations.length > 0) {
      const destinationsContext = contextDestinations.map(d => 
        `${d.name} (${d.location}) - ${d.category || 'General'} - ${d.price_range || 'Varies'} - Rating: ${d.rating || 0}/5`
      ).join('\n')

      prompt = `${langHint}\n\nBerdasarkan data destinasi berikut:\n${destinationsContext}\n\nPertanyaan user: ${userMessage}`
    } else {
      prompt = `${langHint}\n\n${userMessage}`
    }

    // Route berdasarkan intent
    if (intent === 'recommendation') {
      // Use structured output untuk recommendation
      const result = await structuredModel.generateContent({
        contents: [{
          role: 'user',
          parts: [{ text: `Berikan rekomendasi wisata Jogja untuk: ${userMessage}. Sertakan detail lengkap.` }]
        }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: recommendationSchema
        }
      })
      
      const data = JSON.parse(result.response.text()) as AIRecommendation
      
      // Format as markdown for chat display
      return `**${data.name}** 📍 ${data.location}

${data.description}

⭐ **Rating:** ${data.rating || 'N/A'}/5
💰 **Estimasi Biaya:** ${data.estimatedCost}

✅ **Kelebihan:**
${data.pros.map(p => `- ${p}`).join('\n')}

⚠️ **Kekurangan:**
${data.cons.map(c => `- ${c}`).join('\n')}

👥 **Cocok untuk:** ${data.recommendedFor.join(', ')}
${data.tips ? `\n💡 **Tips:** ${data.tips}` : ''}`
    }

    // Untuk casual chat - gunakan conversational model
    const result = await conversationalModel.generateContent(prompt)
    const response = result.response.text()

    return response
  } catch (error) {
    const err = error as { message: string; status?: number; statusText?: string }
    console.error('Error in chatWithContext:', err)
    console.error('Gemini API error details:', {
      message: err.message,
      status: err.status,
      statusText: err.statusText
    })
    throw new Error(`Maaf, terjadi kesalahan saat menghubungi asisten AI: ${err.message}`)
  }
}

// Translate text
export async function translateText(
  text: string,
  sourceLang: 'id' | 'en' | 'jv',
  targetLang: 'id' | 'en' | 'jv'
) {
  if (sourceLang === targetLang) return text

  try {
    const langNames = {
      id: 'Bahasa Indonesia',
      en: 'English',
      jv: 'Bahasa Jawa (Javanese)'
    }

    const prompt = `Terjemahkan teks berikut dari ${langNames[sourceLang]} ke ${langNames[targetLang]}. 
Jaga nuansa dan konteks. Jika ada istilah khusus yang tidak ada padanannya, pertahankan dengan penjelasan singkat.

Teks: ${text}

Terjemahan:`

    const result = await utilityModel.generateContent(prompt)
    return result.response.text().trim()
  } catch (error) {
    console.error('Error in translateText:', error)
    return text // Fallback to original text
  }
}

// Analisis sentiment dari review
export async function analyzeSentiment(reviewText: string) {
  try {
    const prompt = `Analisis review wisata berikut dan berikan hasil dalam format JSON:

Review: "${reviewText}"

Format JSON:
{
  "sentiment": "positive" | "neutral" | "negative",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "confidence": 0.0-1.0
}

Jawab hanya JSON, tanpa penjelasan tambahan.`

    const result = await utilityModel.generateContent(prompt)
    const text = result.response.text()
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }

    // Fallback
    return {
      sentiment: 'neutral',
      keywords: [],
      confidence: 0.5
    }
  } catch (error) {
    console.error('Error in analyzeSentiment:', error)
    return {
      sentiment: 'neutral',
      keywords: [],
      confidence: 0
    }
  }
}

// Analisis gambar destinasi
export async function analyzeImage(imageUrl: string) {
  try {
    const prompt = `Analisis foto destinasi wisata ini. Berikan hasil dalam format JSON:

{
  "description": "deskripsi detail apa yang terlihat di foto",
  "aestheticScore": 1-10,
  "detectedPlace": "nama tempat jika bisa dikenali, atau null",
  "suggestions": ["saran untuk pengunjung"]
}

Jawab hanya JSON.`

    // Fetch image and convert to base64
    const response = await fetch(imageUrl)
    const buffer = await response.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')

    const visionModel = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
    })

    const result = await visionModel.generateContent([
      prompt,
      {
        inlineData: {
          data: base64,
          mimeType: 'image/jpeg'
        }
      }
    ])

    const text = result.response.text()
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }

    return {
      description: 'Foto destinasi wisata',
      aestheticScore: 7,
      detectedPlace: null,
      suggestions: []
    }
  } catch (error) {
    console.error('Error in analyzeImage:', error)
    return {
      description: 'Tidak dapat menganalisis gambar',
      aestheticScore: 0,
      detectedPlace: null,
      suggestions: []
    }
  }
}

// Generate itinerary
export async function generateItinerary(params: {
  duration: number
  budget: number
  preferences: string[]
  destinations: Destination[]
}) {
  try {
    const { duration, budget, preferences, destinations } = params

    const destinationsContext = destinations.map(d => 
      `${d.name} (${d.location}) - ${d.category} - ${d.price_range} - ${d.description}`
    ).join('\n\n')

    const prompt = `Buatkan itinerary wisata Jogja selama ${duration} hari dengan budget Rp ${budget.toLocaleString('id-ID')}.

Preferensi wisatawan: ${preferences.join(', ')}

Destinasi yang tersedia:
${destinationsContext}

Buat itinerary dalam format JSON:
{
  "day1": [
    {
      "time": "08:00",
      "destination": "Nama Tempat",
      "activity": "Aktivitas yang dilakukan",
      "estimatedCost": "Rp 50.000",
      "estimatedDuration": "2 jam",
      "transport": "Grab/Gojek/Motor/Jalan kaki"
    }
  ],
  "day2": [...],
  "totalEstimatedCost": "Rp 500.000",
  "tips": ["tip1", "tip2"]
}

Pertimbangkan:
- Lokasi yang berdekatan untuk efisiensi
- Waktu terbaik berkunjung (hindari panas tengah hari untuk outdoor)
- Budget breakdown yang realistis
- Waktu makan dan istirahat
- Transportasi antar lokasi

Jawab hanya JSON.`

    const itineraryModel = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 2048, // Lebih besar untuk itinerary
      }
    })

    const result = await itineraryModel.generateContent(prompt)
    const text = result.response.text()
    
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }

    throw new Error('Failed to parse itinerary')
  } catch (error) {
    console.error('Error in generateItinerary:', error)
    throw new Error('Gagal membuat itinerary')
  }
}
