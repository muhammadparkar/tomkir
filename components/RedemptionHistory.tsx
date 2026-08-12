'use client';

import React, { useState } from 'react';
import { RedemptionRecord } from '../types';
import { History, Search, Download, Printer, Sparkles, CheckCircle, Clock } from './Icons';

interface RedemptionHistoryProps {
  redemptions: RedemptionRecord[];
}

export default function RedemptionHistory({ redemptions }: RedemptionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPartner, setSelectedPartner] = useState<string>('all');

  const filtered = redemptions.filter((red) => {
    const matchesSearch = red.rewardTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPartner = selectedPartner === 'all' || red.redeemedBy === selectedPartner;
    return matchesSearch && matchesPartner;
  });

  const exportToCSV = () => {
    const headers = ['ID,Reward,Redeemed By,Points Used,Date,Status,Remaining Points\n'];
    const rows = redemptions.map((r) =>
      `"${r.id}","${r.rewardTitle}","${r.redeemedBy}",${r.pointsUsed},"${new Date(r.date).toLocaleString()}","${r.status}",${r.remainingPointsAfter}`
    );
    const blob = new Blob([headers.join('') + rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Love_Portal_Redemption_History_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <section id="history" className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <History className="w-3.5 h-3.5 text-amber-400" />
          <span>Reward Memory Timeline</span>
        </div>
        <h2 className="font-serif-romantic text-4xl sm:text-5xl font-bold text-gradient-romantic">
          Redemption History
        </h2>
        <p className="text-rose-200/80 text-sm sm:text-base mt-2">
          Cherished memories unlocked through love rewards. Filter, export, or print anytime.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="p-4 sm:p-6 rounded-3xl glass-panel border border-rose-500/30 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-rose-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search redemption history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full glass-panel border border-rose-500/30 text-rose-100 placeholder-rose-300/50 text-sm focus:outline-none focus:border-rose-400"
          />
        </div>

        {/* Partner Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['all', 'tauqeer', 'shanzee'].map((partner) => (
            <button
              key={partner}
              onClick={() => setSelectedPartner(partner)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider capitalize transition-all cursor-pointer ${
                selectedPartner === partner
                  ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-md'
                  : 'glass-panel border border-rose-500/30 text-rose-200 hover:bg-rose-500/20'
              }`}
            >
              {partner === 'all' ? 'All Partners' : partner}
            </button>
          ))}
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20 text-xs font-semibold transition-all cursor-pointer"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrintPDF}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-rose-500/40 text-rose-300 hover:bg-rose-500/20 text-xs font-semibold transition-all cursor-pointer"
            title="Print / Save PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Timeline View */}
      <div className="relative pl-6 sm:pl-10 border-l-2 border-rose-500/30 space-y-6">
        {filtered.length === 0 ? (
          <div className="p-8 rounded-3xl glass-panel border border-rose-500/20 text-center">
            <p className="text-rose-200/70 text-sm">No redemption records match your search filter.</p>
          </div>
        ) : (
          filtered.map((record) => (
            <div key={record.id} className="relative group">
              {/* Timeline Bullet Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-5 h-5 rounded-full bg-gradient-to-r from-rose-500 to-pink-400 border-2 border-[#0f0b15] shadow-md shadow-rose-500/50 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              {/* Record Card */}
              <div className="p-5 sm:p-6 rounded-3xl glass-panel border border-rose-500/30 hover:border-rose-500/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-3xl shrink-0">
                    {record.rewardIcon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-rose-100">{record.rewardTitle}</h4>
                    <div className="flex items-center gap-3 text-xs text-rose-200/70 mt-1">
                      <span>
                        Redeemed by:{' '}
                        <strong className="text-pink-300 capitalize">
                          {record.redeemedBy === 'tauqeer' ? 'Tauqeer 👦' : 'Shanzee 👧'}
                        </strong>
                      </span>
                      <span>•</span>
                      <span>{new Date(record.date).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-rose-500/10">
                  <div className="text-right">
                    <span className="text-base font-extrabold text-amber-400">
                      -{record.pointsUsed} Pts
                    </span>
                    <span className="block text-[10px] text-rose-200/60">
                      Rem: {record.remainingPointsAfter} Pts
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      record.status === 'Fulfilled'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {record.status === 'Fulfilled' ? (
                      <CheckCircle className="w-3.5 h-3.5" />
                    ) : (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                    <span>{record.status}</span>
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
