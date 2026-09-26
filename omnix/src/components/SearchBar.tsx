import React, { useState } from 'react';
import { Search, X, Sparkles } from 'lucide-react';

interface SearchBarProps {
  currentQuery: string;
  onSearch: (query: string) => void;
  onClear: () => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  currentQuery,
  onSearch,
  onClear,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState(currentQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleQuickTopic = (topic: string) => {
    setSearchTerm(topic);
    onSearch(topic);
  };

  const handleClear = () => {
    setSearchTerm('');
    onClear();
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 mb-6">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search real live news or topic (e.g. Apple, India, tomato prices)..."
            className="w-full pl-10 pr-9 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white transition"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading || !searchTerm.trim()}
          className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-sm font-semibold transition disabled:opacity-50 cursor-pointer shadow-sm"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Suggested Quick Topics from User Requirements */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-stone-500 font-medium flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Real live queries:</span>
        </span>
        {[
          { label: 'Apple', q: 'Apple' },
          { label: 'India', q: 'India' },
          { label: 'tomato prices', q: 'tomato prices' },
          { label: 'Artificial Intelligence', q: 'Artificial Intelligence' },
          { label: 'Space & Astronomy', q: 'Space NASA' },
          { label: 'Semiconductors', q: 'Semiconductors chips' },
        ].map((item) => (
          <button
            key={item.q}
            type="button"
            onClick={() => handleQuickTopic(item.q)}
            className={`px-2.5 py-1 rounded-full border text-xs transition cursor-pointer ${
              currentQuery.toLowerCase() === item.q.toLowerCase()
                ? 'bg-stone-900 text-white border-stone-900 font-medium'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
