import React, { useState } from 'react';
import {
  Globe,
  TrendingUp,
  Briefcase,
  Cpu,
  Atom,
  Trophy,
  Film,
  Leaf,
  MapPin,
  Flame,
  Check,
} from 'lucide-react';

export const CATEGORIES = [
  { id: 'Top Stories', label: 'Top Stories', icon: Flame },
  { id: 'India', label: 'India', icon: Globe },
  { id: 'World', label: 'World', icon: Globe },
  { id: 'Business', label: 'Business', icon: Briefcase },
  { id: 'Technology', label: 'Technology', icon: Cpu },
  { id: 'Science', label: 'Science', icon: Atom },
  { id: 'Sports', label: 'Sports', icon: Trophy },
  { id: 'Entertainment', label: 'Entertainment', icon: Film },
  { id: 'Environment', label: 'Environment', icon: Leaf },
  { id: 'Local', label: 'Local', icon: MapPin },
] as const;

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  localLocation: string;
  onUpdateLocalLocation: (loc: string) => void;
  isSearchActive: boolean;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  localLocation,
  onUpdateLocalLocation,
  isSearchActive,
}) => {
  const [editingLocation, setEditingLocation] = useState(false);
  const [tempLocation, setTempLocation] = useState(localLocation);

  const handleSaveLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempLocation.trim()) {
      onUpdateLocalLocation(tempLocation.trim());
      setEditingLocation(false);
    }
  };

  return (
    <div className="mb-6">
      {/* Category Pills / Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-stone-200">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = !isSearchActive && activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200/80'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-stone-500'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Local Location Configuration if 'Local' is selected */}
      {!isSearchActive && activeCategory === 'Local' && (
        <div className="mt-3 p-3 bg-amber-50/80 border border-amber-200 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-amber-900">
            <MapPin className="w-4 h-4 text-amber-700" />
            <span className="font-semibold">Local Region:</span>
            {!editingLocation ? (
              <span className="font-mono bg-white px-2 py-0.5 rounded border border-amber-300">
                {localLocation || 'Default (Community News)'}
              </span>
            ) : null}
          </div>

          {editingLocation ? (
            <form onSubmit={handleSaveLocation} className="flex items-center gap-2">
              <input
                type="text"
                value={tempLocation}
                onChange={(e) => setTempLocation(e.target.value)}
                placeholder="Enter city or state (e.g. San Francisco, CA)"
                className="px-2.5 py-1 text-xs border border-amber-400 rounded bg-white text-stone-900 focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="px-2.5 py-1 bg-amber-800 hover:bg-amber-900 text-white rounded font-medium flex items-center gap-1"
              >
                <Check className="w-3 h-3" />
                <span>Set</span>
              </button>
              <button
                type="button"
                onClick={() => setEditingLocation(false)}
                className="px-2 py-1 text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>
            </form>
          ) : (
            <button
              onClick={() => setEditingLocation(true)}
              className="text-amber-800 hover:text-amber-950 font-medium underline cursor-pointer"
            >
              Change Location
            </button>
          )}
        </div>
      )}
    </div>
  );
};
