'use client';

import React, { useState, useEffect } from 'react';
import { ActivityRule, LoggedActivity, PartnerId } from '../types';
import { Sparkles, Calendar as CalendarIcon, User, PlusCircle, FileText, CheckCircle2 } from './Icons';

interface ActivityLoggerProps {
  rules: ActivityRule[];
  onLogActivity: (activityData: Omit<LoggedActivity, 'id' | 'createdAt'>) => void;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export default function ActivityLogger({
  rules,
  onLogActivity,
  isOpenModal = false,
  onCloseModal
}: ActivityLoggerProps) {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [responsiblePartner, setResponsiblePartner] = useState<PartnerId>('tauqeer');
  const [selectedRuleId, setSelectedRuleId] = useState<string>(rules[0]?.id || '');
  const [points, setPoints] = useState<number>(rules[0]?.defaultPoints || 5);
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const matchedRule = rules.find((r) => r.id === selectedRuleId);
    if (matchedRule) {
      setPoints(matchedRule.defaultPoints);
    }
  }, [selectedRuleId, rules]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const matchedRule = rules.find((r) => r.id === selectedRuleId);
    const earningPartner: PartnerId = responsiblePartner === 'tauqeer' ? 'shanzee' : 'tauqeer';

    setTimeout(() => {
      onLogActivity({
        date,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        responsiblePartner,
        earningPartner,
        activityRuleId: selectedRuleId,
        activityTitle: matchedRule?.title || 'Missed Activity',
        points: Number(points),
        notes
      });

      setIsSubmitting(false);
      setNotes('');
      if (onCloseModal) onCloseModal();
    }, 400);
  };

  const earningPartnerName = responsiblePartner === 'tauqeer' ? 'Shanzee 👧' : 'Tauqeer 👦';

  const formContent = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Date input */}
      <div>
        <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1.5">
          Activity Date
        </label>
        <div className="relative">
          <CalendarIcon className="w-4 h-4 text-rose-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-panel border border-rose-500/30 text-rose-100 text-sm focus:outline-none focus:border-rose-400 transition-colors"
          />
        </div>
      </div>

      {/* Person Responsible */}
      <div>
        <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1.5">
          Person Responsible (Who Missed?)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setResponsiblePartner('tauqeer')}
            className={`p-3 rounded-2xl flex items-center justify-center gap-2 border transition-all cursor-pointer ${
              responsiblePartner === 'tauqeer'
                ? 'bg-blue-600/30 border-blue-400 text-blue-200 shadow-md shadow-blue-500/20 font-bold'
                : 'glass-panel border-rose-500/20 text-rose-200/70 hover:bg-rose-500/10'
            }`}
          >
            <User className="w-4 h-4 text-blue-400" />
            <span>Tauqeer 👦</span>
          </button>

          <button
            type="button"
            onClick={() => setResponsiblePartner('shanzee')}
            className={`p-3 rounded-2xl flex items-center justify-center gap-2 border transition-all cursor-pointer ${
              responsiblePartner === 'shanzee'
                ? 'bg-pink-600/30 border-pink-400 text-pink-200 shadow-md shadow-pink-500/20 font-bold'
                : 'glass-panel border-rose-500/20 text-rose-200/70 hover:bg-rose-500/10'
            }`}
          >
            <User className="w-4 h-4 text-pink-400" />
            <span>Shanzee 👧</span>
          </button>
        </div>
      </div>

      {/* Missed Activity Dropdown */}
      <div>
        <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1.5">
          Missed Activity
        </label>
        <select
          value={selectedRuleId}
          onChange={(e) => setSelectedRuleId(e.target.value)}
          className="w-full px-4 py-2.5 rounded-2xl glass-panel border border-rose-500/30 text-rose-100 bg-[#191024] text-sm focus:outline-none focus:border-rose-400 transition-colors"
        >
          {rules.map((rule) => (
            <option key={rule.id} value={rule.id} className="bg-[#191024] text-rose-100">
              {rule.title} (+{rule.defaultPoints} Points)
            </option>
          ))}
        </select>
      </div>

      {/* Points & Earning Partner Preview */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1.5">
            Points Awarded
          </label>
          <input
            type="number"
            min="1"
            max="500"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            required
            className="w-full px-4 py-2.5 rounded-2xl glass-panel border border-rose-500/30 text-rose-100 text-sm font-bold focus:outline-none focus:border-rose-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1.5">
            Earned By
          </label>
          <div className="px-4 py-2.5 rounded-2xl glass-panel border border-emerald-500/30 text-emerald-300 text-sm font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{earningPartnerName}</span>
          </div>
        </div>
      </div>

      {/* Optional Notes */}
      <div>
        <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1.5">
          Notes (Optional)
        </label>
        <div className="relative">
          <FileText className="w-4 h-4 text-rose-400 absolute left-3.5 top-3" />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Add context or a sweet message..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-panel border border-rose-500/30 text-rose-100 placeholder-rose-300/50 text-sm focus:outline-none focus:border-rose-400"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold text-base shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        {isSubmitting ? (
          <Sparkles className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <CheckCircle2 className="w-5 h-5" />
            <span>Record Missed Activity & Award +{points} Points</span>
          </>
        )}
      </button>
    </form>
  );

  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
        <div className="w-full max-w-lg p-6 rounded-3xl glass-panel border border-rose-500/40 shadow-2xl relative">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-rose-500/20">
            <h3 className="font-serif-romantic text-2xl font-bold text-gradient-romantic flex items-center gap-2">
              <PlusCircle className="w-6 h-6 text-rose-400" />
              <span>Log Daily Activity</span>
            </h3>
            {onCloseModal && (
              <button
                onClick={onCloseModal}
                className="text-rose-300 hover:text-white text-xl font-bold p-1 rounded-full hover:bg-rose-500/20 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-rose-500/30 shadow-xl max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="font-serif-romantic text-3xl font-bold text-gradient-romantic">
          Daily Activity Logger
        </h3>
        <p className="text-xs text-rose-200/80 mt-1">
          Record missed moments and instantly update partner balances.
        </p>
      </div>
      {formContent}
    </div>
  );
}
