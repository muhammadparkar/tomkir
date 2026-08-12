'use client';

import React from 'react';
import { Heart, Sparkles } from './Icons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 border-t border-rose-500/20 py-12 glass-panel">
      <div className="max-w-7xl mx-auto px-4 text-center flex flex-col items-center gap-6">
        {/* Logo */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 to-pink-400 p-0.5 flex items-center justify-center shadow-lg shadow-rose-500/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0f0b15] rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-heartbeat" />
            </div>
          </div>
          <span className="font-serif-romantic text-2xl font-bold tracking-wide text-rose-300">
            Tauqeer & Shanzee
          </span>
        </button>

        {/* Romantic Quote */}
        <p className="font-serif-romantic text-2xl sm:text-3xl italic text-gradient-romantic max-w-xl">
          &quot;Love grows stronger through every little effort.&quot;
        </p>

        {/* Signature */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-pink-300/80">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline animate-heartbeat" />
          <span>by</span>
          <strong className="text-rose-200 font-bold">Tauqeer & Shanzee</strong>
        </div>

        <p className="text-[11px] text-rose-300/40">
          © {new Date().getFullYear()} Love Points Portal • All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
