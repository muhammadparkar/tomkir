'use client';

import React from 'react';
import { BadgeItem } from '../types';
import { Award, Lock, Sparkles, CheckCircle2 } from './Icons';

interface AchievementBadgesProps {
  badges: BadgeItem[];
}

export default function AchievementBadges({ badges }: AchievementBadgesProps) {
  return (
    <section id="badges" className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>Romantic Milestones</span>
        </div>
        <h2 className="font-serif-romantic text-4xl sm:text-5xl font-bold text-gradient-romantic">
          Achievement Badges & Trophies
        </h2>
        <p className="text-rose-200/80 text-sm sm:text-base mt-2">
          Unlock badges as your love reward streak and point totals grow!
        </p>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 grid-flow-dense">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`p-6 rounded-3xl glass-panel border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
              badge.isUnlocked
                ? 'border-amber-400/50 shadow-xl shadow-amber-500/10 bg-gradient-to-b from-amber-950/20 via-purple-950/20 to-rose-950/40 hover:scale-[1.02]'
                : 'border-rose-500/20 opacity-75'
            }`}
          >
            {badge.isUnlocked ? (
              <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Unlocked</span>
              </div>
            ) : (
              <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-0.5 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                <Lock className="w-3.5 h-3.5 text-rose-400" />
                <span>Locked</span>
              </div>
            )}

            <div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-rose-500/20 to-pink-500/20 border border-amber-500/30 flex items-center justify-center text-4xl mb-4 shadow-lg">
                {badge.icon}
              </div>
              <h3 className="text-xl font-bold text-rose-100 mb-1">{badge.title}</h3>
              <p className="text-xs text-rose-200/70 leading-relaxed mb-4">
                {badge.description}
              </p>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                <span className="text-rose-300">Milestone Progress</span>
                <span className="text-amber-400">{badge.progress}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-rose-950/60 border border-rose-500/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-1000 ease-out"
                  style={{ width: `${badge.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
