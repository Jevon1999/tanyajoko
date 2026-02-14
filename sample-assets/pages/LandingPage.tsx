
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_DESTINATIONS } from '../constants';

const LandingPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate('/chat', { state: { initialPrompt: search } });
    }
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-background-light dark:bg-background-dark">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-primary to-blue-500">Through AI Eyes.</span>
          </h1>
          
          <p className="text-lg text-slate-500 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            Joko is your personal Yogyakarta assistant. From hidden Gudeg stalls to majestic temple sunsets, get hyper-personalized recommendations instantly.
          </p>

          <div className="max-w-3xl mx-auto relative">
            <form onSubmit={handleSearch} className="flex items-center bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-2 border-2 border-primary/20 focus-within:border-primary transition-all">
              <div className="flex-shrink-0 pl-4 pr-2">
                <span className="material-icons-round text-primary">chat_bubble_outline</span>
              </div>
              <input 
                className="w-full py-4 px-2 bg-transparent border-none focus:ring-0 text-lg placeholder-slate-400" 
                placeholder="Ask anything about Yogyakarta..." 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="bg-primary text-background-dark p-4 rounded-xl flex items-center justify-center transition-all hover:shadow-lg hover:shadow-primary/30">
                <span className="material-icons-round">send</span>
              </button>
            </form>
            <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
              <span className="text-slate-400">Try asking:</span>
              <button onClick={() => setSearch('Best sunset spot in Gunung Kidul?')} className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-primary/20 transition-colors shadow-sm border border-slate-100 dark:border-slate-700">"Best sunset spot in Gunung Kidul?"</button>
              <button onClick={() => setSearch('Quiet cafes near Malioboro')} className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-primary/20 transition-colors shadow-sm border border-slate-100 dark:border-slate-700">"Quiet cafes near Malioboro"</button>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">Trending Destinations</h2>
            <p className="text-slate-500 mt-2">Curated by Joko and the Jogja community.</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-1 group">
            View all places <span className="material-icons-round group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_DESTINATIONS.map(dest => (
            <Link to={`/destination/${dest.id}`} key={dest.id} className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-primary/20">
              <div className="relative h-64 overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={dest.image} alt={dest.name} />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm text-slate-800">
                  <span className="material-icons-round text-yellow-500 text-xs">star</span> {dest.rating}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold dark:text-white">{dest.name}</h3>
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
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="bg-background-dark rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden text-center shadow-2xl">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px]"></div>
          </div>
          <div className="relative z-10">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/30">
              <span className="material-icons-round text-primary text-4xl">auto_awesome</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready for your Jogja adventure?</h2>
            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
              Join thousands of travelers who have discovered the soul of Yogyakarta with Joko. Free to use, forever.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/chat" className="w-full sm:w-auto bg-primary text-background-dark px-8 py-4 rounded-full font-extrabold text-lg hover:bg-white hover:scale-105 transition-all flex items-center justify-center gap-2">
                Start Chatting with Joko <span className="material-icons-round">rocket_launch</span>
              </Link>
              <button className="w-full sm:w-auto bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/10">
                Download App
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
