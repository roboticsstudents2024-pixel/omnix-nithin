import React, { useState } from 'react';
import {
  Filter,
  Layers,
  Calendar,
  Building2,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';

interface NewsFiltersProps {
  availablePublishers: string[];
  selectedPublisher: string;
  onSelectPublisher: (pub: string) => void;
  dateFilter: string;
  onSelectDateFilter: (date: string) => void;
  multiSourceOnly: boolean;
  onToggleMultiSource: (val: boolean) => void;
  articleCount: number;
  onResetFilters: () => void;
  isDark: boolean;
}

export const NewsFilters: React.FC<NewsFiltersProps> = ({
  availablePublishers,
  selectedPublisher,
  onSelectPublisher,
  dateFilter,
  onSelectDateFilter,
  multiSourceOnly,
  onToggleMultiSource,
  articleCount,
  onResetFilters,
  isDark,
}) => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const hasActiveFilters =
    selectedPublisher !== 'all' || dateFilter !== 'all' || multiSourceOnly;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 text-xs">
      {/* Count Indicator */}
      <div className="flex items-center gap-2">
        <span
          className={`font-mono text-xs font-semibold ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          {articleCount} {articleCount === 1 ? 'article' : 'articles'}
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center gap-1 text-[11px] text-cyan-500 hover:text-cyan-400 font-medium underline ml-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Compact Controls Row */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Multi-source toggle */}
        <label
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition ${
            multiSourceOnly
              ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-400'
              : isDark
              ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <input
            type="checkbox"
            checked={multiSourceOnly}
            onChange={(e) => onToggleMultiSource(e.target.checked)}
            className="w-3.5 h-3.5 rounded text-cyan-500 focus:ring-cyan-500 cursor-pointer"
          />
          <Layers className="w-3.5 h-3.5 text-cyan-500" />
          <span>Multi-source only</span>
        </label>

        {/* Date Filter Dropdown */}
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium ${
            isDark
              ? 'bg-slate-900/80 border-slate-800 text-slate-300'
              : 'bg-white border-slate-200 text-slate-700'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={dateFilter}
            onChange={(e) => onSelectDateFilter(e.target.value)}
            className="bg-transparent focus:outline-none cursor-pointer pr-1"
          >
            <option value="all" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
              Any time
            </option>
            <option value="today" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
              Past 24 hours
            </option>
            <option value="week" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
              Past 7 days
            </option>
          </select>
        </div>

        {/* Publisher Dropdown */}
        {availablePublishers.length > 1 && (
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 text-slate-300'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedPublisher}
              onChange={(e) => onSelectPublisher(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer max-w-[140px] truncate"
            >
              <option value="all" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                All Publishers
              </option>
              {availablePublishers.map((pub) => (
                <option
                  key={pub}
                  value={pub}
                  className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}
                >
                  {pub}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};
