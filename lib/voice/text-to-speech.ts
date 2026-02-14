'use client'

export async function speak(
  text: string,
  lang: 'id-ID' | 'en-US' | 'jv-ID' = 'id-ID',
  rate: number = 1,
  pitch: number = 1
): Promise<void> {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    throw new Error('Text-to-speech tidak didukung di browser ini')
  }

  return new Promise((resolve, reject) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = rate
    utterance.pitch = pitch

    // Try to find appropriate voice
    const voices = window.speechSynthesis.getVoices()
    const voice = voices.find(v => v.lang.startsWith(lang.split('-')[0]))
    if (voice) {
      utterance.voice = voice
    }

    utterance.onend = () => resolve()
    utterance.onerror = (error) => reject(error)

    window.speechSynthesis.speak(utterance)
  })
}

export function stop(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
}

export function pause(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.pause()
  }
}

export function resume(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.resume()
  }
}

export function getVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return []
  }
  return window.speechSynthesis.getVoices()
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

// Load voices (some browsers load voices asynchronously)
export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return Promise.resolve([])
  }

  return new Promise((resolve) => {
    let voices = window.speechSynthesis.getVoices()
    
    if (voices.length > 0) {
      resolve(voices)
      return
    }

    window.speechSynthesis.onvoiceschanged = () => {
      voices = window.speechSynthesis.getVoices()
      resolve(voices)
    }
  })
}
