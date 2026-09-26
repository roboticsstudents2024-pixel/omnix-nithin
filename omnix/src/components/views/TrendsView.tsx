import React from 'react';
import {
  TrendingUp,
  Flame,
  ArrowUpRight,
  Sparkles,
  Search,
  ExternalLink,
} from 'lucide-react';

interface TrendItem {
  id: string;
  topic: string;
  surge: string;
  category: string;
  volume: string;
  summary: string;
}

const TRENDING_TOPICS: TrendItem[] = [
  {
    id: '1',
    topic: 'Next-Gen High-Bandwidth Memory (HBM4)',
    surge: '+420%',
    category: 'Hardware & Silicon',
    volume: '240K searches/hr',
    summary: 'Massive surge in memory bandwidth demand driven by multi-trillion parameter model training clusters.',
  },
  {
    id: '2',
    topic: 'Autonomous AI Coding Agents',
    surge: '+310%',
    category: 'Software Engineering',
    volume: '510K searches/hr',
    summary: 'Developer adoption of multi-file reasoning, automated testing, and execution-first agents expands.',
  },
  {
    id: '3',
    topic: 'Global Nuclear Energy Resurgence for AI Data Centers',
    surge: '+280%',
    category: 'Clean Energy & Infrastructure',
    volume: '190K searches/hr',
    summary: 'Hyperscalers strike direct power purchase agreements with small modular reactor (SMR) developers.',
  },
  {
    id: '4',
    topic: 'Agricultural Price Volatility & Tomato Index',
    surge: '+185%',
    category: 'Commodities & Supply Chains',
    volume: '140K searches/hr',
    summary: 'Seasonal logistics shifts and wholesale contract adjustments tracked across regional agricultural hubs.',
  },
  {
    id: '5',
    topic: 'India Tech Manufacturing & Semiconductor Fab Groundbreakings',
    surge: '+240%',
    category: 'Geopolitics & Industrial Policy',
    volume: '330K searches/hr',
    summary: 'Subsidies and joint ventures accelerate commercial silicon wafer fabs in Gujarat and Assam.',
  },
];

interface TrendsViewProps {
  onSearchTrend: (topic: string) => void;
}

export const TrendsView: React.FC<TrendsViewProps> = ({ onSearchTrend }) => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-serif">Global Real-time Trends</h2>
            <p className="text-xs text-zinc-400">
              High-velocity search signals, breakout technologies &amp; shifting geopolitical momentum
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-950/60 px-3 py-1.5 rounded-xl border border-amber-800/60">
          <Flame className="w-3.5 h-3.5 animate-pulse" />
          <span>Velocity Algorithms Active</span>
        </div>
      </div>

      {/* Trends List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TRENDING_TOPICS.map((item, index) => (
          <div
            key={item.id}
            className="p-5 bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 rounded-2xl transition space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-mono text-zinc-400 text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800">
                  {item.category}
                </span>
                <span className="flex items-center gap-1 font-mono font-bold text-amber-400 text-xs bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  {item.surge}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-mono text-zinc-600 text-sm font-bold">#{index + 1}</span>
                <h3 className="font-bold text-white text-base font-serif">{item.topic}</h3>
              </div>

              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
              <span className="text-zinc-500 font-mono text-[11px]">{item.volume}</span>
              <button
                type="button"
                onClick={() => onSearchTrend(item.topic)}
                className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Audit Topic News</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
