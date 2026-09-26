import React, { useState } from 'react';
import {
  MapPin,
  Globe,
  Compass,
  Building,
  ExternalLink,
  ChevronRight,
  Search,
} from 'lucide-react';

interface PlaceItem {
  id: string;
  name: string;
  country: string;
  region: string;
  population: string;
  keySpecialty: string;
  summary: string;
}

const PLACES_DATA: PlaceItem[] = [
  {
    id: 'sf',
    name: 'San Francisco & Silicon Valley',
    country: 'United States',
    region: 'North America',
    population: '~$3.3M Metro Core',
    keySpecialty: 'Global epicenter of generative AI startups, venture capital, and cloud computing.',
    summary: 'Home to leading AI laboratories, OpenAI, Anthropic, Apple, Meta, Google, and Nvidia.',
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    region: 'East Asia',
    population: '~$37.4M Metro',
    keySpecialty: 'Advanced robotics, photonics, next-gen high-speed transit and semiconductor equipment.',
    summary: 'The world largest metropolitan area and home to foundational electronics and robotics giants.',
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    country: 'India',
    region: 'South Asia',
    population: '~$14.0M',
    keySpecialty: 'India primary tech hub, software exports, aerospace ISRO headquarters, and unicorn ecosystem.',
    summary: 'Fastest growing innovation hub hosting deep tech labs and space exploration programs.',
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    region: 'Western Europe',
    population: '~$9.7M',
    keySpecialty: 'Global fintech, AI research (Google DeepMind HQ), and international financial architecture.',
    summary: 'Premier global crossroads connecting European tech capital, academic research, and policy.',
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    region: 'Southeast Asia',
    population: '~$5.9M',
    keySpecialty: 'Semiconductor manufacturing, smart nation digital infrastructure, and maritime logistics.',
    summary: 'Strategic global trade nexus and premier gateway for Southeast Asian technological investment.',
  },
];

interface PlacesViewProps {
  onSearchPlaceNews: (placeName: string) => void;
}

export const PlacesView: React.FC<PlacesViewProps> = ({ onSearchPlaceNews }) => {
  const [selectedId, setSelectedId] = useState('sf');
  const [query, setQuery] = useState('');

  const place = PLACES_DATA.find((p) => p.id === selectedId) || PLACES_DATA[0];

  const filtered = PLACES_DATA.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.country.toLowerCase().includes(query.toLowerCase()) ||
      p.region.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-serif">Places &amp; Geospatial Intelligence</h2>
            <p className="text-xs text-zinc-400">
              Global innovation hubs, regional data, and direct verified news linkages
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search place or country..."
            className="w-full pl-9 pr-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Place List */}
        <div className="space-y-2 lg:col-span-1">
          {filtered.map((p) => {
            const isSelected = p.id === place.id;
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
                  <p className="text-xs text-zinc-400 mt-0.5">{p.country} · {p.region}</p>
                </div>
                <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-zinc-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Place Details */}
        <div className="lg:col-span-2 p-6 bg-zinc-900/90 border border-zinc-800 rounded-3xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <h3 className="text-2xl font-bold font-serif text-white">{place.name}</h3>
              <p className="text-xs text-cyan-400 font-mono mt-0.5">{place.country} ({place.region})</p>
            </div>

            <button
              type="button"
              onClick={() => onSearchPlaceNews(place.name)}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-xl text-xs transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              <span>View Regional News</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 font-mono text-[11px] uppercase">Metro Population:</span>
              <p className="font-bold text-white font-mono mt-0.5">{place.population}</p>
            </div>
            <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 font-mono text-[11px] uppercase">Regional Role:</span>
              <p className="font-bold text-white mt-0.5">{place.region}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
              Hub Strategic Specialty
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {place.keySpecialty}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
              Regional Ecosystem Summary
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {place.summary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
