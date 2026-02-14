import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-500 rounded-xl flex items-center justify-center">
                <span className="material-icons-round text-white text-2xl">explore</span>
              </div>
              <span className="text-xl font-bold text-slate-800 dark:text-white">Tanya Joko</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/destinasi"
                className="text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition font-medium"
              >
                Destinasi
              </Link>
              <Link
                href="/chat"
                className="px-6 py-2.5 bg-primary text-slate-900 font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                Mulai Chat
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold mb-6 border border-blue-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            JOKO AI IS ONLINE
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 dark:text-white mb-6 leading-tight">
            Discover the Heart of Java <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-primary to-blue-500 dark:from-white dark:via-primary dark:to-blue-400">Through AI Eyes.</span>
          </h1>
          
          <p className="text-lg text-slate-500 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            Joko is your personal Yogyakarta assistant. From hidden Gudeg stalls to majestic temple sunsets, get hyper-personalized recommendations instantly.
          </p>

          <div className="max-w-3xl mx-auto relative">
            <form className="flex items-center bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-2 border-2 border-primary/20 focus-within:border-primary transition-all">
              <div className="flex-shrink-0 pl-4 pr-2">
                <span className="material-icons-round text-primary">chat_bubble_outline</span>
              </div>
              <input 
                className="w-full py-4 px-2 bg-transparent border-none focus:ring-0 text-lg placeholder-slate-400 text-slate-800 dark:text-white" 
                placeholder="Ask anything about Yogyakarta..." 
                type="text"
              />
              <Link href="/chat" className="bg-primary text-slate-900 p-4 rounded-xl flex items-center justify-center transition-all hover:shadow-lg hover:shadow-primary/30">
                <span className="material-icons-round">send</span>
              </Link>
            </form>
            <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
              <span className="text-slate-400">Try asking:</span>
              <button className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors shadow-sm border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                "Best sunset spot in Gunung Kidul?"
              </button>
              <button className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors shadow-sm border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                "Quiet cafes near Malioboro"
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Preview */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">Trending Destinations</h2>
            <p className="text-slate-500 dark:text-gray-400 mt-2">Curated by Joko and the Jogja community.</p>
          </div>
          <Link href="/destinasi" className="text-primary font-bold flex items-center gap-1 group">
            View all places 
            <span className="material-icons-round group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: 'Tebing Breksi',
              location: 'Sleman, Yogyakarta',
              rating: 4.8,
              category: 'Nature',
              image: 'https://images.unsplash.com/photo-1523428096881-f7b6beec67e6?w=800&auto=format&fit=crop',
              description: 'Breathtaking hand-carved limestone cliffs.'
            },
            {
              name: 'Borobudur Temple',
              location: 'Magelang, Central Java',
              rating: 4.9,
              category: 'Heritage',
              image: 'https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?w=800&auto=format&fit=crop',
              description: 'The world\'s largest Buddhist temple.'
            },
            {
              name: 'Parangtritis Beach',
              location: 'Bantul, Yogyakarta',
              rating: 4.7,
              category: 'Nature',
              image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop',
              description: 'Mystical black sand beach with dramatic cliffs.'
            }
          ].map((dest, index) => (
            <div key={index} className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-primary/20">
              <div className="relative h-64 overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={dest.image} alt={dest.name} />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm text-slate-800">
                  <span className="material-icons-round text-yellow-500 text-xs">star</span> {dest.rating}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">{dest.name}</h3>
                  <span className={`px-2 py-1 ${dest.category === 'Nature' ? 'bg-blue-500/10 text-blue-500' : 'bg-primary/10 text-primary'} text-[10px] font-bold rounded uppercase tracking-wider`}>
                    {dest.category}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-gray-400 mb-4">{dest.description}</p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="material-icons-round text-sm">location_on</span>
                  {dest.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-4">Why Choose Joko?</h2>
            <p className="text-slate-500 dark:text-gray-400">AI-powered travel assistant with local expertise</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="material-icons-round text-white text-3xl">mic</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Voice Input</h3>
              <p className="text-slate-500 dark:text-gray-400">
                Tanya pakai suara, dapat jawaban langsung. Praktis dan cepat!
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="material-icons-round text-white text-3xl">translate</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Multi-Language</h3>
              <p className="text-slate-500 dark:text-gray-400">
                Dukungan Bahasa Indonesia, English, dan Bahasa Jawa.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="material-icons-round text-white text-3xl">recommend</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Smart Recommendations</h3>
              <p className="text-slate-500 dark:text-gray-400">
                AI memberikan rekomendasi sesuai preferensi dan lokasi Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-primary/20 dark:to-blue-500/20 rounded-3xl p-12 text-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzEzZWM1YiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10"></div>
          <div className="relative z-10">
            <span className="material-icons-round text-primary text-5xl mb-4 inline-block">explore</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ready for your Jogja adventure?
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Let Joko guide you through the magic of Yogyakarta. Start your personalized journey today.
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-slate-900 font-bold rounded-xl hover:shadow-2xl hover:shadow-primary/50 transition-all"
            >
              <span className="material-icons-round">chat</span>
              Start Chatting Now
              <span className="material-icons-round">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-slate-500 dark:text-gray-400 text-sm">
            <p>© 2026 Tanya Joko. Powered by Google Gemini AI & Supabase.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
