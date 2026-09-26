import React, { useState } from 'react';
import {
  Bookmark,
  ExternalLink,
  Trash2,
  Download,
  Share2,
  FileText,
  Check,
} from 'lucide-react';
import type { NewsArticle } from '../../types';

interface SavedViewProps {
  savedArticles: NewsArticle[];
  onRemoveSaved: (id: string) => void;
  onClearAll: () => void;
}

export const SavedView: React.FC<SavedViewProps> = ({
  savedArticles,
  onRemoveSaved,
  onClearAll,
}) => {
  const [exported, setExported] = useState(false);

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedArticles, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `omnix-saved-research-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-serif">Saved Research &amp; Bookmarks</h2>
            <p className="text-xs text-zinc-400">
              Personalized repository of verified articles, intelligence briefings, and data points
            </p>
          </div>
        </div>

        {savedArticles.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportJSON}
              className="px-3.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
            >
              {exported ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
              <span>{exported ? 'Exported' : 'Export JSON'}</span>
            </button>
            <button
              type="button"
              onClick={onClearAll}
              className="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {savedArticles.length === 0 ? (
        <div className="p-12 text-center bg-zinc-900/40 border border-zinc-800 rounded-3xl max-w-md mx-auto space-y-3">
          <Bookmark className="w-12 h-12 text-zinc-600 mx-auto" />
          <h3 className="text-white font-bold text-base">No saved research items yet</h3>
          <p className="text-xs text-zinc-400">
            Click the bookmark icon on any verified news card or intelligence item to store it here for later reference.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {savedArticles.map((article) => (
            <div
              key={article.id}
              className="p-5 bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 rounded-2xl transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                  <span className="font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    {article.publisher}
                  </span>
                  <span>•</span>
                  <span>{new Date(article.pubDate).toLocaleDateString()}</span>
                </div>
                <h4 className="font-bold text-white text-base font-serif leading-snug truncate">
                  {article.headline}
                </h4>
                <p className="text-xs text-zinc-400 line-clamp-2">
                  {article.aiSummary || article.snippet}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => onRemoveSaved(article.id)}
                  className="p-2 text-zinc-500 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition cursor-pointer"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
