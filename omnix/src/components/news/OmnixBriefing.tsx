import React, { useEffect, useState } from 'react';
import { Sparkles, ExternalLink, RefreshCw, Radio } from 'lucide-react';
import type { NewsArticle } from '../../types';

interface OmnixBriefingProps {
  articles: NewsArticle[];
  isDark: boolean;
}

export const OmnixBriefing: React.FC<OmnixBriefingProps> = ({
  articles,
  isDark,
}) => {
  const [briefingBullets, setBriefingBullets] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!articles || articles.length === 0) return;

    let isMounted = true;
    setIsLoading(true);

    // Call server briefing endpoint or generate clean synthesis
    fetch('/api/briefing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articles: articles.slice(0, 5) }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.bullets)) {
          setBriefingBullets(data.bullets);
        } else if (isMounted) {
          // Fallback to top article summaries
          setBriefingBullets(
            articles.slice(0, 3).map((a) => `${a.headline}. (Source: ${a.publisher})`)
          );
        }
      })
      .catch(() => {
        if (isMounted) {
          setBriefingBullets(
            articles.slice(0, 3).map((a) => `${a.headline}. (Source: ${a.publisher})`)
          );
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [articles]);

  if (articles.length === 0) return null;

  return (
    <section className="mb-10">
      <div
        className={`rounded-3xl p-6 sm:p-7 border relative overflow-hidden transition-all shadow-md ${
          isDark
            ? 'bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-950 border-cyan-500/20'
            : 'bg-gradient-to-r from-cyan-50/50 via-white to-slate-50 border-cyan-200/60'
        }`}
      >
        {/* Subtle accent blur */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>

        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-cyan-500/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-500 border border-cyan-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  className={`text-base sm:text-lg font-bold font-serif ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  OMNIX Briefing
                </h3>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 font-semibold">
                  Concise Intelligence
                </span>
              </div>
              <p
                className={`text-xs ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Executive synthesis of top global developments grounded strictly in retrieved reporting.
              </p>
            </div>
          </div>

          <div
            className={`hidden sm:flex items-center gap-1.5 text-xs font-mono ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            <Radio className="w-3 h-3 text-cyan-500 animate-pulse" />
            <span>Neutral Feed Active</span>
          </div>
        </div>

        {/* Briefing Content Bullets */}
        {isLoading && briefingBullets.length === 0 ? (
          <div className="space-y-3 py-2 animate-pulse">
            <div className="h-4 bg-cyan-500/10 rounded w-3/4"></div>
            <div className="h-4 bg-cyan-500/10 rounded w-5/6"></div>
            <div className="h-4 bg-cyan-500/10 rounded w-2/3"></div>
          </div>
        ) : (
          <ul className="space-y-3 text-xs sm:text-sm">
            {briefingBullets.map((bullet, idx) => {
              // Parse out "(Source: ...)" if present to style cleanly
              const match = bullet.match(/^(.*?)\s*\(Source:\s*([^\)]+)\)$/i);
              const textContent = match ? match[1] : bullet;
              const sourceName = match ? match[2] : null;

              // Find matching article URL if available
              const matchedArticle = articles.find(
                (a) =>
                  a.publisher.toLowerCase().includes(sourceName?.toLowerCase() || '') ||
                  a.headline.toLowerCase().includes(textContent.slice(0, 25).toLowerCase())
              );

              return (
                <li
                  key={idx}
                  className={`flex items-start gap-2.5 leading-relaxed ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  <span className="text-cyan-500 font-bold shrink-0 mt-0.5">•</span>
                  <div className="flex-1">
                    <span>{textContent}</span>
                    {sourceName && (
                      <span className="ml-1.5 inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-cyan-500">
                        {matchedArticle ? (
                          <a
                            href={matchedArticle.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline inline-flex items-center gap-0.5 text-cyan-500 hover:text-cyan-400"
                          >
                            <span>[{sourceName}]</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ) : (
                          <span>[{sourceName}]</span>
                        )}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};
