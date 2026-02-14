
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DetailPage from './pages/DetailPage';
import ChatPage from './pages/ChatPage';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isChat = location.pathname === '/chat';

  if (isChat) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-icons-round text-white text-lg">smart_toy</span>
          </div>
          <span className="font-bold text-xl tracking-tight">Tanya <span className="text-primary">Joko</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Destinations</Link>
          <Link to="/chat" className="text-sm font-medium hover:text-primary transition-colors">AI Planner</Link>
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Community</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/chat" className="bg-primary hover:bg-primary/90 text-background-dark px-5 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105">
            Start Chat
          </Link>
          <div className="w-10 h-10 rounded-full border-2 border-primary/30 overflow-hidden hidden sm:block">
            <img alt="Profile" className="w-full h-full object-cover" src="https://picsum.photos/seed/user123/40/40" />
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => {
  const location = useLocation();
  if (location.pathname === '/chat') return null;

  return (
    <footer className="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-white/5 mt-20 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-icons-round text-white text-lg">smart_toy</span>
            </div>
            <span className="font-bold text-xl tracking-tight">Tanya Joko</span>
          </div>
          <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
            Your AI-powered travel assistant for exploring the cultural heart of Indonesia. Personalizing your Yogyakarta journey one recommendation at a time.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="text-sm space-y-2 text-slate-500">
            <li><Link className="hover:text-primary" to="/">Destinations</Link></li>
            <li><Link className="hover:text-primary" to="/chat">AI Trip Planner</Link></li>
            <li><a className="hover:text-primary" href="#">Partner With Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Connect</h4>
          <div className="flex gap-4">
            <button className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all">
              <span className="material-icons-round text-lg">public</span>
            </button>
            <button className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all">
              <span className="material-icons-round text-lg">camera_alt</span>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-slate-200 dark:border-white/5 text-center text-xs text-slate-400">
        © 2024 Tanya Joko. Hand-crafted for Yogyakarta explorers.
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/destination/:id" element={<DetailPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
