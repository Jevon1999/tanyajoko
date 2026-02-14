'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'

interface Destination {
  id: string
  name: string
  location: string
  category: string
  description: string
  avg_rating: number
  review_count: number
  price_range: string
  photos: { url: string }[]
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all')

  const fetchDestinations = useCallback(async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      let query = supabase
        .from('destinations')
        .select(`
          id,
          name,
          location,
          category,
          description,
          rating,
          image_url,
          price_range
        `)
        .order('rating', { ascending: false })

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory)
      }

      if (selectedPriceRange !== 'all') {
        query = query.eq('price_range', selectedPriceRange)
      }

      const { data, error } = await query

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      // Transform data to match interface
      // @ts-ignore - Supabase SSR v0.5.2 type inference bug
      const transformedData = (data || []).map(dest => ({
        ...dest,
        avg_rating: dest.rating || 0,
        review_count: 0, // We'll need to count this separately if needed
        photos: dest.image_url ? [{ url: dest.image_url }] : []
      }))

      setDestinations(transformedData)
    } catch (error) {
      console.error('Error fetching destinations:', error)
    } finally {
      setLoading(false)
    }
  }, [selectedCategory, selectedPriceRange])

  useEffect(() => {
    fetchDestinations()
  }, [fetchDestinations])

  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const categories = ['all', 'Wisata Alam', 'Kuliner', 'Sejarah & Budaya', 'Belanja', 'Hiburan']
  const priceRanges = ['all', 'Gratis', 'Murah', 'Sedang', 'Mahal']

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Explore Yogyakarta</h1>
          <p className="text-slate-600 dark:text-slate-400">Discover amazing places curated by locals and travelers</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition text-slate-900 dark:text-white placeholder-slate-400"
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition text-slate-900 dark:text-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            {/* Price Filter */}
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition text-slate-900 dark:text-white"
            >
              {priceRanges.map(price => (
                <option key={price} value={price}>
                  {price === 'all' ? 'All Prices' : price}
                </option>
              ))}
            </select>
          </div>

          {/* Active Filters Display */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {filteredDestinations.length} destinations found
            </span>
            {(selectedCategory !== 'all' || selectedPriceRange !== 'all') && (
              <>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  onClick={() => {
                    setSelectedCategory('all')
                    setSelectedPriceRange('all')
                  }}
                  className="text-xs text-primary hover:underline"
                >
                  Clear filters
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="h-48 bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-2/3 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredDestinations.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-icons-round text-slate-300 dark:text-slate-700 text-6xl mb-4">search_off</span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No destinations found</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Try adjusting your filters or search query</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSelectedPriceRange('all')
              }}
              className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition text-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((dest) => (
              <Link
                key={dest.id}
                href={`/destinasi/${dest.id}`}
                className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition-all border border-slate-200 dark:border-slate-800 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-800">
                  {dest.photos && dest.photos.length > 0 ? (
                    <img
                      src={dest.photos[0].url}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const placeholder = target.nextElementSibling as HTMLElement;
                        if (placeholder) placeholder.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="w-full h-full flex items-center justify-center" style={{ display: dest.photos && dest.photos.length > 0 ? 'none' : 'flex' }}>
                    <span className="material-icons-round text-slate-400 text-4xl">photo_camera</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow">
                    <span className="material-icons-round text-yellow-500 text-sm">star</span>
                    {dest.avg_rating?.toFixed(1) || 'N/A'}
                  </div>
                  <div className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-2.5 py-1 rounded-lg text-xs font-bold">
                    {dest.price_range}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">{dest.name}</h3>
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded uppercase tracking-wide shrink-0">
                      {dest.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{dest.description}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <span className="material-icons-round text-sm text-primary">location_on</span>
                    {dest.location}
                  </div>
                  {dest.review_count > 0 && (
                    <div className="mt-2 text-[10px] text-slate-500">
                      {dest.review_count} reviews
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
