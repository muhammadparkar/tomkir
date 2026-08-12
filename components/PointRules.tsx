'use client';

import React, { useState } from 'react';
import { ActivityRule } from '../types';
import { Sparkles, Moon, Sun, PhoneCall, MessageSquare, Calendar, Gift, Video, Smile, HeartHandshake, MapPin, Search } from './Icons';

interface PointRulesProps {
  rules: ActivityRule[];
}

export default function PointRules({ rules }: PointRulesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Moon': return <Moon className="w-5 h-5 text-indigo-400" />;
      case 'Sun': return <Sun className="w-5 h-5 text-amber-400" />;
      case 'PhoneCall': return <PhoneCall className="w-5 h-5 text-rose-400" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-pink-400" />;
      case 'Calendar': return <Calendar className="w-5 h-5 text-blue-400" />;
      case 'Gift': return <Gift className="w-5 h-5 text-emerald-400" />;
      case 'Video': return <Video className="w-5 h-5 text-purple-400" />;
      case 'Smile': return <Smile className="w-5 h-5 text-yellow-400" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-rose-300" />;
      case 'MapPin': return <MapPin className="w-5 h-5 text-cyan-400" />;
      default: return <Sparkles className="w-5 h-5 text-amber-300" />;
    }
  };

  const filteredRules = rules.filter((rule) => {
    const matchesSearch = rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rule.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || rule.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="activities" className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Fair & Fun Play</span>
        </div>
        <h2 className="font-serif-romantic text-4xl sm:text-5xl font-bold text-gradient-romantic">
          Love Point Rules & Activities
        </h2>
        <p className="text-rose-200/80 text-sm sm:text-base mt-2">
          Whenever a partner misses a predefined activity, the other partner earns love points!
        </p>
      </div>

      {/* Featured Headline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="p-6 rounded-3xl glass-panel border border-rose-500/30 flex items-center gap-4 bg-gradient-to-r from-rose-950/40 via-purple-950/20 to-transparent">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0">
            <Moon className="w-7 h-7 text-rose-300" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-rose-100">If Tauqeer sleeps without calling Shanzee</h4>
            <div className="inline-flex items-center gap-2 mt-1 px-3 py-0.5 rounded-full bg-rose-500/30 text-rose-200 text-xs font-bold border border-rose-500/40">
              <span>➡ Shanzee earns +5 points</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel border border-rose-500/30 flex items-center gap-4 bg-gradient-to-r from-pink-950/40 via-rose-950/20 to-transparent">
          <div className="w-14 h-14 rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center shrink-0">
            <Moon className="w-7 h-7 text-pink-300" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-rose-100">If Shanzee sleeps without calling Tauqeer</h4>
            <div className="inline-flex items-center gap-2 mt-1 px-3 py-0.5 rounded-full bg-pink-500/30 text-pink-200 text-xs font-bold border border-pink-500/40">
              <span>➡ Tauqeer earns +5 points</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-rose-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search rules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full glass-panel border border-rose-500/30 text-rose-100 placeholder-rose-300/50 text-sm focus:outline-none focus:border-rose-400 transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {['all', 'calls', 'messages', 'milestones', 'other'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider capitalize transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-md shadow-rose-600/30'
                  : 'glass-panel border border-rose-500/30 text-rose-200 hover:bg-rose-500/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 grid-flow-dense">
        {filteredRules.map((rule) => (
          <div
            key={rule.id}
            className="p-5 rounded-2xl glass-card-interactive flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                  {getIcon(rule.iconName)}
                </div>
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-rose-600 to-pink-500 text-white text-xs font-bold shadow-sm shadow-rose-600/30">
                  +{rule.defaultPoints} Points
                </span>
              </div>
              <h3 className="text-base font-bold text-rose-100">{rule.title}</h3>
              <p className="text-xs text-rose-200/70 mt-1.5 leading-relaxed">{rule.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-rose-500/10 flex items-center justify-between text-[11px] font-medium text-pink-300/80">
              <span className="capitalize">Category: {rule.category}</span>
              <span>Default Award</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
