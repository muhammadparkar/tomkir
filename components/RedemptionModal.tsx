'use client';

import React, { useState } from 'react';
import { RewardItem, PartnerProfile, PartnerId } from '../types';
import { triggerConfetti } from '../lib/confetti';
import { ShoppingBag, CheckCircle, Sparkles, Heart, AlertCircle } from './Icons';

interface RedemptionModalProps {
  reward: RewardItem | null;
  partners: Record<'tauqeer' | 'shanzee', PartnerProfile>;
  onConfirmRedeem: (reward: RewardItem, partnerId: PartnerId) => void;
  onClose: () => void;
}

export default function RedemptionModal({
  reward,
  partners,
  onConfirmRedeem,
  onClose
}: RedemptionModalProps) {
  const [selectedPartner, setSelectedPartner] = useState<PartnerId>('shanzee');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!reward) return null;

  const currentPartner = partners[selectedPartner];
  const hasEnoughPoints = currentPartner.points >= reward.pointsRequired;
  const remainingBalance = currentPartner.points - reward.pointsRequired;

  const handleConfirm = () => {
    if (!hasEnoughPoints) return;
    setIsProcessing(true);

    // Trigger canvas-confetti heart celebration!
    triggerConfetti();

    setTimeout(() => {
      onConfirmRedeem(reward, selectedPartner);
      setIsProcessing(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl glass-panel border border-rose-500/40 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-rose-500/20">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-pink-400" />
            <h3 className="font-serif-romantic text-2xl font-bold text-rose-100">
              Confirm Reward Redemption
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-rose-300 hover:text-white text-xl font-bold p-1 rounded-full hover:bg-rose-500/20 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Selected Reward Card */}
        <div className="p-5 rounded-2xl glass-panel border border-rose-500/30 flex items-center gap-4 mb-6 bg-gradient-to-r from-rose-950/40 via-purple-950/20 to-transparent">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-4xl shrink-0 shadow-lg">
            {reward.icon}
          </div>
          <div>
            <h4 className="text-xl font-bold text-rose-100">{reward.title}</h4>
            <p className="text-xs text-rose-200/80 mt-0.5">{reward.description}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-500/30 text-rose-200 text-xs font-bold border border-rose-500/40">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Cost: {reward.pointsRequired} Points</span>
            </div>
          </div>
        </div>

        {/* Partner Selection */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-2">
            Who is redeeming this reward?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedPartner('tauqeer')}
              className={`p-3.5 rounded-2xl flex items-center justify-between border transition-all cursor-pointer ${
                selectedPartner === 'tauqeer'
                  ? 'bg-blue-600/30 border-blue-400 text-blue-200 shadow-md font-bold'
                  : 'glass-panel border-rose-500/20 text-rose-200/70 hover:bg-rose-500/10'
              }`}
            >
              <span>👦 Tauqeer</span>
              <span className="text-xs">{partners.tauqeer.points} pts</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedPartner('shanzee')}
              className={`p-3.5 rounded-2xl flex items-center justify-between border transition-all cursor-pointer ${
                selectedPartner === 'shanzee'
                  ? 'bg-pink-600/30 border-pink-400 text-pink-200 shadow-md font-bold'
                  : 'glass-panel border-rose-500/20 text-rose-200/70 hover:bg-rose-500/10'
              }`}
            >
              <span>👧 Shanzee</span>
              <span className="text-xs">{partners.shanzee.points} pts</span>
            </button>
          </div>
        </div>

        {/* Balance Preview */}
        <div className="p-4 rounded-2xl glass-panel border border-rose-500/20 mb-6 flex items-center justify-between text-xs sm:text-sm">
          <div>
            <span className="text-rose-200/80">Current Balance: </span>
            <strong className="text-rose-100">{currentPartner.points} Pts</strong>
          </div>
          <div>
            <span className="text-rose-200/80">Remaining After: </span>
            <strong
              className={hasEnoughPoints ? 'text-emerald-400 font-bold' : 'text-rose-500 font-bold'}
            >
              {hasEnoughPoints ? `${remainingBalance} Pts` : 'Insufficient Points'}
            </strong>
          </div>
        </div>

        {!hasEnoughPoints && (
          <div className="mb-6 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>
              You need {reward.pointsRequired - currentPartner.points} more points to redeem this item!
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="py-3 rounded-2xl glass-panel border border-rose-500/40 text-rose-200 font-semibold hover:bg-rose-500/20 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={!hasEnoughPoints || isProcessing}
            className={`py-3 rounded-2xl font-bold text-white flex items-center justify-center gap-2 cursor-pointer ${
              hasEnoughPoints
                ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 shadow-lg shadow-rose-600/30'
                : 'bg-rose-950/40 text-rose-400/50 border border-rose-500/20 cursor-not-allowed'
            }`}
          >
            {isProcessing ? (
              <Sparkles className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Heart className="w-4 h-4 text-rose-200 fill-rose-200" />
                <span>Confirm & Redeem</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
