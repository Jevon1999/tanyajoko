'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'

export default function TranslatePage() {
  const [sourceText, setSourceText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [sourceLang, setSourceLang] = useState('id')
  const [targetLang, setTargetLang] = useState('en')

  const languages = [
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'jv', name: 'Bahasa Jawa', flag: '🏴' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="material-icons-round text-primary text-xl">translate</span>
            <span className="text-sm font-semibold text-primary">AI Translation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Terjemahkan Bahasamu
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Terjemahkan antara Bahasa Indonesia, English, dan Bahasa Jawa dengan bantuan AI
          </p>
        </div>

        {/* Translation Box */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* Language Selector */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex-1">
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full max-w-xs px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <button 
              onClick={() => {
                const temp = sourceLang
                setSourceLang(targetLang)
                setTargetLang(temp)
                const tempText = sourceText
                setSourceText(translatedText)
                setTranslatedText(tempText)
              }}
              className="mx-4 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="material-icons-round text-slate-600 dark:text-slate-400">swap_horiz</span>
            </button>

            <div className="flex-1 flex justify-end">
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full max-w-xs px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Text Areas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
            {/* Source Text */}
            <div className="p-6">
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Ketik atau paste teks di sini..."
                className="w-full h-64 bg-transparent border-none focus:ring-0 text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 resize-none"
              />
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {sourceText.length} karakter
                </span>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-icons-round text-slate-400 text-lg">content_copy</span>
                  </button>
                  <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-icons-round text-slate-400 text-lg">volume_up</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Translated Text */}
            <div className="p-6 bg-slate-50 dark:bg-slate-800/30">
              <div className="w-full h-64 overflow-y-auto text-base text-slate-900 dark:text-white">
                {translatedText || (
                  <span className="text-slate-400 dark:text-slate-500 italic">
                    Terjemahan akan muncul di sini...
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {translatedText.length} karakter
                </span>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <span className="material-icons-round text-slate-400 text-lg">content_copy</span>
                  </button>
                  <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <span className="material-icons-round text-slate-400 text-lg">volume_up</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800">
            <button className="w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto">
              <span className="material-icons-round">translate</span>
              Terjemahkan
            </button>
          </div>
        </div>

        {/* Quick Examples */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Contoh Cepat:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { from: 'id', to: 'en', text: 'Selamat pagi, apa kabar?' },
              { from: 'en', to: 'id', text: 'Where is the nearest beach?' },
              { from: 'id', to: 'jv', text: 'Terima kasih banyak' },
            ].map((example, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSourceLang(example.from)
                  setTargetLang(example.to)
                  setSourceText(example.text)
                }}
                className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-primary transition-all text-left group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {example.from.toUpperCase()} → {example.to.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                  "{example.text}"
                </p>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
