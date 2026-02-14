'use client'

import { useState, useEffect, useCallback } from 'react'
import { speak, stop, loadVoices, isSpeechSynthesisSupported } from '@/lib/voice/text-to-speech'

export function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    setIsSupported(isSpeechSynthesisSupported())
    
    if (isSpeechSynthesisSupported()) {
      loadVoices().then(setVoices)
    }
  }, [])

  const speakText = useCallback(
    async (
      text: string,
      lang: 'id-ID' | 'en-US' | 'jv-ID' = 'id-ID',
      rate: number = 1,
      pitch: number = 1
    ) => {
      try {
        setIsSpeaking(true)
        await speak(text, lang, rate, pitch)
      } catch (error) {
        console.error('TTS Error:', error)
      } finally {
        setIsSpeaking(false)
      }
    },
    []
  )

  const stopSpeaking = useCallback(() => {
    stop()
    setIsSpeaking(false)
  }, [])

  return {
    isSpeaking,
    voices,
    isSupported,
    speak: speakText,
    stop: stopSpeaking,
  }
}
