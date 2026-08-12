'use client';

import React from 'react';
import { Heart, Sparkles, X } from './Icons';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl glass-panel border border-rose-500/50 shadow-2xl bg-gradient-to-r from-rose-950/90 via-purple-950/90 to-rose-950/90 text-rose-100 text-sm font-semibold max-w-md">
        <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-heartbeat" />
        </div>
        <span className="flex-1">{message}</span>
        <button
          onClick={onClose}
          className="text-rose-300 hover:text-white p-1 rounded-full hover:bg-rose-500/20"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
