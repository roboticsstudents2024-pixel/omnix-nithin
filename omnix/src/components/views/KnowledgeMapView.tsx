import React, { useState } from 'react';
import {
  Network,
  Share2,
  Sparkles,
  ExternalLink,
  Search,
  Layers,
  Circle,
} from 'lucide-react';

interface GraphNode {
  id: string;
  label: string;
  type: 'core' | 'entity' | 'tech' | 'market';
  x: number;
  y: number;
  connections: string[];
  description: string;
}

const KNOWLEDGE_NODES: GraphNode[] = [
  {
    id: 'omnix_core',
    label: 'OMNIX Intelligence Core',
    type: 'core',
    x: 50,
    y: 50,
    connections: ['gen_ai', 'silicon_fab', 'clean_energy', 'live_web'],
    description: 'Central multi-modal neural reasoning engine fusing verified real-time sources.',
  },
  {
    id: 'gen_ai',
    label: 'Generative AI Foundation Models',
    type: 'tech',
    x: 25,
    y: 30,
    connections: ['omnix_core', 'silicon_fab'],
    description: 'Trillion-parameter multi-modal architectures with test-time reasoning and agentic execution.',
  },
  {
    id: 'silicon_fab',
    label: 'Advanced Semiconductor Silicon (2nm & HBM4)',
    type: 'entity',
    x: 75,
    y: 30,
    connections: ['omnix_core', 'gen_ai', 'market_equities'],
    description: 'EUV lithography, nanosheet transistors, and multi-die CoWoS packaging.',
  },
  {
    id: 'clean_energy',
    label: 'Clean Energy & Nuclear Micro-Reactors',
    type: 'tech',
    x: 25,
    y: 70,
    connections: ['omnix_core', 'market_equities'],
    description: 'High-density baseload power solutions contracted directly for computing infrastructure.',
  },
  {
    id: 'live_web',
    label: 'Verified Web News & Feed Ingestion',
    type: 'market',
    x: 75,
    y: 70,
    connections: ['omnix_core'],
    description: 'Strict 5-step source verification pipeline rejecting synthetic or unverified claims.',
  },
  {
    id: 'market_equities',
    label: 'Global Capital & Supply Chains',
    type: 'market',
    x: 50,
    y: 85,
    connections: ['clean_energy', 'silicon_fab'],
    description: 'Cross-asset liquidity, commodities, agriculture index, and equity valuations.',
  },
];

interface KnowledgeMapViewProps {
  onSelectNode: (label: string) => void;
}

export const KnowledgeMapView: React.FC<KnowledgeMapViewProps> = ({ onSelectNode }) => {
  const [selectedNode, setSelectedNode] = useState<GraphNode>(KNOWLEDGE_NODES[0]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400">
            <Network className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-serif">OMNIX Knowledge Graph</h2>
            <p className="text-xs text-zinc-400">
              Interactive topological visualization of entities, research domains, and verified connections
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1.5 rounded-xl border border-cyan-800/60">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Active Topological Grid</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Graph Canvas / Visualizer */}
        <div className="lg:col-span-2 p-6 bg-zinc-950 border border-zinc-800 rounded-3xl relative min-h-[420px] flex flex-col justify-between overflow-hidden shadow-2xl">
          {/* Subtle Grid Lines in Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {KNOWLEDGE_NODES.map((node) =>
              node.connections.map((targetId) => {
                const target = KNOWLEDGE_NODES.find((n) => n.id === targetId);
                if (!target) return null;
                return (
                  <line
                    key={`${node.id}-${target.id}`}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${target.x}%`}
                    y2={`${target.y}%`}
                    stroke="rgba(6, 182, 212, 0.25)"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                );
              })
            )}
          </svg>

          {/* Render Interactive Nodes */}
          <div className="relative w-full h-full min-h-[350px]">
            {KNOWLEDGE_NODES.map((node) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNode(node)}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className={`absolute z-10 p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer shadow-lg ${
                    isSelected
                      ? 'bg-cyan-500 text-zinc-950 border-white shadow-[0_0_25px_rgba(6,182,212,0.6)] scale-110'
                      : 'bg-zinc-900/90 text-zinc-200 border-zinc-700/80 hover:border-cyan-500/60 hover:scale-105'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <Circle className={`w-2.5 h-2.5 fill-current ${isSelected ? 'text-zinc-950' : 'text-cyan-400'}`} />
                    <span className="whitespace-nowrap">{node.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative z-10 text-[11px] font-mono text-zinc-500 flex items-center justify-between pt-2 border-t border-zinc-900">
            <span>Tap node to inspect verified relational parameters</span>
            <span className="text-cyan-400">{KNOWLEDGE_NODES.length} Node Cluster</span>
          </div>
        </div>

        {/* Node Inspector Dossier */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs">
              <span className="font-mono text-cyan-400 text-[11px] uppercase tracking-wider">
                Node Specification
              </span>
              <span className="font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 uppercase text-[10px]">
                {selectedNode.type}
              </span>
            </div>

            <h3 className="text-xl font-bold font-serif text-white">
              {selectedNode.label}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {selectedNode.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold block">
                Relational Edges:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.connections.map((connId) => {
                  const target = KNOWLEDGE_NODES.find((n) => n.id === connId);
                  return (
                    <span
                      key={connId}
                      className="px-2.5 py-1 rounded-lg bg-zinc-950 text-cyan-300 border border-zinc-800 text-xs font-mono"
                    >
                      → {target?.label || connId}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectNode(selectedNode.label)}
            className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
          >
            <span>Launch OMNIX Search for this Node</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
