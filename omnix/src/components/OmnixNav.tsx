import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Globe,
  Newspaper,
  AudioWaveform,
  BarChart3,
  Building2,
  Users,
  MapPin,
  Atom,
  TrendingUp,
  Network,
  Bookmark,
  Clock,
  Settings,
  MoreHorizontal,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';

export type OmnixFeatureId =
  | 'ai'
  | 'live_web'
  | 'news'
  | 'live_voice'
  | 'data'
  | 'companies'
  | 'people'
  | 'places'
  | 'science'
  | 'trends'
  | 'knowledge_map'
  | 'saved'
  | 'history'
  | 'settings';

export interface OmnixFeatureConfig {
  id: OmnixFeatureId;
  label: string;
  tooltip: string;
  category: 'primary' | 'intelligence' | 'system';
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export const OMNIX_FEATURES: OmnixFeatureConfig[] = [
  // Primary Quick-Access
  {
    id: 'ai',
    label: 'AI',
    tooltip: 'AI - Main OMNIX Conversation',
    category: 'primary',
    icon: Sparkles,
    description: 'Conversational reasoning, code & knowledge synthesis',
  },
  {
    id: 'live_web',
    label: 'Live Web',
    tooltip: 'Live Web - Real-time Web Search',
    category: 'primary',
    icon: Globe,
    description: 'Search live Internet with instant grounded answers',
  },
  {
    id: 'news',
    label: 'News',
    tooltip: 'News - Verified Live News',
    category: 'primary',
    icon: Newspaper,
    description: 'Real-time verified news with multi-source audit',
  },
  {
    id: 'live_voice',
    label: 'Live',
    tooltip: 'Live Voice - Real-time Voice Conversation',
    category: 'primary',
    icon: AudioWaveform,
    description: 'Hands-free voice interaction and audio synthesis',
  },
  {
    id: 'data',
    label: 'Data',
    tooltip: 'Data - Live Data & Market Tools',
    category: 'primary',
    icon: BarChart3,
    description: 'Market indices, economic feeds & commodity trackers',
  },
  // Extended Features (available via top-right or More menu)
  {
    id: 'companies',
    label: 'Companies',
    tooltip: 'Companies - Company Intelligence',
    category: 'intelligence',
    icon: Building2,
    description: 'Corporate filings, tech leaders & financials',
  },
  {
    id: 'people',
    label: 'People',
    tooltip: 'People - People Intelligence',
    category: 'intelligence',
    icon: Users,
    description: 'Key innovators, researchers & global leaders',
  },
  {
    id: 'places',
    label: 'Places',
    tooltip: 'Places - Geographic Information',
    category: 'intelligence',
    icon: MapPin,
    description: 'Global cities, regional news & geospatial facts',
  },
  {
    id: 'science',
    label: 'Science',
    tooltip: 'Science - Research & Breakthroughs',
    category: 'intelligence',
    icon: Atom,
    description: 'Peer-reviewed discoveries, astrophysics & biotech',
  },
  {
    id: 'trends',
    label: 'Trends',
    tooltip: 'Trends - Global Real-time Trends',
    category: 'intelligence',
    icon: TrendingUp,
    description: 'Emerging trends, viral surges & breaking shifts',
  },
  {
    id: 'knowledge_map',
    label: 'Map',
    tooltip: 'Knowledge Map - Interactive Graph',
    category: 'intelligence',
    icon: Network,
    description: 'Visual network of interconnected entities & sources',
  },
  {
    id: 'saved',
    label: 'Saved',
    tooltip: 'Saved - Research & Bookmarks',
    category: 'system',
    icon: Bookmark,
    description: 'Your bookmarked articles, briefs and queries',
  },
  {
    id: 'history',
    label: 'History',
    tooltip: 'History - Past Searches & Sessions',
    category: 'system',
    icon: Clock,
    description: 'Timeline of inquiries and past session states',
  },
  {
    id: 'settings',
    label: 'Settings',
    tooltip: 'Settings - OMNIX Preferences',
    category: 'system',
    icon: Settings,
    description: 'Model parameters, themes & intelligence depth',
  },
];

interface OmnixNavProps {
  activeFeature: OmnixFeatureId;
  onSelectFeature: (id: OmnixFeatureId) => void;
  isDark?: boolean;
}

export const OmnixNav: React.FC<OmnixNavProps> = ({
  activeFeature,
  onSelectFeature,
  isDark = true,
}) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close More menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary desktop features
  const primaryFeatures = OMNIX_FEATURES.slice(0, 5); // AI, Live Web, News, Live Voice, Data
  // Remaining features for desktop "More" menu
  const moreFeatures = OMNIX_FEATURES.slice(5);

