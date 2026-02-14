'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'feed' | 'popular' | 'recent'>('feed')

  // Mock data untuk feed
  const posts = [
    {
      id: 1,
      user: {
        name: 'Dewi Kusuma',
        avatar: 'https://i.pravatar.cc/150?img=1',
        location: 'Malioboro, Yogyakarta'
      },
      image: 'https://images.unsplash.com/photo-1555400038-63f526b491e0?w=800',
      caption: 'Malam di Malioboro selalu ramai! 🌃 Jangan lupa cobain angkringan dan jajanan pinggir jalan. Budget 50rb udah kenyang!',
      category: 'Kuliner',
      likes: 234,
      comments: 45,
      timestamp: '2 jam yang lalu'
    },
    {
      id: 2,
      user: {
        name: 'Budi Santoso',
        avatar: 'https://i.pravatar.cc/150?img=12',
        location: 'Pantai Parangtritis'
      },
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      caption: 'Sunset di Parangtritis nggak pernah ngecewain! 🌅 Best time: jam 5 sore. Jangan lupa naik ATV ya! Seru banget 🏍️',
      category: 'Wisata',
      likes: 456,
      comments: 78,
      timestamp: '5 jam yang lalu'
    },
    {
      id: 3,
      user: {
        name: 'Siti Rahayu',
        avatar: 'https://i.pravatar.cc/150?img=5',
        location: 'Hotel Grand Aston'
      },
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
      caption: 'Staycation di tengah kota! 🏨 Fasilitas lengkap, breakfast enak, staff ramah. Recommended buat family trip! Rate: 8.5/10',
      category: 'Hotel',
      likes: 189,
      comments: 34,
      timestamp: '1 hari yang lalu'
    },
    {
      id: 4,
      user: {
        name: 'Andi Pratama',
        avatar: 'https://i.pravatar.cc/150?img=8',
        location: 'Warung Gudeg Yu Djum'
      },
      image: 'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=800',
      caption: 'Gudeg Yu Djum memang legendaris! 🍛 Manisnya pas, nangkanya empuk. Porsi jumbo cuma 25rb. Wajib coba kalau ke Jogja!',
      category: 'Kuliner',
      likes: 567,
      comments: 92,
      timestamp: '2 hari yang lalu'
    },
    {
      id: 5,
      user: {
        name: 'Maya Lestari',
        avatar: 'https://i.pravatar.cc/150?img=9',
        location: 'Candi Prambanan'
      },
      image: 'https://images.unsplash.com/photo-1590737482325-c6831f8aeedf?w=800',
      caption: 'Sunrise di Prambanan itu magical ✨ Datang jam 5 pagi worth it banget! Tiket 50rb, best value for money. Pro tip: bawa jaket, dingin!',
      category: 'Wisata',
      likes: 823,
      comments: 156,
      timestamp: '3 hari yang lalu'
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      {/* Tabs */}
      <div className="sticky top-[60px] z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {[
              { id: 'feed', label: 'Beranda', icon: 'home' },
              { id: 'popular', label: 'Populer', icon: 'local_fire_department' },
              { id: 'recent', label: 'Terbaru', icon: 'schedule' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-primary text-primary font-semibold'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className="material-icons-round text-lg">{tab.icon}</span>
                <span className="text-sm hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Create Post Button */}
        <div className="mb-6">
          <button className="w-full p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <span className="material-icons-round text-white text-xl">add_photo_alternate</span>
              </div>
              <div className="text-left flex-1">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">
                  Bagikan pengalamanmu di Jogja
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Foto, review, tips & trik
                </p>
              </div>
              <span className="material-icons-round text-slate-400 group-hover:text-primary transition-colors">
                arrow_forward
              </span>
            </div>
          </button>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow">
              {/* Post Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                      {post.user.name}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <span className="material-icons-round text-xs">location_on</span>
                      <span>{post.user.location}</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <span className="material-icons-round text-slate-400">more_horiz</span>
                </button>
              </div>

              {/* Post Image */}
              <div className="relative aspect-[4/3] bg-slate-200 dark:bg-slate-800">
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-900 dark:text-white">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Post Actions */}
              <div className="p-4">
                <div className="flex items-center gap-4 mb-3">
                  <button className="flex items-center gap-1 group">
                    <span className="material-icons-round text-red-500 group-hover:scale-110 transition-transform">
                      favorite
                    </span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {post.likes}
                    </span>
                  </button>
                  <button className="flex items-center gap-1 group">
                    <span className="material-icons-round text-slate-400 group-hover:text-blue-500 group-hover:scale-110 transition-all">
                      chat_bubble
                    </span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {post.comments}
                    </span>
                  </button>
                  <button className="flex items-center gap-1 group ml-auto">
                    <span className="material-icons-round text-slate-400 group-hover:text-green-500 group-hover:scale-110 transition-all">
                      bookmark
                    </span>
                  </button>
                  <button className="flex items-center gap-1 group">
                    <span className="material-icons-round text-slate-400 group-hover:text-purple-500 group-hover:scale-110 transition-all">
                      share
                    </span>
                  </button>
                </div>

                {/* Caption */}
                <div className="space-y-1">
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <span className="font-semibold">{post.user.name}</span>{' '}
                    {post.caption}
                  </p>
                  <button className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">
                    Lihat semua {post.comments} komentar
                  </button>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {post.timestamp}
                  </p>
                </div>

                {/* Comment Input */}
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Tambahkan komentar..."
                    className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
                  />
                  <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            Muat lebih banyak
          </button>
        </div>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary to-purple-600 rounded-full shadow-2xl shadow-primary/50 flex items-center justify-center hover:scale-110 transition-transform">
        <span className="material-icons-round text-white text-2xl">add</span>
      </button>
    </div>
  )
}
