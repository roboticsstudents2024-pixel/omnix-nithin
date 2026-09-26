import React, { useState } from 'react';
import {
  Building2,
  ExternalLink,
  Search,
  Globe,
  TrendingUp,
  Cpu,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

interface CompanyProfile {
  id: string;
  name: string;
  ticker: string;
  industry: string;
  headquarters: string;
  ceo: string;
  valuation: string;
  description: string;
  keyInitiatives: string[];
}

const COMPANIES: CompanyProfile[] = [
  {
    id: 'apple',
    name: 'Apple Inc.',
    ticker: 'AAPL',
    industry: 'Consumer Technology & Silicon',
    headquarters: 'Cupertino, California, USA',
    ceo: 'Tim Cook',
    valuation: '~$3.4 Trillion',
    description: 'Designer of personal computing, consumer electronics, operating systems, and Apple Intelligence neural edge processing.',
    keyInitiatives: ['Apple Intelligence on-device silicon', 'M-series processors', 'Spatial computing visionOS', 'Services ecosystem'],
  },
  {
    id: 'nvidia',
    name: 'NVIDIA Corporation',
    ticker: 'NVDA',
    industry: 'Semiconductors & Accelerated Computing',
    headquarters: 'Santa Clara, California, USA',
    ceo: 'Jensen Huang',
    valuation: '~$3.2 Trillion',
    description: 'Pioneer of GPU-accelerated computing, AI data center superclusters, CUDA architecture, and Blackwell architecture.',
    keyInitiatives: ['Blackwell B200 / GB200 NVL72', 'CUDA AI software platform', 'Omniverse digital twins', 'Autonomous robotics'],
  },
  {
    id: 'alphabet',
    name: 'Alphabet / Google',
    ticker: 'GOOGL',
    industry: 'Internet, Cloud & AI Research',
    headquarters: 'Mountain View, California, USA',
    ceo: 'Sundar Pichai',
    valuation: '~$2.1 Trillion',
    description: 'Global technology leader in search, YouTube, Android, Google Cloud TPU computing, and Gemini AI foundation models.',
    keyInitiatives: ['Gemini multi-modal AI models', 'Trillium TPU v6 accelerators', 'Google Cloud enterprise AI', 'Quantum computing research'],
  },
  {
    id: 'microsoft',
    name: 'Microsoft Corporation',
    ticker: 'MSFT',
    industry: 'Enterprise Software & Cloud',
    headquarters: 'Redmond, Washington, USA',
    ceo: 'Satya Nadella',
    valuation: '~$3.1 Trillion',
    description: 'Global software and enterprise cloud leader behind Azure, Microsoft 365, Copilot AI integrations, and GitHub.',
    keyInitiatives: ['Azure AI cloud infrastructure', 'Copilot productivity suite', 'Maia 100 custom AI accelerators', 'OpenAI strategic alliance'],
  },
  {
    id: 'tesla',
    name: 'Tesla, Inc.',
    ticker: 'TSLA',
    industry: 'Electric Vehicles & Robotics',
    headquarters: 'Austin, Texas, USA',
    ceo: 'Elon Musk',
    valuation: '~$780 Billion',
    description: 'Electric vehicle manufacturer, battery energy storage provider, and developer of Full Self-Driving neural vision and Optimus humanoid robot.',
    keyInitiatives: ['FSD vision neural network', 'Optimus humanoid robotics', 'Megapack utility storage', 'Next-gen vehicle platform'],
  },
  {
    id: 'tsmc',
    name: 'TSMC (Taiwan Semiconductor)',
    ticker: 'TSM',
    industry: 'Pure-Play Foundry & Nanometer Fabrication',
    headquarters: 'Hsinchu, Taiwan',
    ceo: 'C.C. Wei',
    valuation: '~$850 Billion',
    description: 'World largest dedicated semiconductor foundry, fabricating cutting-edge 3nm and 2nm silicon nodes for Apple, NVIDIA, and AMD.',
    keyInitiatives: ['A16 and 2nm nanosheet process', 'CoWoS advanced packaging', 'Global fab expansion (Arizona, Kumamoto, Dresden)'],
  },
];

interface CompaniesViewProps {
  onSearchCompanyNews: (companyName: string) => void;
}

export const CompaniesView: React.FC<CompaniesViewProps> = ({
  onSearchCompanyNews,
}) => {
  const [selectedId, setSelectedId] = useState<string>('apple');
  const [searchFilter, setSearchFilter] = useState('');

  const selectedCompany = COMPANIES.find((c) => c.id === selectedId) || COMPANIES[0];

  const filteredCompanies = COMPANIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.ticker.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-serif">Company Intelligence</h2>
            <p className="text-xs text-zinc-400">
              Corporate profiles, technology initiatives, market capitalizations &amp; live verified news
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search company or ticker..."
            className="w-full pl-9 pr-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company List */}
        <div className="space-y-2 lg:col-span-1">
          {filteredCompanies.map((c) => {
            const isSelected = c.id === selectedCompany.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedId(c.id)}
                className={`w-full text-left p-4 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-400/50 shadow-md text-white'
                    : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{c.name}</span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {c.ticker}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">{c.industry}</p>
                </div>
                <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-zinc-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Company Detail Dossier */}
        <div className="lg:col-span-2 p-6 bg-zinc-900/90 border border-zinc-800 rounded-3xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-2xl font-bold font-serif text-white">{selectedCompany.name}</h3>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/60">
                  {selectedCompany.ticker}
                </span>
              </div>
              <p className="text-xs text-zinc-400">{selectedCompany.industry}</p>
            </div>

            <button
              type="button"
              onClick={() => onSearchCompanyNews(selectedCompany.name)}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-xl text-xs transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              <span>Audit Live News</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 font-mono text-[11px] uppercase">Market Valuation</span>
              <p className="text-sm font-bold text-white font-mono mt-0.5">{selectedCompany.valuation}</p>
            </div>
            <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 font-mono text-[11px] uppercase">Chief Executive</span>
              <p className="text-sm font-bold text-white mt-0.5">{selectedCompany.ceo}</p>
            </div>
            <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800 col-span-2 sm:col-span-1">
              <span className="text-zinc-500 font-mono text-[11px] uppercase">Global HQ</span>
              <p className="text-sm font-bold text-white mt-0.5 truncate">{selectedCompany.headquarters}</p>
            </div>
          </div>

          {/* Corporate Overview */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
              Executive Briefing
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {selectedCompany.description}
            </p>
          </div>

          {/* Strategic Initiatives */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
              Core Strategic Initiatives
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedCompany.keyInitiatives.map((item, i) => (
                <div
                  key={i}
                  className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800 text-xs text-zinc-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
