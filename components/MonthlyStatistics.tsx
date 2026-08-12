'use client';

import React from 'react';
import { LoggedActivity } from '../types';
import { BarChart, DoughnutChart, LineChart } from './Charts';
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Sparkles } from './Icons';

interface MonthlyStatisticsProps {
  activities: LoggedActivity[];
}

export default function MonthlyStatistics({ activities }: MonthlyStatisticsProps) {
  // 1. Bar Chart Data (Points per month for Tauqeer vs Shanzee)
  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const tauqeerMonthlyPoints = [45, 60, 75, 85, 90, 105];
  const shanzeeMonthlyPoints = [50, 65, 80, 110, 120, 135];

  const barData = {
    labels: months,
    datasets: [
      {
        label: 'Tauqeer Points 👦',
        data: tauqeerMonthlyPoints,
        backgroundColor: 'rgba(59, 130, 246, 0.75)',
        borderColor: '#3b82f6'
      },
      {
        label: 'Shanzee Points 👧',
        data: shanzeeMonthlyPoints,
        backgroundColor: 'rgba(236, 72, 153, 0.75)',
        borderColor: '#ec4899'
      }
    ]
  };

  // 2. Doughnut Chart Data (Activity Breakdown)
  const activityCounts: Record<string, number> = {};
  activities.forEach((act) => {
    activityCounts[act.activityTitle] = (activityCounts[act.activityTitle] || 0) + 1;
  });

  const pieLabels = Object.keys(activityCounts).length > 0
    ? Object.keys(activityCounts)
    : ['Slept Without Calling', "Didn't Say Good Morning", 'Missed Video Call', 'Ignored Messages'];

  const pieValues = Object.keys(activityCounts).length > 0
    ? Object.values(activityCounts)
    : [8, 5, 4, 3];

  const pieData = {
    labels: pieLabels,
    datasets: [
      {
        data: pieValues,
        backgroundColor: [
          '#e11d48',
          '#f59e0b',
          '#3b82f6',
          '#a855f7',
          '#10b981'
        ]
      }
    ]
  };

  // 3. Line Chart Data (Relationship Consistency)
  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Love Consistency Index (%)',
        data: [88, 92, 95, 91, 97, 99],
        borderColor: '#f43f5e',
        backgroundColor: 'rgba(244, 63, 94, 0.15)'
      }
    ]
  };

  return (
    <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Analytics & Trends</span>
        </div>
        <h2 className="font-serif-romantic text-4xl sm:text-5xl font-bold text-gradient-romantic">
          Monthly Statistics & Visual Insights
        </h2>
        <p className="text-rose-200/80 text-sm sm:text-base mt-2">
          Visualize points earned, activity distribution, and overall relationship consistency over time.
        </p>
      </div>

      {/* Grid of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-rose-500/30 shadow-xl flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-rose-100">Points Earned Each Month</h3>
              <p className="text-xs text-rose-200/70">Tauqeer vs Shanzee monthly score comparison</p>
            </div>
          </div>
          <div className="h-64 sm:h-72 w-full">
            <BarChart data={barData} />
          </div>
        </div>

        {/* Doughnut Chart Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-rose-500/30 shadow-xl flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
              <PieChartIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-rose-100">Activity Breakdown</h3>
              <p className="text-xs text-rose-200/70">Distribution of missed activity categories</p>
            </div>
          </div>
          <div className="h-64 sm:h-72 w-full">
            <DoughnutChart data={pieData} />
          </div>
        </div>

        {/* Line Graph (Full Width) */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl glass-panel border border-rose-500/30 shadow-xl flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-rose-100">Relationship Consistency Trend</h3>
              <p className="text-xs text-rose-200/70">Weekly love index growth and streak stability</p>
            </div>
          </div>
          <div className="h-64 sm:h-80 w-full">
            <LineChart data={lineData} />
          </div>
        </div>
      </div>
    </section>
  );
}
