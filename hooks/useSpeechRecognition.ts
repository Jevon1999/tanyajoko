'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { SpeechRecognition } from '@/lib/voice/speech-to-text'

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSupported, setIsSupported] = useState(false)
  
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (isInitialized) return
    
    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition
    
    // Check support and set state
    setIsSupported(recognition.isAvailable())
    setIsInitialized(true)

    recognition.onResult((text) => {
      setTranscript(text)
      setIsListening(false)
    })

    recognition.onError((err) => {
      setError(err)
      setIsListening(false)
    })

    recognition.onStart(() => {
      setIsListening(true)
      setError(null)
    })

    recognition.onEnd(() => {
      setIsListening(false)
    })

    // Check browser support
    if (recognition.isAvailable()) {
      setIsSupported(true)
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const startListening = useCallback((lang: 'id-ID' | 'en-US' | 'jv-ID' = 'id-ID') => {
    if (!recognitionRef.current) return

    setError(null)
    setTranscript('')
    
    try {
      recognitionRef.current.start(lang)
    } catch (err) {
      const error = err as Error
      setError(error.message)
    }
  }, [])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }, [])

  const resetTranscript = useCallback(() => {
    setTranscript('')
    setError(null)
  }, [])

  return {
    isListening,
    transcript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  }
}
