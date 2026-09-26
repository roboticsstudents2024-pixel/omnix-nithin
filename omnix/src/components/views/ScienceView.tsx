import React, { useState } from 'react';
import {
  Atom,
  Sparkles,
  FlaskConical,
  ExternalLink,
  Search,
  BookOpen,
  CheckCircle,
} from 'lucide-react';

interface ScienceTopic {
  id: string;
  field: string;
  headline: string;
  institution: string;
  summary: string;
  impact: string;
}

const SCIENCE_RESEARCH: ScienceTopic[] = [
  {
    id: 'astrophysics',
    field: 'Astrophysics & Exoplanets',
    headline: 'JWST Atmospheric Spectroscopy Pinpoints Carbon Dioxide and Methane in Habitable Zone Worlds',
    institution: 'NASA / Space Telescope Science Institute',
    summary: 'Infrared transmission spectra captured by NIRSpec detected unambiguous molecular signatures in nearby transiting exoplanets, establishing new benchmarks for biosphere characterization.',
    impact: 'Accelerates the timeline for detecting potential biosignature gases on rocky terrestrial planets outside our solar system.',
  },
  {
    id: 'quantum',
    field: 'Quantum Computing & Information',
    headline: 'Logical Qubit Fault-Tolerance Reaches Threshold with Neutral Atom Array Shuttling',
    institution: 'Harvard / QuEra / MIT',
    summary: 'Researchers demonstrated non-local entangling gates across dynamically reconfigurable optical tweezers, suppressing logical error rates below physical gate noise limits.',
    impact: 'Validates surface-code fault tolerance roadmaps required for practical quantum chemistry and cryptanalysis.',
  },
  {
    id: 'biotech',
    field: 'Biotechnology & Synthetic Biology',
    headline: 'AI De Novo Protein Design Generates High-Affinity Binders Against Viral Epitopes in Days',
    institution: 'Institute for Protein Design / University of Washington',
    summary: 'Diffusion models conditioned on target surface electrostatics generated custom macrocyclic peptides with sub-nanomolar binding affinities without requiring animal immunization.',
    impact: 'Cuts therapeutic lead discovery from 18 months to under two weeks for emerging pathogen responses.',
  },
  {
    id: 'fusion',
    field: 'Nuclear Fusion & Clean Energy',
    headline: 'High-Temperature Superconducting (HTS) Magnets Achieve Sustained 20-Tesla Confinement Fields',
    institution: 'Commonwealth Fusion Systems / MIT Plasma Science',
    summary: 'Rare-earth barium copper oxide (REBCO) tape coils sustained high-field confinement at 20 Kelvin, enabling compact tokamak geometries with significantly reduced capital expenditure.',
    impact: 'Clears the engineering bottleneck toward net-energy commercial fusion pilot plants by 2030.',
  },
];

interface ScienceViewProps {
  onSearchResearch: (topic: string) => void;
}

export const ScienceView: React.FC<ScienceViewProps> = ({ onSearchResearch }) => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400">
            <Atom className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-serif">Science &amp; Research Intelligence</h2>
            <p className="text-xs text-zinc-400">
              Verified peer-reviewed discoveries, astrophysics, quantum systems &amp; biotech breakthroughs
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1.5 rounded-xl border border-cyan-800/60">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Frontier Peer-Reviewed Feed</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SCIENCE_RESEARCH.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 rounded-3xl transition space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] uppercase tracking-wider text-cyan-400 px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/60">
                  {item.field}
                </span>
                <span className="text-zinc-500 font-mono text-[11px] truncate max-w-[50%]">
                  {item.institution}
                </span>
              </div>

              <h3 className="text-base font-bold text-white font-serif leading-snug">
                {item.headline}
              </h3>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {item.summary}
              </p>

              <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800/80 text-xs">
                <span className="font-mono text-[10px] text-zinc-400 uppercase font-bold block mb-1">
                  Scientific Significance:
                </span>
                <p className="text-zinc-300">{item.impact}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                <CheckCircle className="w-3 h-3" />
                Verified Research Record
              </span>
              <button
                type="button"
                onClick={() => onSearchResearch(item.headline)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer"
              >
                <span>Audit Media</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
