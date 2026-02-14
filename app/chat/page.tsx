'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'

interface ChatMessage {
  id: string
  role: 'user' | 'model'
  content: string
  recommendation?: {
    name: string
    location: string
    rating: number
    reviews: number
    description: string
    pros: string[]
    cons: string[]
    priceRange: string
    recommendationFor: string
    image?: string
  }
}

export default function ChatPage() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: '1', 
      role: 'model', 
      content: 'Halo! Saya Joko, asisten perjalanan Jogja kamu. Ada yang bisa saya bantu hari ini?' 
    }
  ])
  const [loading, setLoading] = useState(false)
  const [typing, setTyping] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [voiceMode, setVoiceMode] = useState<'manual' | 'auto'>('manual')
  const [detectedLang, setDetectedLang] = useState<'🇮🇩' | '🇬🇧' | '🏴'>('🇮🇩')
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Voice recognition
  const { 
    isListening, 
    transcript, 
    isSupported, 
    startListening, 
    stopListening,
    resetTranscript 
  } = useSpeechRecognition()

  // Update input when transcript changes
  useEffect(() => {
    if (transcript) {
      setInput(transcript)
      
      // Auto-send mode untuk voice chat (berguna saat di jalan)
      if (voiceMode === 'auto' && !isListening && transcript.length > 10) {
        handleSendWithVoice(transcript)
      }
    }
  }, [transcript, isListening, voiceMode])

  // Detect language from input
  useEffect(() => {
    if (input.length > 5) {
      const lowerInput = input.toLowerCase()
      const englishWords = ['recommend', 'where', 'what', 'how', 'can', 'please', 'thank', 'help', 'show', 'want', 'best', 'good']
      const javaneseWords = ['matur', 'nuwun', 'punapa', 'kados', 'pundi', 'wonten', 'saged', 'nggih']
      
      const hasEnglish = englishWords.some(word => lowerInput.includes(word))
      const hasJavanese = javaneseWords.some(word => lowerInput.includes(word))
      
      if (hasJavanese) setDetectedLang('🏴')
      else if (hasEnglish) setDetectedLang('🇬🇧')
      else setDetectedLang('🇮🇩')
    }
  }, [input])

  // Reset transcript after sending message
  const handleSendWithVoice = async (message: string) => {
    await handleSend(message)
    resetTranscript()
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading, typing])

  // Typing animation helper
  const simulateTyping = async (fullText: string, messageId: string) => {
    setTyping(true)
    const words = fullText.split(' ')
    let currentText = ''
    
    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? ' ' : '') + words[i]
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, content: currentText + '...' }
            : msg
        )
      )
      
      // Variable delay berdasarkan panjang kata
      const delay = words[i].length > 8 ? 100 : 50
      await new Promise(resolve => setTimeout(resolve, delay))
    }
    
    // Final update tanpa '...'
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, content: fullText }
          : msg
      )
    )
    setTyping(false)
  }

  const handleSend = async (text: string) => {
    if (!text.trim()) return
    
    const userMsg: ChatMessage = { 
      id: Date.now().toString(), 
      role: 'user', 
      content: text 
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language: 'id' })
      })

      const data = await response.json()
      
      // Check if response has error
      if (!response.ok || data.error) {
        throw new Error(data.error || `HTTP ${response.status}: ${data.details || 'Unknown error'}`)
      }
      
      const modelMsg: ChatMessage = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        content: '' // Start empty untuk typing effect
      }

      // If there are destinations, add first as recommendation
      if (data.destinations && data.destinations.length > 0) {
        const dest = data.destinations[0]
        modelMsg.recommendation = {
          name: dest.name,
          location: dest.location,
          rating: dest.rating || 0,
          reviews: 0,
          description: dest.description || '',
          pros: dest.pros || ['Tempat menarik', 'Cocok untuk foto'],
          cons: dest.cons || ['Bisa ramai di weekend'],
          priceRange: dest.price_range || 'Gratis',
          recommendationFor: dest.recommendation_for?.[0] || 'Semua pengunjung',
          image: dest.image_url
        }
      }

      // Add message with empty content first
      setMessages(prev => [...prev, modelMsg])
      setLoading(false)
      
      // Simulate typing animation
      await simulateTyping(data.message || 'Maaf, terjadi kesalahan. Coba lagi ya!', modelMsg.id)
    } catch (error) {
      console.error('Chat error:', error)
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: 'Maaf, terjadi kesalahan koneksi. Silakan coba lagi.'
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30
        w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 
        flex flex-col bg-white dark:bg-slate-900 transition-transform duration-300
      `}>
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-icons-round text-white text-lg">explore</span>
            </div>
            <div>
              <h1 className="font-bold text-base leading-none text-slate-900 dark:text-white">Tanya <span className="text-primary">Joko</span></h1>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Travel Guide</span>
            </div>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-6">
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-1.5">
              <button 
                onClick={() => handleSend('Rekomendasi tempat tersembunyi di Jogja')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-primary/10 text-slate-800 dark:text-slate-200 hover:bg-primary/20 transition-colors text-xs font-medium"
              >
                <span className="material-icons-round text-primary text-base">diamond</span> Hidden Gems
              </button>
              <button 
                onClick={() => handleSend('Tempat makan murah tapi enak di Jogja')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                <span className="material-icons-round text-slate-400 text-base">payments</span> Cheap Eats
              </button>
              <button 
                onClick={() => handleSend('Tempat wisata alam di Jogja')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                <span className="material-icons-round text-slate-400 text-base">nature</span> Nature Spots
              </button>
              <button 
                onClick={() => handleSend('Candi dan situs sejarah di Jogja')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                <span className="material-icons-round text-slate-400 text-base">account_balance</span> Heritage Sites
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950">
        <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-4 sm:px-6 z-10 shrink-0">
          <div className="flex items-center gap-2.5">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <span className="material-icons-round text-slate-600 dark:text-slate-400 text-lg">menu</span>
            </button>
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
            <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">Chat with Joko</span>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
              <span className="material-icons-round text-base">home</span> 
              <span className="hidden sm:inline">Home</span>
            </Link>
          </div>
        </header>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

        <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'gap-2 sm:gap-4'}`}>
              {msg.role === 'model' && (
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-900 dark:bg-primary flex items-center justify-center shrink-0 shadow-lg">
                  <span className="material-icons-round text-sm sm:text-base text-primary dark:text-background-dark">smart_toy</span>
                </div>
              )}
              <div className={`max-w-[90%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[70%] space-y-3 ${msg.role === 'user' ? 'bg-primary text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl rounded-tr-none shadow text-sm sm:text-base font-medium' : ''}`}>
                {msg.role === 'model' && (
                  <div className="bg-white dark:bg-slate-800 px-3 sm:px-5 py-3 sm:py-4 rounded-2xl rounded-tl-none shadow-md border border-slate-200 dark:border-slate-700">
                    <ReactMarkdown
                      components={{
                        p: ({children}) => <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-2">{children}</p>,
                        ul: ({children}) => <ul className="my-2 list-disc pl-4 sm:pl-5 space-y-1">{children}</ul>,
                        ol: ({children}) => <ol className="my-2 list-decimal pl-4 sm:pl-5 space-y-1">{children}</ol>,
                        li: ({children}) => <li className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">{children}</li>,
                        strong: ({children}) => <strong className="font-bold text-slate-900 dark:text-white">{children}</strong>,
                        em: ({children}) => <em className="italic text-slate-700 dark:text-slate-300">{children}</em>,
                        h1: ({children}) => <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 mt-3">{children}</h1>,
                        h2: ({children}) => <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 mt-3">{children}</h2>,
                        h3: ({children}) => <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 mt-3">{children}</h3>,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                )}
                {msg.role === 'user' && msg.content}
                
                {msg.recommendation && (
                  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg max-w-2xl">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        className="w-full h-full object-cover" 
                        src={msg.recommendation.image || `https://images.unsplash.com/photo-1523428096881-f7b6beec67e6?w=800&auto=format&fit=crop`} 
                        alt={msg.recommendation.name} 
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-slate-800 shadow-sm flex items-center gap-1">
                        <span className="material-icons-round text-sm text-yellow-500">star</span> {msg.recommendation.rating.toFixed(1)}
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">{msg.recommendation.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                          <span className="material-icons-round text-sm">location_on</span>
                          <span>{msg.recommendation.location}</span>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {msg.recommendation.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 dark:bg-green-500/10 p-4 rounded-xl border border-green-100 dark:border-green-500/20">
                          <p className="text-[10px] font-extrabold text-green-700 dark:text-green-400 uppercase tracking-widest mb-2">Kelebihan</p>
                          <ul className="text-xs space-y-1.5 text-green-800 dark:text-green-300">
                            {msg.recommendation.pros.map((p, i) => (
                              <li key={i} className="flex gap-2">
                                <span className="material-icons-round text-xs">check_circle</span> {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-red-50 dark:bg-red-500/10 p-4 rounded-xl border border-red-100 dark:border-red-500/20">
                          <p className="text-[10px] font-extrabold text-red-700 dark:text-red-400 uppercase tracking-widest mb-2">Kekurangan</p>
                          <ul className="text-xs space-y-1.5 text-red-800 dark:text-red-300">
                            {msg.recommendation.cons.map((c, i) => (
                              <li key={i} className="flex gap-2">
                                <span className="material-icons-round text-xs">remove_circle</span> {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Estimasi Biaya</p>
                          <p className="font-bold text-slate-700 dark:text-slate-200">{msg.recommendation.priceRange}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Rekomendasi Untuk</p>
                          <p className="font-bold text-slate-700 dark:text-slate-200">{msg.recommendation.recommendationFor}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {(loading || typing) && (
            <div className="flex gap-2 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-900 dark:bg-primary flex items-center justify-center shrink-0 shadow-lg">
                <span className="material-icons-round text-sm sm:text-base text-primary dark:text-background-dark animate-pulse">smart_toy</span>
              </div>
              <div className="bg-white dark:bg-slate-800 px-3 sm:px-5 py-3 sm:py-4 rounded-2xl rounded-tl-none shadow-md border border-slate-200 dark:border-slate-700">
                <div className="flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                  <span className="text-xs sm:text-sm text-slate-400 ml-2">{typing ? 'Joko sedang mengetik...' : 'Menghubungi AI...'}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6 bg-gradient-to-t from-slate-50 dark:from-slate-900 via-slate-50/95 dark:via-slate-900/95 to-transparent shrink-0">
          <div className="max-w-4xl mx-auto space-y-3">
            {/* Voice mode toggle - visible saat voice aktif */}
            {isSupported && (
              <div className="flex items-center justify-between px-3 py-2 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span className="material-icons-round text-sm text-slate-600 dark:text-slate-400">mic</span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">Voice Mode:</span>
                </div>
                <div className="flex gap-1 bg-slate-100 dark:bg-slate-700 p-0.5 rounded-lg">
                  <button
                    onClick={() => setVoiceMode('manual')}
                    className={`px-3 py-1 text-xs rounded transition-all ${
                      voiceMode === 'manual' 
                        ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white font-semibold shadow-sm' 
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Manual
                  </button>
                  <button
                    onClick={() => setVoiceMode('auto')}
                    className={`px-3 py-1 text-xs rounded transition-all ${
                      voiceMode === 'auto' 
                        ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white font-semibold shadow-sm' 
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Auto-Send
                  </button>
                </div>
              </div>
            )}
            
            {/* Input area */}
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-2 flex items-center gap-2 focus-within:ring-2 focus-within:ring-primary/50 transition-all">              {/* Language indicator */}
              {input.length > 5 && (
                <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs font-medium text-slate-600 dark:text-slate-300">
                  <span>{detectedLang}</span>
                </div>
              )}
                            {/* Image upload button - hidden on mobile */}
              <button className="hidden sm:flex w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors items-center justify-center">
                <span className="material-icons-round text-lg">add_photo_alternate</span>
              </button>
              <input
                ref={inputRef}
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2.5 px-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500" 
                placeholder={isListening ? 'Sedang mendengarkan...' : 'Tanya apapun tentang Jogja...'}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendWithVoice(input)}
                disabled={isListening && voiceMode === 'auto'}
              />
              <button 
                onClick={() => {
                  if (isListening) {
                    stopListening()
                    // Auto-send jika mode auto dan ada transcript
                    if (voiceMode === 'auto' && transcript.length > 10) {
                      handleSendWithVoice(transcript)
                    }
                  } else {
                    startListening('id-ID')
                  }
                }}
                disabled={!isSupported || loading}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg transition-all flex items-center justify-center shadow-sm ${
                  isListening 
                    ? 'bg-red-500 text-white ring-2 ring-red-300 animate-pulse' 
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'
                } ${!isSupported || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                title={!isSupported ? 'Voice not supported in this browser' : (isListening ? `Stop (${voiceMode === 'auto' ? 'Auto-send' : 'Manual'})` : 'Voice input')}
              >
                <span className="material-icons-round text-lg">{isListening ? 'stop_circle' : 'mic'}</span>
              </button>
              <button 
                onClick={() => handleSendWithVoice(input)}
                className="w-10 h-9 sm:w-12 sm:h-10 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                disabled={loading || typing || !input.trim()}
              >
                <span className="material-icons-round text-lg sm:text-xl">send</span>
              </button>
            </div>
            
            {/* Voice hint */}
            {isListening && (
              <div className="flex items-center justify-center gap-2 text-xs text-red-500 animate-pulse">
                <span className="material-icons-round text-sm">mic</span>
                <span>{voiceMode === 'auto' ? 'Berbicara... (akan terkirim otomatis)' : 'Berbicara... (tekan Stop lalu Send)'}</span>
              </div>
            )}
            
            <p className="text-center text-[10px] text-slate-500 dark:text-slate-400">
              Joko supports 🇮🇩 Indonesian, 🇬🇧 English, and Javanese. Voice {voiceMode === 'auto' ? 'auto-send' : 'manual'} mode.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
