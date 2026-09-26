import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  RefreshCw,
  Search,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import type { NewsArticle } from '../../types';
import { NewsHero } from './NewsHero';
import { FeaturedStory } from './FeaturedStory';
import { OmnixBriefing } from './OmnixBriefing';
import { NewsCategoryNav } from './NewsCategoryNav';
import { NewsFilters } from './NewsFilters';
import { ModernNewsCard } from './ModernNewsCard';
import { SourceComparisonModal } from './SourceComparisonModal';

interface NewsPageViewProps {
  articles: NewsArticle[];
  isLoading: boolean;
  error: string | null;
  category: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearch: (query: string) => void;
  onRefresh: () => void;
  isDark: boolean;
  onVoiceSearch?: () => void;
}

export const NewsPageView: React.FC<NewsPageViewProps> = ({
  articles,
  isLoading,
  error,
  category,
  onSelectCategory,
  searchQuery,
  onSearch,
  onRefresh,
  isDark,
  onVoiceSearch,
}) => {
  // Secondary Filters
  const [selectedPublisher, setSelectedPublisher] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [multiSourceOnly, setMultiSourceOnly] = useState<boolean>(false);

  // Active comparison modal story
  const [comparisonStory, setComparisonStory] = useState<NewsArticle | null>(null);

  // Unique publishers list from current articles
  const availablePublishers = useMemo(() => {
    const pubSet = new Set<string>();
    articles.forEach((a) => {
      if (a.publisher) pubSet.add(a.publisher);
    });
    return Array.from(pubSet).sort();
  }, [articles]);

  // Filtered articles list
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      // Multi-source check
      if (multiSourceOnly && (!art.multipleSources || art.multipleSources.length < 2)) {
        return false;
      }
      // Publisher check
      if (selectedPublisher !== 'all' && art.publisher !== selectedPublisher) {
        return false;
      }
      // Date filter check
      if (dateFilter !== 'all') {
        const timestamp = Date.parse(art.pubDate);
        if (!isNaN(timestamp)) {
          const now = Date.now();
          const diffHours = (now - timestamp) / (1000 * 60 * 60);
          if (dateFilter === 'today' && diffHours > 24) return false;
          if (dateFilter === 'week' && diffHours > 24 * 7) return false;
        }
      }
      return true;
    });
  }, [articles, multiSourceOnly, selectedPublisher, dateFilter]);

  // Featured article (first article) & remaining grid articles
  const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
  const gridArticles = filteredArticles.length > 1 ? filteredArticles.slice(1) : [];

  const handleResetFilters = () => {
    setSelectedPublisher('all');
    setDateFilter('all');
    setMultiSourceOnly(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. NEWS HERO SECTION */}
      <NewsHero
        onSearch={onSearch}
        currentQuery={searchQuery}
        onSelectTopic={onSearch}
        isLoading={isLoading}
        isDark={isDark}
        onVoiceSearch={onVoiceSearch}
      />

      {/* 2. CATEGORY NAVIGATION */}
      <NewsCategoryNav
        activeCategory={category}
        onSelectCategory={(cat) => {
          onSelectCategory(cat);
          handleResetFilters();
        }}
        isDark={isDark}
      />

      {/* 3. AI NEWS BRIEFING (Compact neutral summary of current retrieved articles) */}
      {!isLoading && !error && articles.length > 0 && !searchQuery && (
        <OmnixBriefing articles={articles} isDark={isDark} />
      )}

      {/* 4. FEATURED STORY (Large card with genuine data only) */}
      {!isLoading && !error && featuredArticle && !searchQuery && (
        <FeaturedStory
          article={featuredArticle}
          onOpenComparison={(art) => setComparisonStory(art)}
          isDark={isDark}
        />
      )}

      {/* 5. SECONDARY FILTERS ROW */}
      {!error && (articles.length > 0 || isLoading) && (
        <NewsFilters
          availablePublishers={availablePublishers}
          selectedPublisher={selectedPublisher}
          onSelectPublisher={setSelectedPublisher}
          dateFilter={dateFilter}
          onSelectDateFilter={setDateFilter}
          multiSourceOnly={multiSourceOnly}
          onToggleMultiSource={setMultiSourceOnly}
          articleCount={searchQuery ? filteredArticles.length : gridArticles.length}
          onResetFilters={handleResetFilters}
          isDark={isDark}
        />
      )}

      {/* 6. LOADING STATE (Skeletons) */}
      {isLoading && articles.length === 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
          {[1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 animate-pulse space-y-4 border ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className={`h-4 rounded w-1/4 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
                <div className={`h-3 rounded w-1/6 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
              </div>
              <div className={`h-6 rounded w-4/5 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
              <div className={`h-16 rounded ${isDark ? 'bg-slate-850' : 'bg-slate-100'}`}></div>
              <div className={`h-4 rounded w-1/3 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
            </div>
          ))}
        </div>
      )}

      {/* 7. FAIL-SAFE ERROR STATE */}
      {error && (
        <div
          className={`my-10 p-8 rounded-3xl border text-center max-w-lg mx-auto shadow-xl ${
            isDark
              ? 'bg-slate-900 border-rose-900/70 text-slate-200'
              : 'bg-white border-rose-200 text-slate-800'
          }`}
        >
          <div className="w-12 h-12 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-3 border border-rose-500/20">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-base sm:text-lg font-bold font-serif mb-2">
            Live news is temporarily unavailable. Please try again.
          </h3>
          <p className="text-xs text-slate-400 mb-5 leading-relaxed">
            Our automated ingestion pipeline rejected placeholder or unreachable feeds. We refuse to serve mock or fabricated news.
          </p>
          <button
            type="button"
            onClick={onRefresh}
            className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs inline-flex items-center gap-2 cursor-pointer shadow-md transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Feed Retrieval</span>
          </button>
        </div>
      )}

      {/* 8. EMPTY FILTER STATE */}
      {!isLoading && !error && filteredArticles.length === 0 && (
        <div
          className={`my-12 p-8 rounded-3xl border text-center max-w-md mx-auto shadow-sm ${
            isDark
              ? 'bg-slate-900/50 border-slate-800 text-slate-300'
              : 'bg-white border-slate-200 text-slate-700'
          }`}
        >
          <Search className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold font-serif mb-1">
            No matching articles found
          </h3>
          <p className="text-xs text-slate-400 mb-5 leading-relaxed">
            No live verified stories met your active filters. Try resetting your filter selections or searching a broader term.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs cursor-pointer shadow-md transition"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* 9. NEWS ARTICLE GRID (2 columns desktop, 1 column mobile) */}
      {!error && (searchQuery ? filteredArticles : gridArticles).length > 0 && (
        <div>
          {searchQuery ? (
            <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-cyan-500 font-mono uppercase tracking-wider">
                Results for: "{searchQuery}"
              </span>
              <button
                type="button"
                onClick={() => onSearch('')}
                className="underline hover:text-cyan-400 cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono font-semibold uppercase tracking-wider text-cyan-500">
                Latest {category} Dispatches
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {(searchQuery ? filteredArticles : gridArticles).map((article) => (
              <ModernNewsCard
                key={article.id}
                article={article}
                onOpenComparison={(art) => setComparisonStory(art)}
                isDark={isDark}
              />
            ))}
          </div>
        </div>
      )}

      {/* 10. MULTI-SOURCE COMPARISON MODAL */}
      <SourceComparisonModal
        article={comparisonStory}
        onClose={() => setComparisonStory(null)}
        isDark={isDark}
      />
    </div>
  );
};
