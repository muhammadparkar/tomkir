'use client';

import React from 'react';
import { Heart, Sparkles, Award, ShoppingBag, ArrowDown } from './Icons';
import LiveTimer from './LiveTimer';

interface HeroSectionProps {
  officialDate: string;
  togetherSince: string;
  onOpenLogModal: () => void;
}

export default function HeroSection({
  officialDate,
  togetherSince,
  onOpenLogModal
}: HeroSectionProps) {
  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-center overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
        {/* Floating Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-rose-500/40 shadow-lg shadow-rose-950/30 mb-6 animate-bounce">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-heartbeat" />
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-rose-200 uppercase">
            Private Couple Portal for Tauqeer & Shanzee
          </span>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>

        {/* Main Heading */}
        <h1 className="font-serif-romantic text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-gradient-romantic mb-6 drop-shadow-lg leading-tight">
          Our Love Reward System ❤️
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl text-lg sm:text-2xl text-rose-100/90 font-light leading-relaxed mb-10">
          Every little effort counts. Every missed moment becomes a reward.
        </p>

        {/* Live Relationship Timer Component */}
        <div className="w-full mb-12">
          <LiveTimer officialDate={officialDate} togetherSince={togetherSince} />
        </div>

        {/* CTA Button Group */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenLogModal}
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-semibold text-base sm:text-lg shadow-xl shadow-rose-600/40 hover:shadow-rose-600/60 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>Log Missed Activity</span>
          </button>

          <button
            onClick={() => scrollToSection('#redemption')}
            className="flex items-center gap-3 px-8 py-4 rounded-full glass-panel border border-rose-500/40 text-rose-200 hover:text-white hover:bg-rose-500/20 font-semibold text-base sm:text-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 text-pink-400" />
            <span>Redemption Store</span>
          </button>

          <button
            onClick={() => scrollToSection('#tracker')}
            className="flex items-center gap-3 px-8 py-4 rounded-full glass-panel border border-rose-500/40 text-rose-200 hover:text-white hover:bg-rose-500/20 font-semibold text-base sm:text-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Award className="w-5 h-5 text-amber-400" />
            <span>View Statistics</span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 animate-bounce">
          <button
            onClick={() => scrollToSection('#tracker')}
            className="p-3 rounded-full glass-panel border border-rose-500/30 text-rose-400 hover:text-rose-200 transition-colors cursor-pointer"
            aria-label="Scroll Down"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
