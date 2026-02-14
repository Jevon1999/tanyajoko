'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="material-icons-round text-white text-xl">explore</span>
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">Tanya <span className="text-primary">Joko</span></span>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/destinasi" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition font-medium text-sm">
              Destinasi
            </Link>
            <Link href="/nearby" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition font-medium text-sm">
              Di Sekitar
            </Link>
            <Link href="/translate" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition font-medium text-sm">
              Terjemahan
            </Link>
            <Link href="/planner" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition font-medium text-sm">
              Planner AI
            </Link>
            <Link href="/community" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition font-medium text-sm">
              Komunitas
            </Link>
            <Link href="/partner" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition font-medium text-sm">
              Mitra
            </Link>
            <Link href="/chat" className="px-5 py-2 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition text-sm">
              Mulai Chat
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <span className="material-icons-round text-slate-600 dark:text-slate-400">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-2 border-t border-slate-200 dark:border-slate-800 mt-3">
            <Link 
              href="/destinasi" 
              className="block px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Destinasi
            </Link>
            <Link 
              href="/nearby" 
              className="block px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Di Sekitar
            </Link>
            <Link 
              href="/translate" 
              className="block px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Terjemahan
            </Link>
            <Link 
              href="/planner" 
              className="block px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Planner AI
            </Link>
            <Link 
              href="/community" 
              className="block px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Komunitas
            </Link>
            <Link 
              href="/partner" 
              className="block px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Mitra
            </Link>
            <Link 
              href="/chat" 
              className="block px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition text-sm text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Mulai Chat
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
