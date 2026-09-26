import React from 'react';
import {
  Flame,
  Globe,
  Globe2,
  Briefcase,
  Cpu,
  Atom,
  Trophy,
  Film,
} from 'lucide-react';

export const NEWS_CATEGORIES = [
  { id: 'Top Stories', label: 'Top Stories', icon: Flame },
  { id: 'India', label: 'India', icon: Globe },
  { id: 'World', label: 'World', icon: Globe2 },
  { id: 'Business', label: 'Business', icon: Briefcase },
  { id: 'Technology', label: 'Technology', icon: Cpu },
  { id: 'Science', label: 'Science', icon: Atom },
  { id: 'Sports', label: 'Sports', icon: Trophy },
  { id: 'Entertainment', label: 'Entertainment', icon: Film },
] as const;

interface NewsCategoryNavProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  isDark: boolean;
}

export const NewsCategoryNav: React.FC<NewsCategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  isDark,
}) => {
  return (
    <div className="mb-6">
      {/* Horizontal Category Bar with mobile scrolling */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800/40">
        {NEWS_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold scale-102'
                  : isDark
                  ? 'bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800/80'
                  : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/80 shadow-xs'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${
                  isActive ? 'text-slate-950' : 'text-cyan-500'
                }`}
              />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
