import React from 'react';
import {
  ShieldCheck,
  Radio,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  Sun,
  Moon,
  Download,
} from 'lucide-react';
import { OmnixNav, OmnixFeatureId } from './OmnixNav';

interface HeaderProps {
  activeFeature: OmnixFeatureId;
  onSelectFeature: (id: OmnixFeatureId) => void;
  lastUpdated: string | null;
  isLoading: boolean;
  onRefresh: () => void;
  isLiveActive: boolean;
  demoMode: boolean;
  onToggleDemoMode: (val: boolean) => void;
  onOpenVerificationModal: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeFeature,
  onSelectFeature,
  lastUpdated,
  isLoading,
  onRefresh,
  isLiveActive,
  demoMode,
  onToggleDemoMode,
  onOpenVerificationModal,
  isDark,
  onToggleTheme,
}) => {
  return (
    <header
      className={`border-b sticky top-0 z-40 transition-colors backdrop-blur-xl ${
        isDark
          ? 'border-slate-800/80 bg-slate-950/90 text-white'
          : 'border-slate-200/90 bg-white/90 text-slate-900 shadow-xs'
      }`}
    >
      {/* Top Banner if Demo Mode is Active */}
      {demoMode && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-center text-xs font-bold tracking-wide uppercase flex items-center justify-center gap-2 border-b border-amber-600 shadow-inner">
          <AlertTriangle className="w-4 h-4 text-slate-950" />
          <span>
            DEMO DATA — This is simulated offline data for testing. Never represent demo content as current real-world news.
          </span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-2.5 sm:py-3 flex items-center justify-between gap-3">
          {/* Brand Left Section */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onSelectFeature('news')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-cyan-400 p-[1px] shadow-[0_0_15px_rgba(6,182,212,0.35)]">
                <div
                  className={`w-full h-full rounded-[11px] flex items-center justify-center group-hover:scale-95 transition-transform ${
                    isDark ? 'bg-slate-950 text-cyan-400' : 'bg-white text-cyan-600'
                  }`}
                >
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-extrabold tracking-wider text-base sm:text-lg font-serif ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    OMNIX
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded font-bold uppercase bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 hidden sm:inline-block">
                    INTELLIGENCE
                  </span>
                </div>
                <p
                  className={`text-[10px] hidden md:block ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  AI-Powered Real-Time News &amp; Knowledge
                </p>
              </div>
            </button>
          </div>

          {/* TOP-RIGHT QUICK ACCESS ICONS NAVIGATION */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <OmnixNav
              activeFeature={activeFeature}
              onSelectFeature={onSelectFeature}
              isDark={isDark}
            />

            {/* Download OMNIX Package */}
            <a
              href="/api/download/omnix"
              download="omnix.zip"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                isDark
                  ? 'bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-400 border-cyan-500/30'
                  : 'bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border-cyan-300'
              }`}
              title="Download OMNIX package (omnix.zip)"
            >
              <Download className="w-3.5 h-3.5 text-cyan-500" />
              <span className="hidden sm:inline">Download</span>
            </a>

            {/* Quick Refresh Icon */}
            <button
              type="button"
              onClick={onRefresh}
              disabled={isLoading}
              className={`p-2 rounded-xl text-xs font-medium border transition cursor-pointer disabled:opacity-50 ${
                isDark
                  ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
              title="Sync live feeds"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-cyan-500' : ''}`} />
            </button>

            {/* Theme Toggle (Light / Dark) */}
            <button
              type="button"
              onClick={onToggleTheme}
              className={`p-2 rounded-xl text-xs font-medium border transition cursor-pointer ${
                isDark
                  ? 'bg-slate-900/80 hover:bg-slate-800 text-amber-400 border-slate-800'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
