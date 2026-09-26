import React, { useState } from 'react';
import {
  Globe,
  Search,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import type { NewsArticle } from '../../types';

interface LiveWebViewProps {
  onSearch: (query: string) => Promise<void>;
  searchResults: NewsArticle[];
  isLoading: boolean;
  lastUpdated: string | null;
  activeQuery: string;
}

export const LiveWebView: React.FC<LiveWebViewProps> = ({
  onSearch,
  searchResults,
  isLoading,
  lastUpdated,
  activeQuery,
}) => {
  const [queryInput, setQueryInput] = useState(activeQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (queryInput.trim()) {
      onSearch(queryInput.trim());
    }
  };

  const QUICK_SEARCHES = [
    'Apple AI developments',
    'NVIDIA GPU architecture',
    'India economy reforms',
    'tomato prices wholesale index',
    'James Webb telescope spectroscopy',
    'Global clean energy transition',
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Search Header Banner */}
      <div className="p-6 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Globe className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-serif tracking-tight">
                Live Web Intelligence Engine
              </h2>
              <p className="text-xs text-zinc-400">
                Grounded real-time web retrieval with source verification &amp; instant synthesis
              </p>
            </div>
          </div>

          {lastUpdated && (
            <div className="text-xs text-zinc-400 font-mono flex items-center gap-1.5 self-start md:self-auto bg-zinc-800/80 px-3 py-1.5 rounded-lg border border-zinc-700/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Web Synced: {new Date(lastUpdated).toLocaleTimeString()}</span>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Search live web across all indexed domains (e.g. Apple, India, tomato prices)..."
              className="w-full pl-10 pr-4 py-3 bg-zinc-950/80 border border-zinc-800 focus:border-cyan-500 rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none transition"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !queryInput.trim()}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-xl text-xs sm:text-sm transition disabled:opacity-50 flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
          >
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>Retrieve</span>
          </button>
        </form>

        {/* Quick Topics */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider">
            Verified Prompts:
          </span>
          {QUICK_SEARCHES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setQueryInput(item);
                onSearch(item);
              }}
              className="px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/60 text-xs transition cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Results Container */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
          <span className="font-semibold text-zinc-200">
            {activeQuery ? `Retrieved results for "${activeQuery}"` : 'Active Live Web Stream'}
          </span>
          <span className="font-mono">{searchResults.length} verified web sources</span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-2xl animate-pulse space-y-3">
                <div className="h-4 bg-zinc-800 rounded w-1/4"></div>
                <div className="h-6 bg-zinc-800 rounded w-3/4"></div>
                <div className="h-16 bg-zinc-800/50 rounded"></div>
              </div>
            ))}
          </div>
        ) : searchResults.length === 0 ? (
          <div className="p-12 text-center bg-zinc-900/40 border border-zinc-800 rounded-3xl max-w-lg mx-auto space-y-4">
            <Globe className="w-12 h-12 text-zinc-600 mx-auto" />
            <h3 className="text-white font-bold text-base">Enter a query to retrieve live web data</h3>
            <p className="text-xs text-zinc-400">
              OMNIX searches authoritative real-world feeds, documents, and news sources with zero hallucinated URLs.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchResults.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl transition flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span className="font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {item.publisher}
                    </span>
                    <span className="text-emerald-400 flex items-center gap-1 font-mono">
                      <ShieldCheck className="w-3 h-3" />
                      Verified Source
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-sm sm:text-base font-serif leading-snug">
                    {item.headline}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {item.aiSummary || item.snippet}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500 font-mono">
                    {new Date(item.pubDate).toLocaleDateString()}
                  </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:underline"
                  >
                    <span>Visit Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
