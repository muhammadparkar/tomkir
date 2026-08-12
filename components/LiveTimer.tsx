'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Heart, Sparkles } from './Icons';

interface LiveTimerProps {
  officialDate: string; // e.g. "2026-10-06"
  togetherSince: string; // e.g. "2026-06-24"
}

interface TimeDifference {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isUpcoming: boolean;
}

export default function LiveTimer({ officialDate, togetherSince }: LiveTimerProps) {
  const [timeDiff, setTimeDiff] = useState<TimeDifference>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isUpcoming: true
  });

  const [togetherTimeDiff, setTogetherTimeDiff] = useState<TimeDifference>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isUpcoming: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const targetDate = new Date(`${officialDate}T00:00:00`);
      const sinceDate = new Date(`${togetherSince}T00:00:00`);

      // Official Date diff (Count up or count down)
      const isUpcoming = targetDate.getTime() > now.getTime();
      const diffMs = Math.abs(targetDate.getTime() - now.getTime());

      const seconds = Math.floor((diffMs / 1000) % 60);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const daysTotal = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const years = Math.floor(daysTotal / 365);
      const months = Math.floor((daysTotal % 365) / 30);
      const days = daysTotal % 30;

      setTimeDiff({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
        isUpcoming
      });

      // Together Since diff
      const togetherDiffMs = Math.abs(now.getTime() - sinceDate.getTime());
      const togSec = Math.floor((togetherDiffMs / 1000) % 60);
      const togMin = Math.floor((togetherDiffMs / (1000 * 60)) % 60);
      const togHrs = Math.floor((togetherDiffMs / (1000 * 60 * 60)) % 24);
      const togDaysTotal = Math.floor(togetherDiffMs / (1000 * 60 * 60 * 24));
      const togYrs = Math.floor(togDaysTotal / 365);
      const togMths = Math.floor((togDaysTotal % 365) / 30);
      const togDays = togDaysTotal % 30;

      setTogetherTimeDiff({
        years: togYrs,
        months: togMths,
        days: togDays,
        hours: togHrs,
        minutes: togMin,
        seconds: togSec,
        isUpcoming: false
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [officialDate, togetherSince]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl glass-panel border border-rose-500/30 min-w-[70px] sm:min-w-[90px] shadow-lg shadow-rose-950/20">
      <span className="font-serif-romantic text-2xl sm:text-4xl font-bold text-rose-300 tracking-tight">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] sm:text-xs font-semibold uppercase text-pink-400/90 tracking-widest mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Container header */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 mb-4 backdrop-blur-md">
        <Sparkles className="w-4 h-4 text-rose-400 animate-pulse" />
        <span className="text-xs sm:text-sm font-medium text-rose-200">
          Our First Official Date: <strong className="text-pink-300 font-bold">06 October 2026</strong>
        </span>
      </div>

      {/* Live Ticker Units Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4 w-full my-3">
        <TimeUnit value={timeDiff.years} label="Years" />
        <TimeUnit value={timeDiff.months} label="Months" />
        <TimeUnit value={timeDiff.days} label="Days" />
        <TimeUnit value={timeDiff.hours} label="Hours" />
        <TimeUnit value={timeDiff.minutes} label="Minutes" />
        <TimeUnit value={timeDiff.seconds} label="Seconds" />
      </div>

      {/* Status Note & Together Since */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-rose-200/90">
        <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-full border border-pink-500/30">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-heartbeat" />
          <span>
            <strong>Together Since:</strong> 24th June 2026
          </span>
        </div>

        <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-full border border-pink-500/30">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>
            {togetherTimeDiff.months}m {togetherTimeDiff.days}d {togetherTimeDiff.hours}h {togetherTimeDiff.minutes}m together & counting!
          </span>
        </div>
      </div>
    </div>
  );
}
