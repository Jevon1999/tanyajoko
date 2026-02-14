import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-16 pb-16 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold mb-6 sm:mb-8 border border-blue-100 dark:border-blue-900">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            JOKO AI ONLINE
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 leading-tight">
            Jelajahi Hati Pulau Jawa <br className="hidden sm:block"/>
            <span className="text-primary">dengan Mata AI.</span>
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            Joko adalah asisten pribadi Yogyakarta Anda. Dari warung Gudeg tersembunyi hingga matahari terbenam di candi megah, dapatkan rekomendasi yang dipersonalisasi secara instan.
          </p>

          <div className="max-w-2xl mx-auto px-4">
            <form className="flex items-center bg-white dark:bg-slate-900 rounded-xl shadow-lg p-2 border border-slate-200 dark:border-slate-800 focus-within:border-primary dark:focus-within:border-primary transition-all">
              <div className="shrink-0 pl-3 pr-2">
                <span className="material-icons-round text-primary text-xl">chat_bubble_outline</span>
              </div>
              <input 
                className="w-full py-3 px-2 bg-transparent border-none focus:ring-0 text-sm placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white" 
                placeholder="Tanya apapun tentang Yogyakarta..." 
                type="text"
              />
              <Link href="/chat" className="bg-primary text-white px-4 py-3 rounded-lg flex items-center justify-center transition-all hover:bg-primary/90">
                <span className="material-icons-round text-xl">send</span>
              </Link>
            </form>
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
              <span className="text-slate-500 dark:text-slate-400">Coba:</span>
              <button className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-sm border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                &ldquo;Spot sunset terbaik?&rdquo;
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-sm border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                &ldquo;Kafe tenang&rdquo;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Destinasi Trending</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">Dikurasi oleh Joko dan komunitas Jogja</p>
          </div>
          <Link href="/destinasi" className="text-primary font-semibold flex items-center gap-1 group text-sm">
            Lihat semua 
            <span className="material-icons-round text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'Tebing Breksi',
              location: 'Sleman, Yogyakarta',
              rating: 4.8,
              category: 'Alam',
              image: 'https://images.unsplash.com/photo-1523428096881-f7b6beec67e6?w=800&auto=format&fit=crop',
              description: 'Tebing batu kapur yang dipahat tangan yang menakjubkan.'
            },
            {
              name: 'Borobudur Temple',
              location: 'Magelang, Central Java',
              rating: 4.9,
              category: 'Warisan',
              image: 'https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?w=800&auto=format&fit=crop',
              description: 'Candi Buddha terbesar di dunia.'
            },
            {
              name: 'Parangtritis Beach',
              location: 'Bantul, Yogyakarta',
              rating: 4.7,
              category: 'Alam',
              image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop',
              description: 'Pantai pasir hitam mistis dengan tebing dramatis.'
            }
          ].map((dest, index) => (
            <div key={index} className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition-all border border-slate-200 dark:border-slate-800 cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" src={dest.image} alt={dest.name} />
                <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow">
                  <span className="material-icons-round text-yellow-500 text-sm">star</span> {dest.rating}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{dest.name}</h3>
                  <span className={`px-2 py-0.5 ${dest.category === 'Alam' ? 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400' : 'bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400'} text-[10px] font-bold rounded uppercase tracking-wide shrink-0`}>
                    {dest.category}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{dest.description}</p>
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-500">
                  <span className="material-icons-round text-sm text-primary">location_on</span>
                  {dest.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white dark:bg-slate-900 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">Kenapa Pilih Joko?</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Asisten perjalanan bertenaga AI dengan keahlian lokal</p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl text-center border border-slate-200 dark:border-slate-800">
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="material-icons-round text-white text-2xl">mic</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Input Suara</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Tanya pakai suara, dapat jawaban langsung. Praktis dan cepat!
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl text-center border border-slate-200 dark:border-slate-800">
              <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="material-icons-round text-white text-2xl">translate</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Multi-Bahasa</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Dukungan Bahasa Indonesia, English, dan Bahasa Jawa.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl text-center border border-slate-200 dark:border-slate-800">
              <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="material-icons-round text-white text-2xl">recommend</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Rekomendasi Cerdas</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                AI memberikan rekomendasi sesuai preferensi dan lokasi Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-900 dark:to-slate-950 rounded-2xl p-8 sm:p-12 text-center">
          <div className="relative z-10">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="material-icons-round text-white text-3xl">explore</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
              Siap untuk petualangan Jogja-mu?
            </h2>
            <p className="text-slate-300 mb-6 max-w-xl mx-auto text-xs sm:text-sm px-4">
              Biarkan Joko memandu Anda melalui keajaiban Yogyakarta. Mulai perjalanan personal Anda hari ini.
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all"
            >
              <span className="material-icons-round text-lg">chat</span>
              Mulai Chat Sekarang
              <span className="material-icons-round text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="text-center text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
            <p>© 2026 Tanya Joko. Powered by Manifesto.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
