// Web Speech API TypeScript definitions

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number
  readonly results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string
  readonly message: string
}

interface SpeechRecognitionResultList {
  readonly length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean
  readonly length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
}

interface SpeechRecognitionAlternative {
  readonly transcript: string
  readonly confidence: number
}

interface SpeechRecognitionInterface extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  maxAlternatives: number
  
  start(): void
  stop(): void
  abort(): void
  
  onaudioend: ((this: SpeechRecognitionInterface, ev: Event) => void) | null
  onaudiostart: ((this: SpeechRecognitionInterface, ev: Event) => void) | null
  onend: ((this: SpeechRecognitionInterface, ev: Event) => void) | null
  onerror: ((this: SpeechRecognitionInterface, ev: SpeechRecognitionErrorEvent) => void) | null
  onnomatch: ((this: SpeechRecognitionInterface, ev: SpeechRecognitionEvent) => void) | null
  onresult: ((this: SpeechRecognitionInterface, ev: SpeechRecognitionEvent) => void) | null
  onsoundend: ((this: SpeechRecognitionInterface, ev: Event) => void) | null
  onsoundstart: ((this: SpeechRecognitionInterface, ev: Event) => void) | null
  onspeechend: ((this: SpeechRecognitionInterface, ev: Event) => void) | null
  onspeechstart: ((this: SpeechRecognitionInterface, ev: Event) => void) | null
  onstart: ((this: SpeechRecognitionInterface, ev: Event) => void) | null
}

declare global {
  interface Window {
    SpeechRecognition: {
      new (): SpeechRecognitionInterface
    }
    webkitSpeechRecognition: {
      new (): SpeechRecognitionInterface
    }
  }
}

export type { 
  SpeechRecognitionInterface,
  SpeechRecognitionEvent,
  SpeechRecognitionErrorEvent,
  SpeechRecognitionResult,
  SpeechRecognitionAlternative
}
