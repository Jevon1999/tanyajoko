'use client'

import type { SpeechRecognitionInterface, SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from '@/lib/types/speech'

export class SpeechRecognition {
  private recognition: SpeechRecognitionInterface | null = null
  private isSupported: boolean

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionClass =
        window.SpeechRecognition || window.webkitSpeechRecognition
      
      this.isSupported = !!SpeechRecognitionClass
      
      if (this.isSupported && SpeechRecognitionClass) {
        this.recognition = new SpeechRecognitionClass()
        this.recognition.continuous = false
        this.recognition.interimResults = false
        this.recognition.maxAlternatives = 1
      }
    } else {
      this.isSupported = false
    }
  }

  isAvailable(): boolean {
    return this.isSupported
  }

  start(lang: 'id-ID' | 'en-US' | 'jv-ID' = 'id-ID'): void {
    if (!this.isSupported || !this.recognition) {
      throw new Error('Speech recognition tidak didukung di browser ini')
    }

    this.recognition.lang = lang
    this.recognition.start()
  }

  stop(): void {
    if (this.recognition) {
      this.recognition.stop()
    }
  }

  onResult(callback: (transcript: string) => void): void {
    if (this.recognition) {
      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript
        callback(transcript)
      }
    }
  }

  onError(callback: (error: string) => void): void {
    if (this.recognition) {
      this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        let errorMessage = 'Terjadi kesalahan'
        
        switch (event.error) {
          case 'no-speech':
            errorMessage = 'Tidak ada suara terdeteksi'
            break
          case 'audio-capture':
            errorMessage = 'Mikrofon tidak dapat diakses'
            break
          case 'not-allowed':
            errorMessage = 'Akses mikrofon ditolak'
            break
          case 'network':
            errorMessage = 'Koneksi bermasalah'
            break
          default:
            errorMessage = `Error: ${event.error}`
        }
        
        callback(errorMessage)
      }
    }
  }

  onStart(callback: () => void): void {
    if (this.recognition) {
      this.recognition.onstart = callback
    }
  }

  onEnd(callback: () => void): void {
    if (this.recognition) {
      this.recognition.onend = callback
    }
  }
}

// Helper function untuk check support
export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false
  
  const SpeechRecognitionClass =
    window.SpeechRecognition || window.webkitSpeechRecognition
  
  return !!SpeechRecognitionClass
}
