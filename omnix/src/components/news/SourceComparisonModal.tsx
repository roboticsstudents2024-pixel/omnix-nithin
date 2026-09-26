import React from 'react';
import { X, ExternalLink, Layers, ShieldCheck, Building2 } from 'lucide-react';
import type { NewsArticle } from '../../types';

interface SourceComparisonModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  isDark: boolean;
}

export const SourceComparisonModal: React.FC<SourceComparisonModalProps> = ({
  article,
  onClose,
  isDark,
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-2xl rounded-2xl shadow-2xl border overflow-hidden flex flex-col max-h-[85vh] ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`p-5 flex items-start justify-between border-b ${
            isDark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-100 bg-slate-50/80'
          }`}
        >
          <div className="space-y-1 pr-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                <Layers className="w-3.5 h-3.5" />
                <span>Multi-Source Coverage Comparison</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {article.multipleSources.length} Independent Outlets
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold font-serif leading-snug pt-1">
              {article.headline}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 rounded-xl transition cursor-pointer shrink-0 ${
              isDark
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Comparison of Independent Outlets */}
        <div className="p-5 overflow-y-auto space-y-4">
          <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            The following verified independent publishers reported on this event. Compare original angles and headlines below:
          </p>

          <div className="space-y-3">
            {/* Primary Source */}
            <div
              className={`p-4 rounded-xl border transition ${
                isDark
                  ? 'bg-slate-950/60 border-slate-800/80'
                  : 'bg-slate-50 border-slate-200/70'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-cyan-500" />
                  <span className="font-bold text-xs">{article.publisher}</span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                    Lead Outlet
                  </span>
                </div>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-500 hover:text-cyan-400 hover:underline"
                >
                  <span>Open Article</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className={`text-sm font-serif font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                {article.headline}
              </p>
            </div>

            {/* Other Independent Sources */}
            {article.multipleSources.map((source, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition ${
                  isDark
                    ? 'bg-slate-950/40 border-slate-800/60 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <Building2 className={`w-3.5 h-3.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                    <span className="font-bold text-xs">{source.publisher}</span>
                  </div>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-500 hover:text-cyan-400 hover:underline"
                  >
                    <span>Open Article</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className={`text-sm font-serif ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {source.title || article.headline}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className={`p-4 border-t flex items-center justify-between text-xs ${
            isDark
              ? 'border-slate-800 bg-slate-900/60 text-slate-400'
              : 'border-slate-100 bg-slate-50 text-slate-500'
          }`}
        >
          <span className="flex items-center gap-1 text-emerald-500">
            <ShieldCheck className="w-4 h-4" />
            <span>Retrieved from live publisher feeds</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-white'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
