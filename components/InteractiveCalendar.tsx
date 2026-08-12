'use client';

import React, { useState } from 'react';
import { LoggedActivity, PartnerId } from '../types';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, AlertCircle, CheckCircle, Info, Trash2, Edit3 } from './Icons';

interface InteractiveCalendarProps {
  activities: LoggedActivity[];
  onDeleteActivity: (id: string) => void;
  onEditActivity: (activity: LoggedActivity) => void;
}

export default function InteractiveCalendar({
  activities,
  onDeleteActivity,
  onEditActivity
}: InteractiveCalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDayActivities, setSelectedDayActivities] = useState<{
    dateStr: string;
    items: LoggedActivity[];
  } | null>(null);

  // Month navigation
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Calculate days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 is Sun

  // Map activities by date string YYYY-MM-DD
  const activitiesByDate = activities.reduce<Record<string, LoggedActivity[]>>((acc, act) => {
    if (!acc[act.date]) acc[act.date] = [];
    acc[act.date].push(act);
    return acc;
  }, {});

  const daysGrid = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    daysGrid.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    daysGrid.push({ dayNumber: d, dateStr: formattedDate });
  }

  const handleDayClick = (dateStr: string) => {
    const items = activitiesByDate[dateStr] || [];
    setSelectedDayActivities({ dateStr, items });
  };

  const getDayStatus = (items: LoggedActivity[] = []) => {
    if (items.length === 0) return 'green';
    const totalPoints = items.reduce((sum, item) => sum + item.points, 0);
    if (totalPoints >= 5) return 'red';
    return 'yellow';
  };

  return (
    <section id="calendar" className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
          <span>Interactive Calendar</span>
        </div>
        <h2 className="font-serif-romantic text-4xl sm:text-5xl font-bold text-gradient-romantic">
          Love Activity History Calendar
        </h2>
        <p className="text-rose-200/80 text-sm sm:text-base mt-2">
          Click any date to inspect logged activities, view points earned, or edit records.
        </p>
      </div>

      {/* Calendar Card */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-rose-500/30 shadow-2xl">
        {/* Navigation & Month Title */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-rose-500/20">
          <button
            onClick={prevMonth}
            className="p-2.5 rounded-full glass-panel border border-rose-500/30 text-rose-200 hover:text-white hover:bg-rose-500/20 transition-all cursor-pointer"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <h3 className="font-serif-romantic text-2xl sm:text-3xl font-bold text-rose-100 tracking-wide">
            {monthNames[month]} {year}
          </h3>

          <button
            onClick={nextMonth}
            className="p-2.5 rounded-full glass-panel border border-rose-500/30 text-rose-200 hover:text-white hover:bg-rose-500/20 transition-all cursor-pointer"
            aria-label="Next Month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mb-6 text-xs font-semibold text-rose-200/80">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
            <span>🟢 Green: No Issue</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
            <span>🟡 Yellow: Minor (&lt;5 Pts)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
            <span>🔴 Red: Missed Activity (≥5 Pts)</span>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-rose-300 uppercase tracking-wider">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {daysGrid.map((item, idx) => {
            if (!item) {
              return <div key={`empty-${idx}`} className="h-16 sm:h-20" />;
            }

            const dayItems = activitiesByDate[item.dateStr] || [];
            const status = getDayStatus(dayItems);

            const statusColors = {
              green: 'border-emerald-500/30 hover:border-emerald-400 bg-emerald-950/20 text-emerald-200',
              yellow: 'border-amber-500/40 hover:border-amber-400 bg-amber-950/20 text-amber-200',
              red: 'border-rose-500/50 hover:border-rose-400 bg-rose-950/30 text-rose-200 shadow-md shadow-rose-950/30'
            };

            return (
              <button
                key={item.dateStr}
                onClick={() => handleDayClick(item.dateStr)}
                className={`h-16 sm:h-20 rounded-2xl p-2 border transition-all duration-300 flex flex-col justify-between items-start cursor-pointer hover:scale-105 ${statusColors[status]}`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs sm:text-sm font-bold">{item.dayNumber}</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      status === 'green'
                        ? 'bg-emerald-400'
                        : status === 'yellow'
                        ? 'bg-amber-400 animate-pulse'
                        : 'bg-rose-500 animate-pulse'
                    }`}
                  />
                </div>

                {dayItems.length > 0 && (
                  <div className="w-full text-left">
                    <span className="text-[10px] sm:text-xs font-semibold block truncate">
                      {dayItems[0].activityTitle}
                    </span>
                    <span className="text-[9px] opacity-80">
                      +{dayItems.reduce((s, i) => s + i.points, 0)} pts
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Date Detail Popup Modal */}
      {selectedDayActivities && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg p-6 rounded-3xl glass-panel border border-rose-500/40 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-rose-500/20">
              <div>
                <h3 className="font-serif-romantic text-2xl font-bold text-rose-100">
                  Activities on {selectedDayActivities.dateStr}
                </h3>
                <p className="text-xs text-rose-200/70">
                  {selectedDayActivities.items.length === 0
                    ? 'No missed activities logged on this date.'
                    : `${selectedDayActivities.items.length} activity record(s) found.`}
                </p>
              </div>
              <button
                onClick={() => setSelectedDayActivities(null)}
                className="text-rose-300 hover:text-white text-xl font-bold p-1 rounded-full hover:bg-rose-500/20 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {selectedDayActivities.items.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-2 opacity-80" />
                <p className="text-emerald-300 font-semibold text-base">Perfect Day! ❤️</p>
                <p className="text-xs text-rose-200/70 mt-1">
                  Neither Tauqeer nor Shanzee missed any predefined activity.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-1">
                {selectedDayActivities.items.map((act) => (
                  <div
                    key={act.id}
                    className="p-4 rounded-2xl glass-panel border border-rose-500/30 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-rose-100">{act.activityTitle}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-bold">
                          +{act.points} Pts
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          onDeleteActivity(act.id);
                          setSelectedDayActivities({
                            dateStr: selectedDayActivities.dateStr,
                            items: selectedDayActivities.items.filter((i) => i.id !== act.id)
                          });
                        }}
                        className="p-1.5 rounded-lg text-rose-400 hover:text-rose-200 hover:bg-rose-500/20 transition-colors cursor-pointer"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs text-rose-200/80 flex items-center justify-between">
                      <span>
                        Responsible:{' '}
                        <strong className="text-pink-300">
                          {act.responsiblePartner === 'tauqeer' ? 'Tauqeer 👦' : 'Shanzee 👧'}
                        </strong>
                      </span>
                      <span>
                        Earned By:{' '}
                        <strong className="text-emerald-300">
                          {act.earningPartner === 'tauqeer' ? 'Tauqeer 👦' : 'Shanzee 👧'}
                        </strong>
                      </span>
                    </div>

                    {act.notes && (
                      <p className="text-xs text-rose-300/70 italic bg-rose-950/40 p-2.5 rounded-xl border border-rose-500/10">
                        &quot;{act.notes}&quot;
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-rose-500/20 flex justify-end">
              <button
                onClick={() => setSelectedDayActivities(null)}
                className="px-5 py-2 rounded-full glass-panel border border-rose-500/40 text-rose-200 text-sm font-semibold hover:bg-rose-500/20 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
