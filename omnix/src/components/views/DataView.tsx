import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
} from 'lucide-react';

interface MetricItem {
  id: string;
  name: string;
  symbol: string;
  value: string;
  change: string;
  isPositive: boolean;
  category: 'Equities' | 'Commodities' | 'Yields' | 'Agriculture';
  detail: string;
}

const LIVE_DATA_METRICS: MetricItem[] = [
  {
    id: 'sp500',
    name: 'S&P 500 Index',
    symbol: 'SPX',
    value: '5,864.20',
    change: '+0.42%',
    isPositive: true,
    category: 'Equities',
    detail: 'Broad market benchmark tracking top 500 US publicly traded corporations.',
  },
  {
    id: 'nasdaq',
    name: 'Nasdaq Composite',
    symbol: 'IXIC',
    value: '18,485.10',
    change: '+0.88%',
    isPositive: true,
    category: 'Equities',
    detail: 'Tech-weighted index led by semiconductor, software and cloud infrastructure.',
  },
  {
    id: 'us10y',
    name: 'US 10-Year Treasury Yield',
    symbol: 'US10Y',
    value: '4.08%',
    change: '-0.04%',
    isPositive: false,
    category: 'Yields',
    detail: 'Benchmark global risk-free rate reflecting monetary policy expectations.',
  },
  {
    id: 'crude',
    name: 'WTI Crude Oil',
    symbol: 'CL',
    value: '$71.40 / bbl',
    change: '-1.12%',
    isPositive: false,
    category: 'Commodities',
    detail: 'Global energy benchmark driven by supply dynamics and refining capacity.',
  },
  {
    id: 'gold',
    name: 'Gold Spot',
    symbol: 'XAU/USD',
    value: '$2,682.50 / oz',
    change: '+0.65%',
    isPositive: true,
    category: 'Commodities',
    detail: 'Store of value tracking macroeconomic inflation and central bank reserve allocations.',
  },
  {
    id: 'tomato_prices',
    name: 'Tomato Wholesale Index (US/Global)',
    symbol: 'AGRI-TOMATO',
    value: '$1.48 / lb (avg wholesale)',
    change: '-3.20%',
    isPositive: false,
    category: 'Agriculture',
    detail: 'Seasonal field and greenhouse production trends, freight rates, and market supply data.',
  },
  {
    id: 'wheat',
    name: 'Chicago Wheat Futures',
    symbol: 'ZW',
    value: '$5.78 / bu',
    change: '+0.25%',
    isPositive: true,
    category: 'Agriculture',
    detail: 'Global staple grain contract reflecting seasonal weather yields and logistics.',
  },
  {
    id: 'btc',
    name: 'Bitcoin Reference Rate',
    symbol: 'BTC/USD',
    value: '$65,420.00',
    change: '+2.15%',
    isPositive: true,
    category: 'Equities',
    detail: 'Decentralized digital liquidity index reflecting spot and ETF net flows.',
  },
];

interface DataViewProps {
  onSearchTopic?: (topic: string) => void;
}

export const DataView: React.FC<DataViewProps> = ({ onSearchTopic }) => {
  const [filter, setFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = LIVE_DATA_METRICS.filter((item) => {
    const matchesCat = filter === 'All' || item.category === filter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.detail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white font-serif">Live Data Tools &amp; Market Feeds</h2>
          </div>
          <p className="text-xs text-zinc-400">
            Real-time macroeconomic benchmarks, commodity indices, and market intelligence
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Real-time Feeds Synchronized</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'Equities', 'Commodities', 'Agriculture', 'Yields'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                filter === cat
                  ? 'bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/20'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter data or ticker..."
            className="w-full pl-9 pr-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((metric) => (
          <div
            key={metric.id}
            className="p-5 bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 rounded-2xl transition space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-mono text-zinc-400 uppercase tracking-wider text-[11px]">
                  {metric.symbol}
                </span>
                <span
                  className={`flex items-center gap-0.5 px-2 py-0.5 rounded font-mono font-semibold text-[11px] ${
                    metric.isPositive
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                      : 'bg-rose-950/60 text-rose-400 border border-rose-800/60'
                  }`}
                >
                  {metric.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {metric.change}
                </span>
              </div>

              <h3 className="font-bold text-white text-base font-serif mb-1">{metric.name}</h3>

              <div className="text-xl font-bold font-mono text-cyan-300 tracking-tight">
                {metric.value}
              </div>

              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {metric.detail}
              </p>
            </div>

            {onSearchTopic && (
              <button
                type="button"
                onClick={() => onSearchTopic(metric.name)}
                className="pt-3 border-t border-zinc-800/80 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center justify-between w-full cursor-pointer"
              >
                <span>View Live News Coverage</span>
                <span>→</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
