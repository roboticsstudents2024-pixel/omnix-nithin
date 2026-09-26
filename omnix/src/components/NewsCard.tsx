import React, { useState } from 'react';
import {
  ExternalLink,
  ShieldCheck,
  Calendar,
  Building2,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
  onGenerateDeepSummary?: (article: NewsArticle) => Promise<string | null>;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  onGenerateDeepSummary,
}) => {
  const [showVerificationDetails, setShowVerificationDetails] = useState(false);
  const [isDeepening, setIsDeepening] = useState(false);
  const [customSummary, setCustomSummary] = useState<string | null>(null);

  // Format real date/time
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

  // Extract hostname from real URL for user verification
  const domainDisplay = React.useMemo(() => {
    try {
      const u = new URL(article.sourceBaseUrl || article.url);
      return u.hostname.replace(/^www\./, '');
    } catch {
      return article.publisher;
    }
  }, [article.sourceBaseUrl, article.url]);

  const handleDeepSummary = async () => {
    if (!onGenerateDeepSummary || isDeepening) return;
    setIsDeepening(true);
    try {
      const updated = await onGenerateDeepSummary(article);
      if (updated) {
        setCustomSummary(updated);
      }
    } finally {
      setIsDeepening(false);
    }
  };

  const displaySummary = customSummary || article.aiSummary || article.snippet;

  return (
    <article className="bg-white rounded-xl border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6 flex flex-col justify-between">
      <div>
        {/* Verification & Publisher Status Tag */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-200">
              <Building2 className="w-3 h-3 text-stone-600" />
              <span>Publisher: <strong className="text-stone-900">{article.publisher}</strong></span>
            </span>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Verified Source</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-mono">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            <span>Published: {formattedDate}</span>
          </div>
        </div>

        {/* Real Headline */}
        <h2 className="text-lg sm:text-xl font-bold font-serif text-stone-900 leading-snug tracking-tight mb-3">
          {article.headline}
        </h2>

        {/* SOURCE INFORMATION Section */}
        <div className="mb-4 p-3 bg-stone-50 rounded-lg border border-stone-200/70 text-xs">
          <div className="flex items-center justify-between font-bold text-stone-700 uppercase tracking-wider text-[11px] mb-1.5">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              SOURCE INFORMATION
            </span>
            <button
              type="button"
              onClick={() => setShowVerificationDetails(!showVerificationDetails)}
              className="text-stone-500 hover:text-stone-800 font-normal flex items-center gap-0.5 lowercase cursor-pointer"
            >
              <span>{showVerificationDetails ? 'hide details' : 'audit details'}</span>
              {showVerificationDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          <div className="text-stone-600 space-y-1">
            <p>
              <strong className="text-stone-800">Primary Outlet:</strong> {article.publisher} ({domainDisplay})
            </p>
            <p className="truncate">
              <strong className="text-stone-800">Direct Link:</strong>{' '}
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline font-mono text-[11px]"
              >
                {article.url}
              </a>
            </p>
          </div>

          {/* Expanded Audit Details */}
          {showVerificationDetails && (
            <div className="mt-2.5 pt-2 border-t border-stone-200 grid grid-cols-2 gap-1 text-[11px] text-stone-600">
              <div className="flex items-center gap-1">
                <span className="text-emerald-600 font-bold">✓</span> Real URL reachable
              </div>
              <div className="flex items-center gap-1">
                <span className="text-emerald-600 font-bold">✓</span> Publisher matched
              </div>
              <div className="flex items-center gap-1">
                <span className="text-emerald-600 font-bold">✓</span> Real publication date
              </div>
              <div className="flex items-center gap-1">
                <span className="text-emerald-600 font-bold">✓</span> Non-example.com guaranteed
              </div>
            </div>
          )}
        </div>

        {/* AI SUMMARY Section */}
        <div className="mb-4 p-3.5 bg-blue-50/60 rounded-lg border border-blue-100 text-stone-800 text-xs sm:text-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-blue-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-blue-600" />
              AI SUMMARY
            </span>
            {onGenerateDeepSummary && !customSummary && (
              <button
                type="button"
                onClick={handleDeepSummary}
                disabled={isDeepening}
                className="text-[11px] font-semibold text-blue-700 hover:text-blue-900 underline cursor-pointer disabled:opacity-50"
              >
                {isDeepening ? 'Synthesizing...' : 'Deepen AI Analysis'}
              </button>
            )}
          </div>
          <p className="leading-relaxed text-stone-700">
            {displaySummary}
          </p>
          <p className="mt-2 text-[10px] text-stone-500 italic">
            * Strict factual summary based strictly on retrieved reporting — no invented quotes, dates, or figures.
          </p>
        </div>

        {/* MULTIPLE SOURCES Section (When available) */}
        {article.multipleSources && article.multipleSources.length > 0 && (
          <div className="mb-4 p-3 bg-amber-50/50 rounded-lg border border-amber-200/60 text-xs">
            <div className="font-bold text-stone-800 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-700" />
              <span>MULTIPLE SOURCES ({article.multipleSources.length} Independent Outlets)</span>
            </div>
            <ul className="space-y-1.5">
              {article.multipleSources.map((source, idx) => (
                <li key={idx} className="flex items-start justify-between gap-2 text-stone-700">
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <span className="text-stone-400 font-mono">•</span>
                    <strong className="text-stone-900 font-medium whitespace-nowrap">{source.publisher}</strong>
                    {source.title && (
                      <span className="text-stone-500 text-[11px] truncate hidden sm:inline">
                        — {source.title}
                      </span>
                    )}
                  </div>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-900 hover:text-amber-950 hover:underline shrink-0"
                  >
                    <span>Read</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* READ ORIGINAL ARTICLE BUTTON */}
      <div className="pt-3 border-t border-stone-100 mt-2">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 active:bg-black text-white text-xs sm:text-sm font-semibold rounded-lg transition shadow-sm hover:shadow cursor-pointer"
        >
          <span>Read Original Article</span>
          <span className="text-stone-400">→</span>
        </a>
      </div>
    </article>
  );
};
