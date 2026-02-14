'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'

export default function PlannerPage() {
  const [days, setDays] = useState(3)
  const [budget, setBudget] = useState(1500000)
  const [preferences, setPreferences] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [itinerary, setItinerary] = useState<any>(null)
  const [error, setError] = useState('')

  const categoryOptions = [
    { id: 'alam', label: 'Alam', icon: 'nature' },
    { id: 'budaya', label: 'Budaya', icon: 'account_balance' },
    { id: 'kuliner', label: 'Kuliner', icon: 'restaurant' },
    { id: 'sejarah', label: 'Sejarah', icon: 'museum' },
    { id: 'modern', label: 'Modern', icon: 'location_city' },
    { id: 'religi', label: 'Religi', icon: 'mosque' },
  ]

  const togglePreference = (id: string) => {
    setPreferences(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const handleGenerateItinerary = async () => {
    setLoading(true)
    setError('')
    setItinerary(null)

    try {
      const response = await fetch('/api/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ days, budget, preferences }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Gagal membuat itinerary')
      }

      setItinerary(data.itinerary)
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 rounded-full mb-4">
            <span className="material-icons-round text-violet-600 text-xl">auto_awesome</span>
            <span className="text-sm font-semibold text-violet-600">AI-Powered</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Rencanakan Perjalananmu
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Biarkan AI membuat itinerary sempurna untuk liburanmu di Yogyakarta
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Duration Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <span className="material-icons-round text-blue-600">event</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Durasi Perjalanan</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Berapa lama kamu di Jogja?</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{days} Hari</span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, 7].map(d => (
                      <button
                        key={d}
                        onClick={() => setDays(d)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          days === d
                            ? 'bg-primary text-white shadow-lg shadow-primary/30'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {d}D
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="14"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </div>

            {/* Budget Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <span className="material-icons-round text-green-600">payments</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Budget Perjalanan</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Total budget untuk {days} hari</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    Rp {budget.toLocaleString('id-ID')}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    ~Rp {Math.round(budget / days).toLocaleString('id-ID')}/hari
                  </span>
                </div>
                <input
                  type="range"
                  min="500000"
                  max="10000000"
                  step="250000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-green-600"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>500K (Hemat)</span>
                  <span>3M (Sedang)</span>
                  <span>10M (Leluasa)</span>
                </div>
              </div>
            </div>

            {/* Preferences Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <span className="material-icons-round text-purple-600">favorite</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Preferensi Wisata</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Pilih yang kamu minati (bisa lebih dari 1)</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categoryOptions.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => togglePreference(cat.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      preferences.includes(cat.id)
                        ? 'border-primary bg-primary/10'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <span className={`material-icons-round text-2xl mb-2 block ${
                      preferences.includes(cat.id) ? 'text-primary' : 'text-slate-400'
                    }`}>
                      {cat.icon}
                    </span>
                    <span className={`text-sm font-medium ${
                      preferences.includes(cat.id) ? 'text-primary' : 'text-slate-600 dark:text-slate-400'
                    }`}>
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button 
              onClick={handleGenerateItinerary}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all shadow-lg shadow-violet-500/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="material-icons-round animate-spin">refresh</span>
                  Membuat Itinerary...
                </>
              ) : (
                <>
                  <span className="material-icons-round">auto_awesome</span>
                  Generate Itinerary dengan AI
                </>
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <span className="material-icons-round">error</span>
                  <span className="text-sm font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Itinerary Result */}
            {itinerary && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Itinerary Perjalananmu
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {days} hari di Yogyakarta • Budget: Rp {budget.toLocaleString('id-ID')}
                  </p>
                </div>

                {/* Days */}
                {Object.keys(itinerary)
                  .filter(key => key.startsWith('day'))
                  .sort()
                  .map((dayKey, index) => (
                    <div key={dayKey} className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-white font-bold">{index + 1}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          Hari {index + 1}
                        </h3>
                      </div>

                      <div className="space-y-3 ml-12">
                        {itinerary[dayKey].map((activity: any, actIdx: number) => (
                          <div
                            key={actIdx}
                            className="border-l-2 border-primary pl-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-r-lg transition"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="material-icons-round text-primary text-sm">
                                    schedule
                                  </span>
                                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                    {activity.time}
                                  </span>
                                </div>
                                <h4 className="font-bold text-slate-900 dark:text-white">
                                  {activity.destination}
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                  {activity.activity}
                                </p>
                              </div>
                              <span className="text-sm font-semibold text-green-600 whitespace-nowrap">
                                {activity.estimatedCost}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                              <span className="flex items-center gap-1">
                                <span className="material-icons-round text-xs">access_time</span>
                                {activity.estimatedDuration}
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="material-icons-round text-xs">directions_car</span>
                                {activity.transport}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                {/* Summary */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl p-5 border border-green-200 dark:border-green-900">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      Total Estimasi Biaya
                    </h4>
                    <span className="text-2xl font-bold text-green-600">
                      {itinerary.totalEstimatedCost}
                    </span>
                  </div>
                </div>

                {/* Tips */}
                {itinerary.tips && itinerary.tips.length > 0 && (
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-5 border border-blue-200 dark:border-blue-900">
                    <div className="flex items-start gap-3">
                      <span className="material-icons-round text-blue-600 text-xl">lightbulb</span>
                      <div>
                        <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">
                          Tips Perjalanan
                        </h4>
                        <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-400">
                          {itinerary.tips.map((tip: string, idx: number) => (
                            <li key={idx}>• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Panel - Preview/Summary */}
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 sticky top-24">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Ringkasan</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Durasi</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{days} Hari</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Budget Total</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    Rp {budget.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Budget/Hari</span>
                  <span className="font-semibold text-green-600">
                    Rp {Math.round(budget / days).toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="py-3">
                  <span className="text-sm text-slate-600 dark:text-slate-400 block mb-2">Preferensi</span>
                  <div className="flex flex-wrap gap-2">
                    {preferences.length > 0 ? (
                      preferences.map(pref => (
                        <span key={pref} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {categoryOptions.find(c => c.id === pref)?.label}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">Belum dipilih</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900">
                <div className="flex gap-3">
                  <span className="material-icons-round text-blue-600 text-xl">info</span>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">
                      AI akan membuat
                    </h4>
                    <ul className="text-xs text-blue-800 dark:text-blue-400 space-y-1">
                      <li>• Itinerary detail per hari</li>
                      <li>• Estimasi waktu & biaya</li>
                      <li>• Rekomendasi tempat makan</li>
                      <li>• Tips transportasi</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
