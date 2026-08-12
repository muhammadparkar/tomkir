'use client';

import React from 'react';
import { EmailLog } from '../types';
import { Mail, Heart, CheckCircle2, Send, Sparkles } from './Icons';

interface EmailSimulationModalProps {
  log: EmailLog | null;
  onClose: () => void;
}

export default function EmailSimulationModal({ log, onClose }: EmailSimulationModalProps) {
  if (!log) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 rounded-3xl glass-panel border border-rose-500/40 shadow-2xl relative flex flex-col justify-between">
        {/* Email Client Header */}
        <div>
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-rose-500/20">
            <div className="flex items-center gap-2.5">
              <Mail className="w-6 h-6 text-pink-400" />
              <h3 className="font-serif-romantic text-2xl font-bold text-rose-100">
                Email Dispatch Notification
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-rose-300 hover:text-white text-xl font-bold p-1 rounded-full hover:bg-rose-500/20 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Email Envelope Info */}
          <div className="p-4 rounded-2xl glass-panel border border-rose-500/20 mb-6 flex flex-col gap-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-rose-200/70">From:</span>
              <span className="font-semibold text-rose-100">{log.sender}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-rose-200/70">To:</span>
              <span className="font-semibold text-pink-300">{log.recipient}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-rose-200/70">Subject:</span>
              <span className="font-bold text-amber-300">{log.subject}</span>
            </div>
            <div className="flex justify-between text-[11px] text-rose-200/50 pt-1 border-t border-rose-500/10">
              <span>Timestamp: {new Date(log.timestamp).toLocaleString()}</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Status: {log.status}
              </span>
            </div>
          </div>

          {/* Rendered HTML Email Content */}
          <div className="p-6 rounded-2xl bg-white text-slate-900 shadow-inner font-sans leading-relaxed border border-rose-200">
            <div dangerouslySetInnerHTML={{ __html: log.bodyHtml }} />
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 pt-4 border-t border-rose-500/20 flex items-center justify-between text-xs text-rose-200/70">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Sent to Tauqeer & Shanzee Inbox
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-rose-600 to-pink-500 text-white font-bold text-xs shadow-md cursor-pointer"
          >
            Close Email Preview
          </button>
        </div>
      </div>
    </div>
  );
}
