'use client';

import React from 'react';

// Zero-Dependency Bar Chart Component
export function BarChart({
  data
}: {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
    }>;
  };
}) {
  const maxVal = Math.max(
    ...data.datasets.flatMap((d) => d.data),
    150
  );

  return (
    <div className="w-full h-full flex flex-col justify-between pt-4 pb-2">
      {/* Legend */}
      <div className="flex items-center justify-end gap-4 text-xs font-semibold mb-4">
        {data.datasets.map((ds) => (
          <div key={ds.label} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full shadow-sm"
              style={{ backgroundColor: ds.borderColor }}
            />
            <span className="text-rose-100">{ds.label}</span>
          </div>
        ))}
      </div>

      {/* Bars Grid */}
      <div className="flex-1 flex items-end justify-between gap-3 px-2 border-b border-rose-500/20 pb-2">
        {data.labels.map((label, idx) => (
          <div key={label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
            <div className="w-full flex items-end justify-center gap-1.5 h-full">
              {data.datasets.map((ds) => {
                const heightPercent = Math.min(Math.round((ds.data[idx] / maxVal) * 100), 100);
                return (
                  <div
                    key={ds.label}
                    className="w-full max-w-[20px] rounded-t-lg transition-all duration-700 relative group-hover:brightness-125"
                    style={{
                      height: `${heightPercent}%`,
                      backgroundColor: ds.backgroundColor,
                      border: `1px solid ${ds.borderColor}`
                    }}
                  >
                    {/* Hover Value Badge */}
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:flex px-2 py-0.5 rounded-md bg-slate-900 text-[10px] font-bold text-white border border-rose-500/40 z-20 whitespace-nowrap">
                      {ds.data[idx]} Pts
                    </div>
                  </div>
                );
              })}
            </div>
            <span className="text-[11px] font-medium text-pink-300/80">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Zero-Dependency Doughnut Chart Component
export function DoughnutChart({
  data
}: {
  data: {
    labels: string[];
    datasets: Array<{
      data: number[];
      backgroundColor: string[];
      borderColor?: string;
    }>;
  };
}) {
  const total = data.datasets[0].data.reduce((a, b) => a + b, 0) || 1;
  const colors = data.datasets[0].backgroundColor;

  return (
    <div className="w-full h-full flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
      {/* Visual SVG Ring */}
      <div className="relative w-40 h-40 shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {(() => {
            let cumulativePercent = 0;
            return data.datasets[0].data.map((val, idx) => {
              const percent = val / total;
              const strokeDasharray = `${percent * 283} 283`;
              const strokeDashoffset = -cumulativePercent * 283;
              cumulativePercent += percent;
              return (
                <circle
                  key={idx}
                  cx="50"
                  cy="50"
                  r="45"
                  fill="transparent"
                  stroke={colors[idx % colors.length]}
                  strokeWidth="10"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-700 hover:opacity-80 cursor-pointer"
                />
              );
            });
          })()}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-rose-100">{total}</span>
          <span className="text-[10px] uppercase tracking-wider text-pink-300/80">Activities</span>
        </div>
      </div>

      {/* Legend List */}
      <div className="flex flex-col gap-2 max-w-xs">
        {data.labels.map((label, idx) => {
          const val = data.datasets[0].data[idx];
          const pct = Math.round((val / total) * 100);
          return (
            <div key={label} className="flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: colors[idx % colors.length] }}
                />
                <span className="text-rose-100 font-medium truncate">{label}</span>
              </div>
              <span className="text-pink-300 font-bold">{pct}% ({val})</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Zero-Dependency Line Graph Component
export function LineChart({
  data
}: {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }>;
  };
}) {
  const points = data.datasets[0].data;
  const labels = data.labels;
  const minVal = 70;
  const maxVal = 100;

  const svgWidth = 500;
  const svgHeight = 180;
  const padding = 25;

  const getX = (index: number) =>
    padding + (index / (labels.length - 1)) * (svgWidth - padding * 2);

  const getY = (value: number) =>
    svgHeight - padding - ((value - minVal) / (maxVal - minVal)) * (svgHeight - padding * 2);

  const pathPoints = points.map((pt, i) => `${getX(i)},${getY(pt)}`).join(' L ');
  const areaPoints = `M ${getX(0)},${svgHeight - padding} L ${pathPoints} L ${getX(points.length - 1)},${svgHeight - padding} Z`;

  return (
    <div className="w-full h-full flex flex-col justify-between pt-2">
      {/* Legend */}
      <div className="flex items-center justify-end gap-2 text-xs font-semibold mb-2">
        <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm" />
        <span className="text-rose-100">{data.datasets[0].label}</span>
      </div>

      {/* SVG Graph */}
      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
          {/* Grid Lines */}
          <line x1={padding} y1={getY(80)} x2={svgWidth - padding} y2={getY(80)} stroke="rgba(244,114,182,0.15)" strokeDasharray="4" />
          <line x1={padding} y1={getY(90)} x2={svgWidth - padding} y2={getY(90)} stroke="rgba(244,114,182,0.15)" strokeDasharray="4" />

          {/* Area Fill */}
          <path d={areaPoints} fill="rgba(244, 63, 94, 0.15)" />

          {/* Line Path */}
          <path d={`M ${pathPoints}`} fill="none" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />

          {/* Points */}
          {points.map((pt, i) => (
            <g key={i} className="group cursor-pointer">
              <circle
                cx={getX(i)}
                cy={getY(pt)}
                r="6"
                fill="#fb7185"
                stroke="#fff"
                strokeWidth="2"
                className="transition-transform group-hover:scale-150"
              />
              <text
                x={getX(i)}
                y={getY(pt) - 12}
                fill="#fce7f3"
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
              >
                {pt}%
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Labels Axis */}
      <div className="flex items-center justify-between px-4 mt-2 text-xs font-semibold text-pink-300/80">
        {labels.map((lbl) => (
          <span key={lbl}>{lbl}</span>
        ))}
      </div>
    </div>
  );
}
