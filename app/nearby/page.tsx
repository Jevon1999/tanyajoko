'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'

export default function NearbyPage() {
  const [category, setCategory] = useState('all')
  const [radius, setRadius] = useState(5)

  const categories = [
    { id: 'all', name: 'Semua', icon: 'location_on', color: 'blue' },
    { id: 'food', name: 'Kuliner', icon: 'restaurant', color: 'orange' },
    { id: 'tourism', name: 'Wisata', icon: 'attractions', color: 'green' },
    { id: 'hotel', name: 'Hotel', icon: 'hotel', color: 'purple' },
    { id: 'atm', name: 'ATM', icon: 'atm', color: 'red' },
    { id: 'gas', name: 'SPBU', icon: 'local_gas_station', color: 'yellow' },
  ]

  const mockNearbyPlaces = [
    {
      id: 1,
      name: 'Gudeg Yu Djum',
      category: 'food',
      distance: '0.8 km',
      address: 'Jl. Wijilan No.31',
      rating: 4.6,
      isOpen: true,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
    },
    {
      id: 2,
      name: 'Malioboro Mall',
      category: 'tourism',
      distance: '1.2 km',
      address: 'Jl. Malioboro No.52-58',
      rating: 4.3,
      isOpen: true,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
    },
    {
      id: 3,
      name: 'Grand Aston Hotel',
      category: 'hotel',
      distance: '2.1 km',
      address: 'Jl. Urip Sumoharjo',
      rating: 4.5,
      isOpen: true,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    },
    {
      id: 4,
      name: 'ATM BCA Malioboro',
      category: 'atm',
      distance: '0.5 km',
      address: 'Jl. Malioboro',
      rating: 4.0,
      isOpen: true,
      image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400',
    },
    {
      id: 5,
      name: 'SPBU Pertamina Gejayan',
      category: 'gas',
      distance: '3.2 km',
      address: 'Jl. Gejayan',
      rating: 4.2,
      isOpen: true,
      image: 'https://images.unsplash.com/photo-1545262810-77515befe149?w=400',
    },
  ]

  const filteredPlaces = category === 'all' 
    ? mockNearbyPlaces 
    : mockNearbyPlaces.filter(place => place.category === category)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
              <span className="material-icons-round text-white text-2xl">near_me</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Di Sekitar
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Temukan tempat menarik di sekitar Anda
              </p>
            </div>
          </div>
        </div>

        {/* Radius Slider */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6 mb-6">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            Radius Pencarian
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 min-w-[80px]">
              {radius} km
            </span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            Kategori
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`p-4 rounded-2xl border-2 transition flex flex-col items-center gap-2 ${
                  category === cat.id
                    ? `border-${cat.color}-500 bg-${cat.color}-50 dark:bg-${cat.color}-950`
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <span className={`material-icons-round text-2xl ${
                  category === cat.id ? `text-${cat.color}-600` : 'text-slate-600 dark:text-slate-400'
                }`}>
                  {cat.icon}
                </span>
                <span className={`text-xs font-semibold ${
                  category === cat.id ? `text-${cat.color}-700 dark:text-${cat.color}-400` : 'text-slate-700 dark:text-slate-300'
                }`}>
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-3 right-3 bg-white dark:bg-slate-900 px-3 py-1 rounded-full text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="material-icons-round text-sm">location_on</span>
                  {place.distance}
                </div>
                {place.isOpen && (
                  <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    BUKA
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                  {place.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 flex items-center gap-1">
                  <span className="material-icons-round text-sm">place</span>
                  {place.address}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="material-icons-round text-yellow-500 text-lg">star</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{place.rating}</span>
                  </div>
                  <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition">
                    Lihat Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPlaces.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-icons-round text-slate-400 text-5xl">search_off</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Tidak ada tempat ditemukan
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Coba ubah kategori atau perluas radius pencarian
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
