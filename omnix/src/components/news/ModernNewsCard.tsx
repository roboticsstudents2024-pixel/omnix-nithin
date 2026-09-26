import React from 'react';
import {
  ExternalLink,
  Layers,
  Clock,
  Sparkles,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import type { NewsArticle } from '../../types';

interface ModernNewsCardProps {
  article: NewsArticle;
  onOpenComparison: (article: NewsArticle) => void;
  isDark: boolean;
}

export const ModernNewsCard: React.FC<ModernNewsCardProps> = ({
  article,
  onOpenComparison,
  isDark,
}) => {
  // Format real date/time
  const formattedTime = React.useMemo(() => {
    try {
      const date = new Date(article.pubDate);
      if (isNaN(date.getTime())) return article.pubDateRaw || 'Recent';

      const now = Date.now();
      const diffHrs = Math.round((now - date.getTime()) / (1000 * 60 * 60));

      if (diffHrs >= 0 && diffHrs < 1) return 'Just now';
      if (diffHrs === 1) return '1 hour ago';
      if (diffHrs > 1 && diffHrs < 24) return `${diffHrs} hours ago`;

      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return article.pubDateRaw || 'Recent';
    }
  }, [article.pubDate, article.pubDateRaw]);

  const hasMultipleSources = article.multipleSources && article.multipleSources.length > 1;

  return (
    <article
      className={`group rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between border ${
        isDark
          ? 'bg-slate-900/60 hover:bg-slate-900/90 border-slate-800/70 hover:border-slate-700/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_-4px_rgba(6,182,212,0.15)]'
          : 'bg-white hover:bg-slate-50/70 border-slate-200/80 hover:border-slate-300 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.08)]'
      }`}
    >
      <div className="space-y-3.5">
        {/* Genuine Image only when available */}
        {article.imageUrl && (
          <div className="w-full h-44 rounded-xl overflow-hidden mb-3 bg-slate-800">
            <img
              src={article.imageUrl}
              alt={article.headline}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              onError={(e) => {
                // If genuine image fails to load, gracefully hide without inserting fake placeholder
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Publisher & Metadata Row */}
        <div className="flex items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs uppercase tracking-wider font-mono text-cyan-500">
              {article.publisher}
            </span>

            {/* Verified badge only when source verification supports it */}
            {article.isVerified && (
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                  isDark
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>Verified</span>
              </span>
            )}
          </div>

          <div
            className={`flex items-center gap-1 font-mono text-[11px] ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{formattedTime}</span>
          </div>
        </div>

        {/* Real Headline */}
        <h3
          className={`text-lg sm:text-xl font-bold font-serif leading-snug group-hover:text-cyan-500 transition-colors ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}
        >
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline decoration-cyan-500/40 underline-offset-4"
          >
            {article.headline}
          </a>
        </h3>

        {/* Short AI Summary */}
        <p
          className={`text-xs sm:text-sm leading-relaxed line-clamp-3 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {article.aiSummary || article.snippet}
        </p>

        {/* Multi-Source Coverage Indicator */}
        {hasMultipleSources && (
          <div className="pt-1">
            <button
              type="button"
              onClick={() => onOpenComparison(article)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                isDark
                  ? 'bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-800/50'
                  : 'bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-cyan-500" />
              <span>{article.multipleSources.length} sources covering this story</span>
              <span className="text-[10px] opacity-70">· Compare →</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer / Read Story Link */}
      <div
        className={`pt-4 mt-4 border-t flex items-center justify-between text-xs ${
          isDark ? 'border-slate-800/80' : 'border-slate-100'
        }`}
      >
        <span
          className={`truncate max-w-[55%] font-mono text-[11px] ${
            isDark ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          Source: {article.publisher}
        </span>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-cyan-500 hover:text-cyan-400 transition group/link"
        >
          <span>Read Story</span>
          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
};
