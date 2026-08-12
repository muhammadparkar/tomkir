'use client';

import React, { useState } from 'react';
import { RewardItem, PartnerProfile } from '../types';
import { ShoppingBag, Sparkles, Heart, CheckCircle2, Lock } from './Icons';

interface RedemptionStoreProps {
  rewards: RewardItem[];
  partners: Record<'tauqeer' | 'shanzee', PartnerProfile>;
  onSelectReward: (reward: RewardItem) => void;
}

export default function RedemptionStore({
  rewards,
  partners,
  onSelectReward
}: RedemptionStoreProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'food', 'entertainment', 'romantic', 'gifts', 'special'];

  const filteredRewards = rewards.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  const maxPointsAvailable = Math.max(partners.tauqeer.points, partners.shanzee.points);

  return (
    <section id="redemption" className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <ShoppingBag className="w-3.5 h-3.5 text-pink-400" />
          <span>Reward Marketplace</span>
        </div>
        <h2 className="font-serif-romantic text-4xl sm:text-5xl font-bold text-gradient-romantic">
          Love Redemption Store
        </h2>
        <p className="text-rose-200/80 text-sm sm:text-base mt-2">
          Unlock romantic dates, cozy treats, handwritten letters, and special surprises!
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider capitalize transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-lg shadow-rose-600/30'
                : 'glass-panel border border-rose-500/30 text-rose-200 hover:bg-rose-500/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 grid-flow-dense">
        {filteredRewards.map((reward) => {
          const canAffordAny = maxPointsAvailable >= reward.pointsRequired;

          return (
            <div
              key={reward.id}
              className="p-6 rounded-3xl glass-card-interactive flex flex-col justify-between relative overflow-hidden group"
            >
              {reward.badge && (
                <div className="absolute top-4 right-4 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[10px] font-extrabold shadow-md uppercase tracking-wider">
                  {reward.badge}
                </div>
              )}

              <div>
                <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {reward.icon}
                </div>
                <h3 className="text-xl font-bold text-rose-100 mb-1">{reward.title}</h3>
                <p className="text-xs text-rose-200/70 leading-relaxed mb-4">
                  {reward.description}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between py-3 border-t border-rose-500/20 mb-4">
                  <span className="text-xs font-semibold text-pink-300">Required Points:</span>
                  <span className="text-lg font-extrabold text-amber-400">
                    {reward.pointsRequired} Pts
                  </span>
                </div>

                <button
                  onClick={() => onSelectReward(reward)}
                  className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    canAffordAny
                      ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white shadow-lg shadow-rose-600/30 hover:scale-[1.02]'
                      : 'glass-panel border border-rose-500/30 text-rose-300 hover:bg-rose-500/20'
                  }`}
                >
                  {canAffordAny ? (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-200" />
                      <span>Redeem Reward</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-rose-400" />
                      <span>Redeem ({reward.pointsRequired} Pts)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
