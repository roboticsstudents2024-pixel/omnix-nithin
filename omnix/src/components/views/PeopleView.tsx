import React, { useState } from 'react';
import {
  Users,
  Search,
  ExternalLink,
  Award,
  BookOpen,
  Briefcase,
  ChevronRight,
} from 'lucide-react';

interface PersonProfile {
  id: string;
  name: string;
  role: string;
  organization: string;
  domain: string;
  bio: string;
  notableImpact: string[];
}

const NOTABLE_PEOPLE: PersonProfile[] = [
  {
    id: 'jensen_huang',
    name: 'Jensen Huang',
    role: 'Co-founder & CEO',
    organization: 'NVIDIA',
    domain: 'Accelerated Computing & Silicon Architectures',
    bio: 'Pioneered GPU computing, CUDA programming model, and large-scale AI supercomputing platforms powering foundational modern models.',
    notableImpact: ['Creation of GPU market in 1999', 'CUDA accelerated compute platform', 'Pioneering Blackwell NVL72 data centers'],
  },
  {
    id: 'demis_hassabis',
    name: 'Demis Hassabis',
    role: 'CEO & Co-founder',
    organization: 'Google DeepMind',
    domain: 'Artificial General Intelligence & Computational Biology',
    bio: 'Neuroscientist, chess master, and AI researcher who led AlphaFold (Nobel Prize in Chemistry 2024), AlphaGo, and Gemini multi-modal research.',
    notableImpact: ['AlphaFold 3D protein structure prediction', 'Reinforcement learning AlphaGo breakthrough', 'Leading Gemini foundational research'],
  },
  {
    id: 'sam_altman',
    name: 'Sam Altman',
    role: 'CEO',
    organization: 'OpenAI',
    domain: 'Frontier AI & Silicon Infrastructure',
    bio: 'Entrepreneur and investor spearheading generative foundation models, ChatGPT, GPT-4, OpenAI o1 reasoning architectures, and energy infrastructure.',
    notableImpact: ['Commercialization of conversational AI', 'o1 series reasoning paradigms', 'Global AI energy and compute advocacy'],
  },
  {
    id: 'jennifer_doudna',
    name: 'Jennifer Doudna',
    role: 'Professor & Nobel Laureate',
    organization: 'UC Berkeley / Innovative Genomics Institute',
    domain: 'CRISPR Gene Editing & Molecular Biology',
    bio: 'Biochemist awarded the 2020 Nobel Prize in Chemistry for the development of CRISPR-Cas9 genome editing, revolutionizing targeted therapeutics.',
    notableImpact: ['CRISPR-Cas9 gene editing mechanism', 'FDA approval of Casgevy for sickle cell disease', 'Therapeutic and agricultural genetics'],
  },
];

interface PeopleViewProps {
  onSearchPersonNews: (name: string) => void;
}

export const PeopleView: React.FC<PeopleViewProps> = ({ onSearchPersonNews }) => {
  const [selectedId, setSelectedId] = useState<string>('jensen_huang');
  const [query, setQuery] = useState('');

  const person = NOTABLE_PEOPLE.find((p) => p.id === selectedId) || NOTABLE_PEOPLE[0];

  const filtered = NOTABLE_PEOPLE.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.organization.toLowerCase().includes(query.toLowerCase()) ||
      p.domain.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-serif">People Intelligence</h2>
            <p className="text-xs text-zinc-400">
              Profiles, scientific breakthroughs &amp; executive leadership records
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search person or field..."
            className="w-full pl-9 pr-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="space-y-2 lg:col-span-1">
          {filtered.map((p) => {
            const isSelected = p.id === person.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedId(p.id)}
                className={`w-full text-left p-4 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-400/50 shadow-md text-white'
                    : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                }`}
              >
                <div>
                  <h3 className="font-bold text-sm">{p.name}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{p.role} · {p.organization}</p>
                </div>
                <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-zinc-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Dossier */}
        <div className="lg:col-span-2 p-6 bg-zinc-900/90 border border-zinc-800 rounded-3xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <h3 className="text-2xl font-bold font-serif text-white">{person.name}</h3>
              <p className="text-xs text-cyan-400 font-mono mt-0.5">{person.role} · {person.organization}</p>
            </div>

            <button
              type="button"
              onClick={() => onSearchPersonNews(person.name)}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-xl text-xs transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              <span>Search Verified Media</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800 text-xs">
            <span className="text-zinc-500 font-mono uppercase text-[11px]">Primary Domain:</span>
            <p className="font-bold text-white mt-0.5">{person.domain}</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
              Background &amp; Profile
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {person.bio}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
              Key Contributions &amp; Milestones
            </h4>
            <div className="space-y-2">
              {person.notableImpact.map((item, i) => (
                <div
                  key={i}
                  className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800 text-xs text-zinc-300 flex items-center gap-2.5"
                >
                  <Award className="w-4 h-4 text-cyan-400 shrink-0" />
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
