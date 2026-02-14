
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getTravelResponse } from '../services/geminiService';
import { ChatMessage, AIRecommendation } from '../types';

const ChatPage: React.FC = () => {
  const location = useLocation();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', content: 'Halo! Saya Joko, asisten perjalanan Jogja kamu. Ada yang bisa saya bantu hari ini?' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.state?.initialPrompt) {
      handleSend(location.state.initialPrompt);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await getTravelResponse(text);
    
    let modelMsg: ChatMessage;
    if (typeof response === 'string') {
      modelMsg = { id: (Date.now() + 1).toString(), role: 'model', content: response };
    } else {
      modelMsg = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        content: `Berikut adalah rekomendasi tempat untuk Anda:`,
        recommendation: response
      };
    }

    setMessages(prev => [...prev, modelMsg]);
    setLoading(false);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-white dark:bg-slate-900/50 hidden lg:flex">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-background-dark font-bold text-xl">TJ</div>
          <div>
            <h1 className="font-bold text-lg leading-none">Tanya Joko</h1>
            <span className="text-xs text-slate-500 font-medium">Jogja Travel Guide</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-8">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 px-2">Discovery</h2>
            <div className="grid grid-cols-1 gap-2">
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-primary/10 text-slate-700 dark:text-slate-200 hover:bg-primary/20 transition-colors text-sm font-medium">
                <span className="material-icons-round text-primary text-xl">diamond</span> Hidden Gems
              </button>
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium">
                <span className="material-icons-round text-slate-400 text-xl">payments</span> Cheap Eats
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col bg-background-light dark:bg-background-dark">
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-8 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="font-bold text-slate-700 dark:text-slate-200">Chat with Joko</span>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
              <span className="material-icons-round text-lg">share</span> Share Trip
            </button>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'gap-4'}`}>
              {msg.role === 'model' && (
                <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-primary flex items-center justify-center shrink-0 shadow-lg">
                  <span className="material-icons-round text-primary dark:text-background-dark">smart_toy</span>
                </div>
              )}
              <div className={`max-w-[85%] sm:max-w-[70%] space-y-4 ${msg.role === 'user' ? 'bg-primary text-background-dark px-5 py-3 rounded-2xl rounded-tr-none shadow-sm font-medium' : ''}`}>
                {msg.role === 'model' && <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{msg.content}</p>}
                {msg.role === 'user' && msg.content}
                
                {msg.recommendation && (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl max-w-2xl">
                    <div className="relative h-48 overflow-hidden">
                      <img className="w-full h-full object-cover" src={`https://picsum.photos/seed/${msg.recommendation.name}/600/400`} alt={msg.recommendation.name} />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-slate-800 shadow-sm flex items-center gap-1">
                        <span className="material-icons-round text-sm text-yellow-500">star</span> {msg.recommendation.rating} ({msg.recommendation.reviews} Reviews)
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Nama Tempat: <span className="text-primary">{msg.recommendation.name}</span></h3>
                        <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                          <span className="material-icons-round text-sm">location_on</span>
                          <span>Lokasi: {msg.recommendation.location}</span>
                          <a className="text-primary font-bold ml-2 underline underline-offset-2" href="#">Buka Map</a>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 italic">
                        <strong>Deskripsi:</strong> {msg.recommendation.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 dark:bg-green-500/10 p-4 rounded-xl border border-green-100 dark:border-green-500/20">
                          <p className="text-[10px] font-extrabold text-green-700 dark:text-green-400 uppercase tracking-widest mb-2">Kelebihan</p>
                          <ul className="text-xs space-y-1.5 text-green-800 dark:text-green-300">
                            {msg.recommendation.pros.map((p, i) => <li key={i} className="flex gap-2"><span className="material-icons-round text-xs">check_circle</span> {p}</li>)}
                          </ul>
                        </div>
                        <div className="bg-red-50 dark:bg-red-500/10 p-4 rounded-xl border border-red-100 dark:border-red-500/20">
                          <p className="text-[10px] font-extrabold text-red-700 dark:text-red-400 uppercase tracking-widest mb-2">Kekurangan</p>
                          <ul className="text-xs space-y-1.5 text-red-800 dark:text-red-300">
                            {msg.recommendation.cons.map((c, i) => <li key={i} className="flex gap-2"><span className="material-icons-round text-xs">remove_circle</span> {c}</li>)}
                          </ul>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Estimasi Biaya</p>
                          <p className="font-bold text-slate-700 dark:text-slate-200">{msg.recommendation.priceRange}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Rekomendasi Untuk</p>
                          <p className="font-bold text-slate-700 dark:text-slate-200">{msg.recommendation.recommendationFor}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button className="flex-1 bg-primary/20 hover:bg-primary/30 text-background-dark dark:text-primary font-bold py-2 rounded-xl transition-all flex items-center justify-center gap-2">
                          <span className="material-icons-round text-lg">bookmark</span> Simpan ke Trip
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shrink-0">
                <span className="material-icons-round text-primary animate-pulse">smart_toy</span>
              </div>
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl flex gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light/95 to-transparent shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 flex items-center gap-2 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
              <button className="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors flex items-center justify-center">
                <span className="material-icons-round">add_photo_alternate</span>
              </button>
              <input 
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium py-3 px-2" 
                placeholder="Tanya apa saja tentang Jogja ke Joko..." 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              />
              <button className="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors flex items-center justify-center">
                <span className="material-icons-round">mic</span>
              </button>
              <button 
                onClick={() => handleSend(input)}
                className="w-12 h-10 rounded-xl bg-primary text-background-dark flex items-center justify-center hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95 disabled:opacity-50"
                disabled={loading || !input.trim()}
              >
                <span className="material-icons-round">send</span>
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-3 font-medium">Joko can make mistakes. Verify important travel information.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
