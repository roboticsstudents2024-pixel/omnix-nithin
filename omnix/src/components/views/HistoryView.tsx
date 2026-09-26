import React from 'react';
import {
  Clock,
  Search,
  MessageSquare,
  Trash2,
  ArrowRight,
} from 'lucide-react';

export interface HistoryItem {
  id: string;
  type: 'search' | 'conversation' | 'news';
  title: string;
  timestamp: string;
}

interface HistoryViewProps {
  historyItems: HistoryItem[];
  onSelectHistoryItem: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  historyItems,
  onSelectHistoryItem,
  onClearHistory,
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-serif">Session &amp; Search History</h2>
            <p className="text-xs text-zinc-400">
              Chronological ledger of inquiries, web retrievals, and neural conversations
            </p>
          </div>
        </div>

        {historyItems.length > 0 && (
          <button
            type="button"
            onClick={onClearHistory}
            className="px-3.5 py-1.5 bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 rounded-xl text-xs font-semibold transition cursor-pointer self-start sm:self-auto"
          >
            Clear History
          </button>
        )}
      </div>

      {historyItems.length === 0 ? (
        <div className="p-12 text-center bg-zinc-900/40 border border-zinc-800 rounded-3xl max-w-md mx-auto space-y-3">
          <Clock className="w-12 h-12 text-zinc-600 mx-auto" />
          <h3 className="text-white font-bold text-base">No session history yet</h3>
          <p className="text-xs text-zinc-400">
            Searches and conversations with OMNIX will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {historyItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectHistoryItem(item)}
              className="w-full p-4 bg-zinc-900/80 hover:bg-zinc-800/80 border border-zinc-800 rounded-2xl transition flex items-center justify-between text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-xl bg-zinc-800 text-zinc-400 group-hover:text-cyan-400 transition">
                  {item.type === 'search' ? (
                    <Search className="w-4 h-4" />
                  ) : item.type === 'conversation' ? (
                    <MessageSquare className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-zinc-200 group-hover:text-white truncate">
                      {item.title}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      {item.type}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1 shrink-0 ml-3" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
