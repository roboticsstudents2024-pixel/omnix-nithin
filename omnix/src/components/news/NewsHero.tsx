import React, { useState } from 'react';
import {
  Search,
  Mic,
  MicOff,
  Sparkles,
  TrendingUp,
  X,
  Radio,
} from 'lucide-react';

interface NewsHeroProps {
  onSearch: (query: string) => void;
  currentQuery: string;
  onSelectTopic: (topic: string) => void;
  isLoading: boolean;
  isDark: boolean;
  onVoiceSearch?: () => void;
}

// Compact trending topic chips based on real available topics
const REAL_TRENDING_CHIPS = [
  'Apple',
  'Semiconductors',
  'India',
  'Nuclear Energy',
  'Global Markets',
  'tomato prices',
  'Space NASA',
];

export const NewsHero: React.FC<NewsHeroProps> = ({
  onSearch,
  currentQuery,
  onSelectTopic,
  isLoading,
  isDark,
  onVoiceSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState(currentQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="py-8 sm:py-12 max-w-4xl mx-auto text-center space-y-6">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
        <Sparkles className="w-3.5 h-3.5" />
        <span>THE WORLD, IN CONTEXT</span>
      </div>

      {/* Main Headline & Subtitle */}
      <div className="space-y-3">
        <h1
          className={`text-3xl sm:text-5xl md:text-6xl font-extrabold font-serif tracking-tight leading-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Today's Intelligence
        </h1>
        <p
          className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          Explore the latest developments from trusted sources around the world.
        </p>
      </div>

      {/* Large Search Bar */}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto pt-2">
        <div
          className={`relative flex items-center rounded-2xl p-1.5 transition-all shadow-lg ${
            isDark
              ? 'bg-slate-900/90 border border-slate-700/80 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20 shadow-black/40'
              : 'bg-white border border-slate-200 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 shadow-slate-200/50'
          }`}
        >
          <div className="pl-3.5 pr-2 text-slate-400 pointer-events-none">
            <Search className="w-5 h-5 text-cyan-500" />
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search news, companies, technology, people..."
            className={`w-full py-2.5 sm:py-3 text-sm sm:text-base bg-transparent focus:outline-none placeholder:text-slate-400 font-sans ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          />

          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 text-slate-400 hover:text-slate-200 cursor-pointer mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Microphone Button if voice is enabled */}
          {onVoiceSearch && (
            <button
              type="button"
              onClick={onVoiceSearch}
              className={`p-2.5 rounded-xl transition cursor-pointer mr-1 ${
                isDark
                  ? 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800'
                  : 'text-slate-600 hover:text-cyan-600 hover:bg-slate-100'
              }`}
              title="Voice Search"
            >
              <Mic className="w-4 h-4" />
            </button>
          )}

          {/* Search Button */}
          <button
            type="submit"
            disabled={isLoading || !searchTerm.trim()}
            className="px-5 sm:px-6 py-2.5 sm:py-3 bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md cursor-pointer disabled:opacity-40"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Compact Trending Topic Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
        <span
          className={`font-mono text-[11px] uppercase tracking-wider flex items-center gap-1 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-cyan-500" />
          <span>Trending:</span>
        </span>
        {REAL_TRENDING_CHIPS.map((topic) => {
          const isSelected = currentQuery.toLowerCase() === topic.toLowerCase();
          return (
            <button
              key={topic}
              type="button"
              onClick={() => {
                setSearchTerm(topic);
                onSelectTopic(topic);
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                isSelected
                  ? 'bg-cyan-500 text-slate-950 shadow-sm font-semibold'
                  : isDark
                  ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {topic}
            </button>
          );
        })}
      </div>
    </div>
  );
};
