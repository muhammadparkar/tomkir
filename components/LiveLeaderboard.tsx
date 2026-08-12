'use client';

import React from 'react';
import { PartnerProfile } from '../types';
import { Crown, Sparkles, Trophy, Award, Flame } from './Icons';

interface LiveLeaderboardProps {
  partners: Record<'tauqeer' | 'shanzee', PartnerProfile>;
}

export default function LiveLeaderboard({ partners }: LiveLeaderboardProps) {
  const tauqeer = partners.tauqeer;
  const shanzee = partners.shanzee;

  const leader = tauqeer.points >= shanzee.points ? tauqeer : shanzee;
  const runnerUp = tauqeer.points >= shanzee.points ? shanzee : tauqeer;
  const margin = Math.abs(tauqeer.points - shanzee.points);

  return (
    <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Crown className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>Real-time Rankings</span>
        </div>
        <h2 className="font-serif-romantic text-4xl sm:text-5xl font-bold text-gradient-romantic">
          Live Love Leaderboard
        </h2>
        <p className="text-rose-200/80 text-sm sm:text-base mt-2">
          Who currently holds the romantic crown? Updated live with every logged activity.
        </p>
      </div>

      {/* Leaderboard Showcase Card */}
      <div className="relative p-6 sm:p-10 rounded-3xl glass-panel border border-amber-500/40 shadow-2xl bg-gradient-to-b from-rose-950/40 via-purple-950/20 to-rose-950/50 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Lead Banner */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/30">
            <Crown className="w-5 h-5 animate-pulse" />
            <span>{leader.name} is Leading by +{margin} Points! 👑</span>
          </div>
        </div>

        {/* Comparison Podium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* #1 Leader Card */}
          <div className="relative p-6 sm:p-8 rounded-3xl glass-panel border-2 border-amber-400/60 bg-gradient-to-b from-amber-950/30 via-rose-950/40 to-slate-950/60 shadow-2xl flex flex-col justify-between transform hover:scale-[1.02] transition-transform">
            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-slate-950 font-bold text-xl shadow-lg shadow-amber-400/50 animate-pulse">
              👑
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={leader.avatar}
                    alt={leader.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-amber-400 shadow-xl shadow-amber-500/30"
                  />
                  <div className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase">
                    Rank #1
                  </div>
                </div>
                <div>
                  <h3 className="font-serif-romantic text-3xl font-bold text-amber-200 flex items-center gap-2">
                    <span>{leader.name}</span>
                    <span>👑</span>
                  </h3>
                  <p className="text-xs text-pink-300 font-medium">{leader.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-2xl glass-panel border border-amber-500/30 text-center">
                  <Trophy className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <span className="text-2xl font-extrabold text-amber-300">{leader.points}</span>
                  <span className="text-[10px] text-amber-200/70 block uppercase mt-0.5">Current Points</span>
                </div>
                <div className="p-3 rounded-2xl glass-panel border border-amber-500/30 text-center">
                  <Award className="w-5 h-5 text-rose-400 mx-auto mb-1" />
                  <span className="text-2xl font-extrabold text-rose-200">{leader.redeemedPoints}</span>
                  <span className="text-[10px] text-rose-200/70 block uppercase mt-0.5">Total Rewards</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between text-xs font-semibold text-amber-300">
              <span className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-amber-400" />
                Streak: {leader.currentStreak} Days
              </span>
              <span>Status: Royal Leader</span>
            </div>
          </div>

          {/* #2 Runner Up Card */}
          <div className="relative p-6 sm:p-8 rounded-3xl glass-panel border border-rose-500/30 bg-gradient-to-b from-rose-950/30 via-slate-950/40 to-rose-950/40 shadow-xl flex flex-col justify-between transform hover:scale-[1.01] transition-transform">
            <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full glass-panel border border-rose-500/40 flex items-center justify-center text-rose-200 font-bold text-sm">
              #2
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={runnerUp.avatar}
                    alt={runnerUp.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-rose-400/60 shadow-lg shadow-rose-500/20"
                  />
                  <div className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-rose-950 border border-rose-500/40 text-rose-200 text-[10px] font-semibold">
                    Challenger
                  </div>
                </div>
                <div>
                  <h3 className="font-serif-romantic text-3xl font-bold text-rose-100">
                    {runnerUp.name}
                  </h3>
                  <p className="text-xs text-pink-300 font-medium">{runnerUp.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-2xl glass-panel border border-rose-500/20 text-center">
                  <Trophy className="w-5 h-5 text-rose-400 mx-auto mb-1" />
                  <span className="text-2xl font-extrabold text-rose-100">{runnerUp.points}</span>
                  <span className="text-[10px] text-rose-200/70 block uppercase mt-0.5">Current Points</span>
                </div>
                <div className="p-3 rounded-2xl glass-panel border border-rose-500/20 text-center">
                  <Award className="w-5 h-5 text-pink-400 mx-auto mb-1" />
                  <span className="text-2xl font-extrabold text-rose-100">{runnerUp.redeemedPoints}</span>
                  <span className="text-[10px] text-rose-200/70 block uppercase mt-0.5">Total Rewards</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-rose-500/20 flex items-center justify-between text-xs font-semibold text-rose-300/80">
              <span className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-amber-400" />
                Streak: {runnerUp.currentStreak} Days
              </span>
              <span>Needs +{margin + 1} Pts to Overtake!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
