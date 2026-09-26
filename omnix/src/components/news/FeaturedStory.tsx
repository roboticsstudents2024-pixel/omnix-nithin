import React from 'react';
import {
  ExternalLink,
  Clock,
  Sparkles,
  Layers,
  ShieldCheck,
  Building2,
  ArrowRight,
} from 'lucide-react';
import type { NewsArticle } from '../../types';

interface FeaturedStoryProps {
  article: NewsArticle | null;
  onOpenComparison: (article: NewsArticle) => void;
  isDark: boolean;
}

export const FeaturedStory: React.FC<FeaturedStoryProps> = ({
  article,
  onOpenComparison,
  isDark,
}) => {
  if (!article) return null;

  const formattedDate = React.useMemo(() => {
    try {
      const date = new Date(article.pubDate);
      if (isNaN(date.getTime())) return article.pubDateRaw || 'Recent';
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return article.pubDateRaw || 'Recent';
    }
  }, [article.pubDate, article.pubDateRaw]);

  const hasMultipleSources = article.multipleSources && article.multipleSources.length > 1;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
          <h3 className="text-xs uppercase font-mono font-bold tracking-widest text-cyan-500">
            Featured Intelligence Lead
          </h3>
        </div>
        <span
          className={`text-xs font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}
        >
          Top Global Story
        </span>
      </div>

      <div
        className={`rounded-3xl border transition-all duration-300 overflow-hidden shadow-xl ${
          isDark
            ? 'bg-slate-900/80 border-slate-800/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]'
            : 'bg-white border-slate-200/90 shadow-[0_10px_35px_-8px_rgba(0,0,0,0.07)]'
        }`}
      >
        <div className={`grid grid-cols-1 ${article.imageUrl ? 'lg:grid-cols-12' : 'lg:grid-cols-1'} gap-6 p-6 sm:p-8`}>
          {/* If genuine image is available */}
          {article.imageUrl && (
            <div className="lg:col-span-5 h-64 lg:h-full min-h-[220px] rounded-2xl overflow-hidden bg-slate-800">
              <img
                src={article.imageUrl}
                alt={article.headline}
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Featured Content Area */}
          <div className={`${article.imageUrl ? 'lg:col-span-7' : 'max-w-4xl'} flex flex-col justify-between space-y-4`}>
            <div className="space-y-3">
              {/* Publisher & Time */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold uppercase tracking-wider text-cyan-500 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                    {article.publisher}
                  </span>
                  {article.isVerified && (
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                        isDark
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      <span>Verified Source</span>
                    </span>
                  )}
                </div>

                <div
                  className={`flex items-center gap-1 text-xs font-mono ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{formattedDate}</span>
                </div>
              </div>

              {/* Headline */}
              <h2
                className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif leading-tight tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-500 transition-colors"
                >
                  {article.headline}
                </a>
              </h2>

              {/* AI Generated Summary */}
              <div
                className={`p-4 rounded-2xl border text-sm leading-relaxed ${
                  isDark
                    ? 'bg-slate-950/60 border-slate-800/80 text-slate-300'
                    : 'bg-slate-50 border-slate-200/70 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-500 mb-1.5 uppercase font-mono tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Briefing Synthesis</span>
                </div>
                <p>{article.aiSummary || article.snippet}</p>
              </div>

              {/* Multiple Source Indicator */}
              {hasMultipleSources && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => onOpenComparison(article)}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                      isDark
                        ? 'bg-slate-800/90 hover:bg-slate-800 text-cyan-300 border border-slate-700'
                        : 'bg-slate-100 hover:bg-slate-200 text-cyan-800 border border-slate-200'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Cross-checked across {article.multipleSources.length} independent publishers</span>
                    <span className="text-[11px] underline">Compare angles →</span>
                  </button>
                </div>
              )}
            </div>

            {/* Read Story Action */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-800/50">
              <span
                className={`text-xs font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}
              >
                Authentic Source Link Preserved
              </span>

              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 flex items-center gap-2 group cursor-pointer"
              >
                <span>Read Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