  const isMoreActive = moreFeatures.some((f) => f.id === activeFeature);

  return (
    <nav className="flex items-center gap-1.5 sm:gap-2">
      {/* DESKTOP QUICK-ACCESS ICONS (Top-Right) */}
      <div
        className={`hidden lg:flex items-center gap-1 p-1 rounded-2xl border shadow-md transition-colors ${
          isDark
            ? 'bg-slate-900/90 border-slate-800/80 shadow-black/30'
            : 'bg-slate-100 border-slate-200/90 shadow-slate-200/50'
        }`}
      >
        {primaryFeatures.map((item) => {
          const Icon = item.icon;
          const isActive = activeFeature === item.id;

          return (
            <div key={item.id} className="relative group">
              <button
                type="button"
                onClick={() => onSelectFeature(item.id)}
                onMouseEnter={() => setHoveredFeature(item.id)}
                onMouseLeave={() => setHoveredFeature(null)}
                aria-label={item.tooltip}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.35)] scale-102'
                      : 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20 scale-102'
                    : isDark
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800/80 border border-transparent'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white border border-transparent'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
                    isActive
                      ? isDark
                        ? 'text-cyan-400 animate-pulse'
                        : 'text-slate-950'
                      : isDark
                      ? 'text-slate-400 group-hover:text-slate-200'
                      : 'text-slate-500 group-hover:text-slate-900'
                  }`}
                />
                <span className="tracking-wide">{item.label}</span>
                {isActive && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isDark ? 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]' : 'bg-slate-950'
                    }`}
                  ></span>
                )}
              </button>

              {/* Tooltip */}
              <div
                className={`pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50 whitespace-nowrap text-[11px] font-medium px-2.5 py-1 rounded-md border shadow-xl ${
                  isDark
                    ? 'bg-slate-950 text-slate-200 border-slate-800'
                    : 'bg-white text-slate-800 border-slate-200 shadow-slate-200/50'
                }`}
              >
                {item.tooltip}
              </div>
            </div>
          );
        })}

        {/* MORE BUTTON (Desktop) */}
        <div className="relative" ref={moreRef}>
          <button
            type="button"
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
              isMoreActive || isMoreOpen
                ? isDark
                  ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                  : 'bg-cyan-100 text-cyan-900 border border-cyan-300'
                : isDark
                ? 'text-slate-400 hover:text-white hover:bg-slate-800/80 border border-transparent'
                : 'text-slate-600 hover:text-slate-950 hover:bg-white border border-transparent'
            }`}
            title="More OMNIX Features"
          >
            <MoreHorizontal className="w-3.5 h-3.5" />
            <span>More</span>
            <ChevronDown
              className={`w-3 h-3 transition-transform duration-200 ${
                isMoreOpen ? 'rotate-180 text-cyan-400' : 'text-slate-500'
              }`}
            />
          </button>

          {/* MORE DROPDOWN MENU */}
          {isMoreOpen && (
            <div
              className={`absolute right-0 top-full mt-2 w-80 backdrop-blur-xl border rounded-2xl p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 ${
                isDark
                  ? 'bg-slate-950/95 border-slate-800 text-white shadow-black/70'
                  : 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-300/60'
              }`}
            >
              <div
                className={`px-2.5 py-1.5 mb-2 border-b flex items-center justify-between text-[11px] font-mono uppercase tracking-wider ${
                  isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
                }`}
              >
                <span>Intelligence &amp; System Tools</span>
                <span className="text-cyan-500 font-bold">OMNIX v3</span>
              </div>

              <div className="grid grid-cols-1 gap-1">
                {moreFeatures.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeFeature === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onSelectFeature(item.id);
                        setIsMoreOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                          : isDark
                          ? 'text-slate-300 hover:bg-slate-900 hover:text-white border border-transparent'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950 border border-transparent'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          isActive
                            ? 'bg-cyan-400/20 text-cyan-400'
                            : isDark
                            ? 'bg-slate-900 text-slate-400'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold tracking-wide">
                            {item.label}
                          </span>
                          {isActive && (
                            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                              Active
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-[11px] truncate ${
                            isDark ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TABLET VIEW (Compact Icons) */}
      <div
        className={`hidden md:flex lg:hidden items-center gap-1 p-1 rounded-2xl border ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}
      >
        {primaryFeatures.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const isActive = activeFeature === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectFeature(item.id)}
              title={item.tooltip}
              className={`p-2 rounded-xl transition cursor-pointer ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-white'
              }`}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setIsMobileDrawerOpen(true)}
          className={`p-2 rounded-xl transition cursor-pointer ${
            isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-950 hover:bg-white'
          }`}
          title="All OMNIX Features"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* MOBILE QUICK-ACCESS */}
      <div
        className={`flex md:hidden items-center gap-1 p-1 rounded-xl border ${
          isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}
      >
        {[
          OMNIX_FEATURES[0], // AI
          OMNIX_FEATURES[1], // Live Web
          OMNIX_FEATURES[2], // News
          OMNIX_FEATURES[3], // Live Voice
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeFeature === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectFeature(item.id)}
              title={item.tooltip}
              className={`p-2 rounded-lg transition cursor-pointer ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-white'
              }`}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setIsMobileDrawerOpen(true)}
          className={`p-2 rounded-lg transition cursor-pointer ${
            isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-950 hover:bg-white'
          }`}
          title="All OMNIX Features"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-sm border-l h-full p-5 flex flex-col justify-between overflow-y-auto shadow-2xl ${
              isDark
                ? 'bg-slate-950 border-slate-800 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div>
              {/* Drawer Header */}
              <div
                className={`flex items-center justify-between pb-4 border-b ${
                  isDark ? 'border-slate-800' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base tracking-wide">
                      OMNIX Navigator
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">14 Live Intelligence Tools</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className={`p-1.5 rounded-lg transition cursor-pointer ${
                    isDark ? 'text-slate-400 hover:text-white hover:bg-slate-900' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categorized List */}
              <div className="mt-5 space-y-4">
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 px-2 mb-1.5">
                    Primary Tools
                  </h4>
                  <div className="space-y-1">
                    {OMNIX_FEATURES.slice(0, 5).map((item) => {
                      const Icon = item.icon;
                      const isActive = activeFeature === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            onSelectFeature(item.id);
                            setIsMobileDrawerOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition cursor-pointer ${
                            isActive
                              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                              : isDark
                              ? 'text-slate-300 hover:bg-slate-900 hover:text-white border border-transparent'
                              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950 border border-transparent'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-cyan-500'}`} />
                          <div className="flex-1">
                            <span className="text-xs font-semibold">{item.label}</span>
                            <p
                              className={`text-[11px] truncate ${
                                isActive ? 'text-slate-900 opacity-80' : isDark ? 'text-slate-400' : 'text-slate-500'
                              }`}
                            >
                              {item.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 px-2 mb-1.5">
                    Intelligence Domains
                  </h4>
                  <div className="space-y-1">
                    {OMNIX_FEATURES.slice(5, 11).map((item) => {
                      const Icon = item.icon;
                      const isActive = activeFeature === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            onSelectFeature(item.id);
                            setIsMobileDrawerOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition cursor-pointer ${
                            isActive
                              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                              : isDark
                              ? 'text-slate-300 hover:bg-slate-900 hover:text-white border border-transparent'
                              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950 border border-transparent'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-cyan-500'}`} />
                          <div className="flex-1">
                            <span className="text-xs font-semibold">{item.label}</span>
                            <p
                              className={`text-[11px] truncate ${
                                isActive ? 'text-slate-900 opacity-80' : isDark ? 'text-slate-400' : 'text-slate-500'
                              }`}
                            >
                              {item.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 px-2 mb-1.5">
                    Workspace &amp; System
                  </h4>
                  <div className="space-y-1">
                    {OMNIX_FEATURES.slice(11).map((item) => {
                      const Icon = item.icon;
                      const isActive = activeFeature === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            onSelectFeature(item.id);
                            setIsMobileDrawerOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition cursor-pointer ${
                            isActive
                              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                              : isDark
                              ? 'text-slate-300 hover:bg-slate-900 hover:text-white border border-transparent'
                              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950 border border-transparent'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-cyan-500'}`} />
                          <div className="flex-1">
                            <span className="text-xs font-semibold">{item.label}</span>
                            <p
                              className={`text-[11px] truncate ${
                                isActive ? 'text-slate-900 opacity-80' : isDark ? 'text-slate-400' : 'text-slate-500'
                              }`}
                            >
                              {item.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div
              className={`pt-4 border-t text-[11px] flex items-center justify-between ${
                isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
              }`}
            >
              <span>OMNIX Core active</span>
              <span className="font-mono text-cyan-500 font-semibold">Status: Online</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
