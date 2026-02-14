import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary via-emerald-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all group-hover:scale-105">
                <span className="material-icons-round text-white text-2xl">explore</span>
              </div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">Tanya Joko</span>
            </Link>
            <div className="flex items-center gap-8">
              <Link
                href="/destinasi"
                className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-all font-semibold text-sm relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              >
                Destinasi
              </Link>
              <Link
                href="/chat"
                className="px-7 py-3 bg-primary text-slate-900 font-bold rounded-2xl hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span className="material-icons-round text-lg">chat</span>
                Mulai Chat
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-blue-500/5 to-transparent"></div>
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/15 to-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-primary/10 text-blue-600 dark:text-blue-400 text-xs font-bold mb-10 border border-blue-500/20 shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 transition-all">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 shadow-sm"></span>
            </span>
            JOKO AI IS ONLINE
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
            Discover the Heart of Java <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-primary to-blue-600 dark:from-slate-100 dark:via-primary dark:to-blue-400 inline-block mt-2">Through AI Eyes.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-14 leading-relaxed font-medium">
            Joko is your personal Yogyakarta assistant. From hidden Gudeg stalls to majestic temple sunsets, get hyper-personalized recommendations instantly.
          </p>

          <div className="max-w-3xl mx-auto relative">
            <form className="flex items-center bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-900/10 dark:shadow-primary/5 p-3 border border-slate-200/50 dark:border-slate-700/50 focus-within:border-primary dark:focus-within:border-primary focus-within:shadow-2xl focus-within:shadow-primary/20 transition-all duration-300 hover:shadow-xl">
              <div className="shrink-0 pl-5 pr-3">
                <span className="material-icons-round text-primary text-2xl">chat_bubble_outline</span>
              </div>
              <input 
                className="w-full py-5 px-3 bg-transparent border-none focus:ring-0 text-lg placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white font-medium" 
                placeholder="Ask anything about Yogyakarta..." 
                type="text"
              />
              <Link href="/chat" className="bg-gradient-to-r from-primary to-emerald-400 text-slate-900 px-6 py-4 rounded-2xl flex items-center justify-center transition-all hover:shadow-xl hover:shadow-primary/40 hover:scale-105 active:scale-95">
                <span className="material-icons-round">send</span>
              </Link>
            </form>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
              <span className="text-slate-500 dark:text-slate-400 font-semibold">Try asking:</span>
              <button className="px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur hover:bg-primary/10 dark:hover:bg-primary/20 transition-all shadow-md hover:shadow-lg border border-slate-200/70 dark:border-slate-700/70 text-slate-700 dark:text-slate-300 font-medium hover:scale-105 active:scale-95">
                &ldquo;Best sunset spot in Gunung Kidul?&rdquo;
              </button>
              <button className="px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur hover:bg-primary/10 dark:hover:bg-primary/20 transition-all shadow-md hover:shadow-lg border border-slate-200/70 dark:border-slate-700/70 text-slate-700 dark:text-slate-300 font-medium hover:scale-105 active:scale-95">
                &ldquo;Quiet cafes near Malioboro&rdquo;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Preview */}
      <section className="max-w-7xl mx-auto px-8 py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Trending Destinations</h2>
            <p className="text-slate-600 dark:text-slate-300 mt-3 text-lg font-medium">Curated by Joko and the Jogja community.</p>
          </div>
          <Link href="/destinasi" className="text-primary font-bold flex items-center gap-2 group hover:gap-3 transition-all text-lg">
            View all places 
            <span className="material-icons-round group-hover:translate-x-1 transition-transform bg-primary/10 rounded-full p-1">arrow_forward</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
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
            <div key={index} className="group bg-white dark:bg-slate-800/90 backdrop-blur rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/60 dark:border-slate-700/60 hover:border-primary/50 dark:hover:border-primary/50 hover:-translate-y-2 cursor-pointer">
              <div className="relative h-72 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" src={dest.image} alt={dest.name} />
                <div className="absolute top-5 right-5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-extrabold flex items-center gap-1.5 shadow-xl text-slate-800 dark:text-white z-20">
                  <span className="material-icons-round text-yellow-400 text-base">star</span> {dest.rating}
                </div>
              </div>
              <div className="p-7">
                <div className="flex justify-between items-start mb-3 gap-3">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{dest.name}</h3>
                  <span className={`px-3 py-1.5 ${dest.category === 'Nature' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-primary/10 text-green-700 dark:text-primary'} text-[11px] font-extrabold rounded-full uppercase tracking-wider shrink-0`}>
                    {dest.category}
                  </span>
                </div>
                <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 mb-5 font-medium">{dest.description}</p>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-semibold">
                  <span className="material-icons-round text-base text-primary">location_on</span>
                  {dest.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-blue-500/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-5 tracking-tight">Why Choose Joko?</h2>
            <p className="text-slate-600 dark:text-slate-300 text-xl font-medium">AI-powered travel assistant with local expertise</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="group glass-card p-10 rounded-3xl text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
              <div className="w-20 h-20 bg-gradient-to-br from-primary via-emerald-400 to-blue-500 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-xl shadow-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/40 group-hover:scale-110 transition-all duration-500 group-hover:rotate-6">
                <span className="material-icons-round text-white text-4xl">mic</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Voice Input</h3>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-medium">
                Tanya pakai suara, dapat jawaban langsung. Praktis dan cepat!
              </p>
            </div>

            <div className="group glass-card p-10 rounded-3xl text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-xl shadow-blue-500/30 group-hover:shadow-2xl group-hover:shadow-blue-500/40 group-hover:scale-110 transition-all duration-500 group-hover:rotate-6">
                <span className="material-icons-round text-white text-4xl">translate</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Multi-Language</h3>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-medium">
                Dukungan Bahasa Indonesia, English, dan Bahasa Jawa.
              </p>
            </div>

            <div className="group glass-card p-10 rounded-3xl text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-xl shadow-purple-500/30 group-hover:shadow-2xl group-hover:shadow-purple-500/40 group-hover:scale-110 transition-all duration-500 group-hover:rotate-6">
                <span className="material-icons-round text-white text-4xl">recommend</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Smart Recommendations</h3>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-medium">
                AI memberikan rekomendasi sesuai preferensi dan lokasi Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-8 py-32">
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-800 dark:to-slate-900 rounded-[2.5rem] p-16 md:p-20 text-center shadow-2xl shadow-slate-900/50">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzEzZWM1YiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/30">
              <span className="material-icons-round text-white text-6xl">explore</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Ready for your Jogja adventure?
            </h2>
            <p className="text-slate-300 mb-12 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
              Let Joko guide you through the magic of Yogyakarta. Start your personalized journey today.
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary to-emerald-400 text-slate-900 font-black rounded-2xl hover:shadow-2xl hover:shadow-primary/60 transition-all hover:scale-105 active:scale-95 text-lg"
            >
              <span className="material-icons-round text-xl">chat</span>
              Start Chatting Now
              <span className="material-icons-round text-xl">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="text-center">
            <p className="text-slate-500 dark:text-slate-400 text-base font-medium">© 2026 Tanya Joko. Powered by Google Gemini AI & Supabase.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
