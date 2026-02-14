'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'

export default function PartnerPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'hotel' | 'restaurant' | 'travel'>('all')

  const partners = [
    // Hotels
    {
      id: 1,
      type: 'hotel',
      name: 'Grand Aston Yogyakarta',
      description: 'Hotel bintang 5 dengan fasilitas lengkap di jantung kota Yogyakarta',
      discount: '25% OFF',
      location: 'Jl. Urip Sumoharjo',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
      benefits: ['Sarapan gratis', 'Antar jemput bandara', 'Diskon spa 20%', 'Checkout telat'],
    },
    {
      id: 2,
      type: 'hotel',
      name: 'The Phoenix Hotel Yogyakarta',
      description: 'Hotel heritage dengan arsitektur kolonial yang memukau',
      discount: '20% OFF',
      location: 'Jl. Jend. Sudirman',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600',
      benefits: ['Suasana bersejarah', 'Akses kolam renang', 'Voucher restoran', 'WiFi gratis'],
    },
    {
      id: 3,
      type: 'hotel',
      name: 'Tentrem Hotel Yogyakarta',
      description: 'Hotel mewah dengan pemandangan kota yang spektakuler',
      discount: '30% OFF',
      location: 'Jl. P. Mangkubumi',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600',
      benefits: ['Bar rooftop', 'Gym & kolam', 'Minuman selamat datang', 'Upgrade gratis'],
    },
    // Restaurants
    {
      id: 4,
      type: 'restaurant',
      name: 'Bale Raos Restaurant',
      description: 'Restoran masakan Keraton dengan cita rasa autentik',
      discount: '15% OFF',
      location: 'Jl. Magangan Kulon',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
      benefits: ['Masakan keraton', 'Suasana tradisional', 'Pembuka gratis', 'Pertunjukan budaya'],
    },
    {
      id: 5,
      type: 'restaurant',
      name: 'Abhayagiri Restaurant',
      description: 'Fine dining dengan pemandangan sawah dan candi',
      discount: '20% OFF',
      location: 'Jl. Parangtritis Km 8.5',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
      benefits: ['Pemandangan indah', 'Dari kebun ke meja', 'Pasangan wine', 'Ruang makan pribadi'],
    },
    {
      id: 6,
      type: 'restaurant',
      name: 'Gudeg Yu Djum Wijilan',
      description: 'Legendaris! Gudeg terenak di Jogja sejak 1950',
      discount: '10% OFF',
      location: 'Jl. Wijilan No.31',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600',
      benefits: ['Menu andalan', 'Layanan cepat', 'Rasa autentik', 'Paket bungkus'],
    },
    // Travel Agents
    {
      id: 7,
      type: 'travel',
      name: 'Jogja Tour Guide',
      description: 'Paket wisata lengkap dengan guide berpengalaman',
      discount: '30% OFF',
      location: 'Online Booking',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600',
      benefits: ['Pemandu profesional', 'Itinerary khusus', 'Jemput hotel', 'Layanan foto'],
    },
    {
      id: 8,
      type: 'travel',
      name: 'Merapi Adventure Tour',
      description: 'Spesialis wisata Jeep Lava Tour Merapi',
      discount: '25% OFF',
      location: 'Kaliurang',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600',
      benefits: ['Jeep 4x4', 'Ahli lava tour', 'Paket sunrise', 'Asuransi termasuk'],
    },
    {
      id: 9,
      type: 'travel',
      name: 'Borobudur Sunrise Tours',
      description: 'Paket eksklusif sunrise di Borobudur dengan sarapan',
      discount: '35% OFF',
      location: 'Borobudur',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600',
      benefits: ['Akses pagi', 'Sarapan termasuk', 'Spot foto', 'Pemandu candi'],
    },
  ]

  const filteredPartners = activeTab === 'all' 
    ? partners 
    : partners.filter(p => p.type === activeTab)

  const tabs = [
    { id: 'all', label: 'Semua Partner', icon: 'business' },
    { id: 'hotel', label: 'Hotel', icon: 'hotel' },
    { id: 'restaurant', label: 'Restoran', icon: 'restaurant' },
    { id: 'travel', label: 'Travel Agent', icon: 'tour' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
              <span className="material-icons-round text-white text-2xl">handshake</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Partner Kami
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Nikmati benefit eksklusif dari partner terpercaya TanyaJoko
              </p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="material-icons-round text-2xl">discount</span>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Dapatkan Diskon Spesial!</h3>
              <p className="text-white/90 text-sm">
                Partner kami menawarkan diskon hingga 35% khusus untuk pengguna TanyaJoko. 
                Tunjukkan kode booking dari aplikasi untuk mendapatkan benefit eksklusif.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 rounded-xl font-semibold text-sm whitespace-nowrap flex items-center gap-2 transition ${
                activeTab === tab.id
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-icons-round text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-3 right-3 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  {partner.discount}
                </div>
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                    partner.type === 'hotel' ? 'bg-purple-500' :
                    partner.type === 'restaurant' ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`}>
                    {partner.type === 'hotel' ? 'HOTEL' :
                     partner.type === 'restaurant' ? 'RESTORAN' :
                     'TRAVEL'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                  {partner.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  {partner.description}
                </p>

                {/* Location & Rating */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                    <span className="material-icons-round text-sm">location_on</span>
                    <span className="truncate">{partner.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-icons-round text-yellow-500 text-sm">star</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{partner.rating}</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    BENEFIT:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {partner.benefits.slice(0, 4).map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                        <span className="material-icons-round text-green-500" style={{ fontSize: '14px' }}>check_circle</span>
                        <span className="truncate">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl transition shadow-md">
                  Klaim Diskon
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPartners.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-icons-round text-slate-400 text-5xl">business_center</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Belum ada partner di kategori ini
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Kami sedang menambahkan partner baru. Stay tuned!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
