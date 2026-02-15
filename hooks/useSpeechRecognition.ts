'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { SpeechRecognition } from '@/lib/voice/speech-to-text'

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSupported, setIsSupported] = useState(false)
  
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const isInitializedRef = useRef(false)

  useEffect(() => {
    if (isInitializedRef.current) return
    
    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition
    isInitializedRef.current = true

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

    // Check browser support asynchronously
    Promise.resolve(recognition.isAvailable()).then((supported) => {
      setIsSupported(supported)
    })

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
