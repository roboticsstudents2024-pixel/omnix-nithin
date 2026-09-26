import React, { useState } from 'react';
import {
  Settings,
  Cpu,
  Shield,
  Palette,
  Check,
  RefreshCw,
  Sliders,
  Database,
  Download,
} from 'lucide-react';

interface SettingsViewProps {
  demoMode: boolean;
  onToggleDemoMode: (val: boolean) => void;
  onClearLocalCache: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  demoMode,
  onToggleDemoMode,
  onClearLocalCache,
}) => {
  const [modelChoice, setModelChoice] = useState('gemini-3.1-flash-lite');
  const [accentTheme, setAccentTheme] = useState('cyan');
  const [researchDepth, setResearchDepth] = useState('deep');
  const [cacheCleared, setCacheCleared] = useState(false);

  const handleClearCache = () => {
    onClearLocalCache();
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center gap-3">
        <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white font-serif">OMNIX System Configuration</h2>
          <p className="text-xs text-zinc-400">
            Model parameters, theme accents, verification rules &amp; cache management
          </p>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {/* Model Selection */}
        <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Neural Intelligence Model</span>
          </div>
          <p className="text-xs text-zinc-400">
            Select the underlying foundation model architecture for OMNIX reasoning and summarization.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {[
              { id: 'gemini-3.1-flash-lite', name: 'Gemini 3.1 Flash Lite', desc: 'Ultra-low latency, high-throughput factual synthesis (Recommended)' },
              { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash', desc: 'Advanced multimodal reasoning & extended context capacity' },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setModelChoice(m.id)}
                className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                  modelChoice === m.id
                    ? 'bg-cyan-500/15 border-cyan-400 text-white'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-xs">
                  <span>{m.name}</span>
                  {modelChoice === m.id && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">{m.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Verification Standards */}
        <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Verification &amp; Anti-Mock Enforcement</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Strict 5-step ingestion pipeline enforces authentic URLs, matching publisher tags, and rejects any simulated placeholder domains (e.g. example.com).
          </p>

          <div className="pt-2 flex items-center justify-between p-3 bg-zinc-950 rounded-xl border border-zinc-800">
            <div>
              <span className="text-xs font-semibold text-white">Simulated Demo Mode</span>
              <p className="text-[11px] text-zinc-500">Only for offline testing. Clearly displays DEMO DATA banner.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={demoMode}
                onChange={(e) => onToggleDemoMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>
        </div>

        {/* Download & Export OMNIX Platform */}
        <div className="p-5 bg-gradient-to-r from-cyan-950/40 via-zinc-900 to-zinc-900 border border-cyan-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold text-white">Download OMNIX Full Package</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">
              Export and save the complete OMNIX application, neural intelligence core, news pipelines, and documentation as <code>omnix.zip</code>.
            </p>
          </div>
          <a
            href="/api/download/omnix"
            download="omnix.zip"
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20 shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download omnix.zip</span>
          </a>
        </div>

        {/* Cache Management */}
        <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-white">Client Storage &amp; Cache</span>
            <p className="text-[11px] text-zinc-400">Clear temporary search queries and locally cached summaries.</p>
          </div>
          <button
            type="button"
            onClick={handleClearCache}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl transition flex items-center gap-2 cursor-pointer"
          >
            {cacheCleared ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <RefreshCw className="w-3.5 h-3.5" />}
            <span>{cacheCleared ? 'Cleared!' : 'Purge Cache'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
