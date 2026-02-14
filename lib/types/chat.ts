// Chat message types
export interface ChatMessage {
  role: 'user' | 'assistant' | 'model'
  content: string
  timestamp: string
  recommendation?: {
    name: string
    location: string
    description: string
    rating?: number
    estimatedCost: string
    image?: string
    mapLink?: string
  }
}

export interface ChatSession {
  id: string
  user_id: string | null
  messages: ChatMessage[]
  language: string
  created_at: string
  updated_at: string
}
