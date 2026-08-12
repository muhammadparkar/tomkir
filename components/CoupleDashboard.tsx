'use client';

import React from 'react';
import { PartnerProfile } from '../types';
import { Award, Flame, CheckCircle, Gift, Heart, Sparkles } from './Icons';

interface CoupleDashboardProps {
  partners: Record<'tauqeer' | 'shanzee', PartnerProfile>;
}

export default function CoupleDashboard({ partners }: CoupleDashboardProps) {
  const tauqeer = partners.tauqeer;
  const shanzee = partners.shanzee;

  const isTauqeerLeading = tauqeer.points >= shanzee.points;

  const CircularProgress = ({ value, max = 200, color }: { value: number; max?: number; color: string }) => {
    const percentage = Math.min(Math.round((value / max) * 100), 100);
    const radius = 38;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center w-24 h-24">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            className="stroke-rose-950/40"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-rose-100">{value}</span>
          <span className="text-[9px] uppercase tracking-wider text-rose-300/80">Points</span>
        </div>
      </div>
    );
  };

  const ProfileCard = ({ partner, isLeading }: { partner: PartnerProfile; isLeading: boolean }) => (
    <div
      className={`relative rounded-3xl p-6 sm:p-8 glass-panel border transition-all duration-500 hover:scale-[1.02] ${
        isLeading
          ? 'border-amber-400/50 shadow-2xl shadow-amber-500/20 bg-gradient-to-b from-rose-950/40 via-purple-950/30 to-rose-950/50'
          : 'border-rose-500/30 shadow-xl shadow-rose-950/20'
      }`}
    >
      {/* Crown Badge if Leading */}
      {isLeading && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/40 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CURRENT LEADER 👑</span>
        </div>
      )}

      {/* Header Profile Section */}
      <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-rose-500/20">
        <div className="relative">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-400 shadow-xl shadow-rose-500/30">
            <img
              src={partner.avatar}
              alt={partner.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-rose-950 border border-rose-500/40 text-xs font-semibold text-pink-300">
            {partner.id === 'tauqeer' ? '👦' : '👧'}
          </div>
        </div>

        <div className="text-center sm:text-left flex-1">
          <h3 className="font-serif-romantic text-3xl font-bold text-rose-100 flex items-center justify-center sm:justify-start gap-2">
            <span>{partner.name}</span>
            {isLeading && <span className="text-amber-400">👑</span>}
          </h3>
          <p className="text-sm font-medium text-pink-300/90 mt-1">{partner.role}</p>

          <div className="mt-3 flex items-center justify-center sm:justify-start gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/20 text-rose-200 text-xs font-semibold border border-rose-500/30">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              {partner.currentStreak} Day Streak
            </span>
          </div>
        </div>

        {/* Circular Progress Gauge */}
        <div className="mt-2 sm:mt-0">
          <CircularProgress
            value={partner.points}
            max={200}
            color={partner.id === 'tauqeer' ? '#3b82f6' : '#ec4899'}
          />
        </div>
      </div>

      {/* Grid Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        <div className="p-3.5 rounded-2xl glass-panel border border-rose-500/20 flex flex-col items-center text-center">
          <Award className="w-5 h-5 text-amber-400 mb-1" />
          <span className="text-xl font-bold text-rose-100">{partner.points}</span>
          <span className="text-[11px] text-pink-300/80 font-medium mt-0.5">Current Points</span>
        </div>

        <div className="p-3.5 rounded-2xl glass-panel border border-rose-500/20 flex flex-col items-center text-center">
          <Gift className="w-5 h-5 text-rose-400 mb-1" />
          <span className="text-xl font-bold text-rose-100">{partner.redeemedPoints}</span>
          <span className="text-[11px] text-pink-300/80 font-medium mt-0.5">Redeemed</span>
        </div>

        <div className="p-3.5 rounded-2xl glass-panel border border-rose-500/20 flex flex-col items-center text-center">
          <Heart className="w-5 h-5 text-pink-400 mb-1" />
          <span className="text-xl font-bold text-rose-100">{partner.pendingRewardsCount}</span>
          <span className="text-[11px] text-pink-300/80 font-medium mt-0.5">Pending Rewards</span>
        </div>

        <div className="p-3.5 rounded-2xl glass-panel border border-rose-500/20 flex flex-col items-center text-center">
          <CheckCircle className="w-5 h-5 text-emerald-400 mb-1" />
          <span className="text-xl font-bold text-rose-100">{partner.completedActivitiesCount}</span>
          <span className="text-[11px] text-pink-300/80 font-medium mt-0.5">Completed</span>
        </div>
      </div>
    </div>
  );

  return (
    <section id="tracker" className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Real-time Stats</span>
        </div>
        <h2 className="font-serif-romantic text-4xl sm:text-5xl font-bold text-gradient-romantic">
          Couple Love Dashboard
        </h2>
        <p className="text-rose-200/80 text-sm sm:text-base mt-2">
          Track current love balances, streaks, and redeemed rewards in real-time.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProfileCard partner={tauqeer} isLeading={isTauqeerLeading} />
        <ProfileCard partner={shanzee} isLeading={!isTauqeerLeading} />
      </div>
    </section>
  );
}
