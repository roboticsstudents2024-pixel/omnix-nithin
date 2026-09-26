/**
 * Live News Retrieval, Source Verification & AI Summarization Service
 * Strictly retrieves authentic news from live feeds.
 * Absolutely NO mock data, NO placeholder headlines, NO example.com URLs.
 */

import { GoogleGenAI } from '@google/genai';

export interface VerifiedSource {
  publisher: string;
  url: string;
  title?: string;
}

export interface NewsArticle {
  id: string;
  headline: string;
  publisher: string;
  url: string;
  sourceBaseUrl: string;
  pubDate: string; // ISO 8601
  pubDateRaw: string;
  snippet: string;
  aiSummary: string;
  imageUrl?: string;
  multipleSources: VerifiedSource[];
  isVerified: boolean;
  verificationDetails: {
    urlChecked: boolean;
    publisherMatched: boolean;
    headlineVerified: boolean;
    dateVerified: boolean;
    neverExampleCom: boolean;
  };
}

export interface NewsResponse {
  success: boolean;
  category?: string;
  query?: string;
  lastUpdated: string;
  count: number;
  articles: NewsArticle[];
  error?: string;
}

// Category feed URLs
const CATEGORY_MAP: Record<string, string> = {
  'Top Stories': 'https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en',
  'India': 'https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en',
  'World': 'https://news.google.com/rss/headlines/section/topic/WORLD?hl=en-US&gl=US&ceid=US:en',
  'Business': 'https://news.google.com/rss/headlines/section/topic/BUSINESS?hl=en-US&gl=US&ceid=US:en',
  'Technology': 'https://news.google.com/rss/headlines/section/topic/TECHNOLOGY?hl=en-US&gl=US&ceid=US:en',
  'Science': 'https://news.google.com/rss/headlines/section/topic/SCIENCE?hl=en-US&gl=US&ceid=US:en',
  'Sports': 'https://news.google.com/rss/headlines/section/topic/SPORTS?hl=en-US&gl=US&ceid=US:en',
  'Entertainment': 'https://news.google.com/rss/headlines/section/topic/ENTERTAINMENT?hl=en-US&gl=US&ceid=US:en',
  'Environment': 'https://news.google.com/rss/search?q=environment+climate+clean+energy&hl=en-US&gl=US&ceid=US:en',
  'Local': 'https://news.google.com/rss/search?q=city+community+local+news&hl=en-US&gl=US&ceid=US:en',
};

// Initialize Gemini SDK if API key is provided
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI();
  } catch (err) {
    console.error('Failed to initialize Gemini AI client:', err);
  }
}

/**
 * Decodes HTML entities commonly found in RSS feeds
 */
function decodeHtml(html: string): string {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

/**
 * Strips HTML tags and collapses spaces
 */
function stripHtml(html: string): string {
  return decodeHtml(html)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Strict verification check against placeholder/mock artifacts
 */
function verifySourceAndContent(
  headline: string,
  publisher: string,
  url: string,
  pubDate: string
): { isValid: boolean; details: NewsArticle['verificationDetails'] } {
  const details = {
    urlChecked: false,
    publisherMatched: false,
    headlineVerified: false,
    dateVerified: false,
    neverExampleCom: false,
  };

  // 1. URL check: Must exist, start with http/https
  if (url && (url.startsWith('https://') || url.startsWith('http://'))) {
    details.urlChecked = true;
  }

  // 2. Strict anti-mock check: Never allow example.com or placeholder domains
  const forbiddenDomains = ['example.com', 'placeholder', 'dummy', 'test.com', 'fake'];
  const isForbiddenUrl = forbiddenDomains.some((d) => url.toLowerCase().includes(d));
  if (!isForbiddenUrl && details.urlChecked) {
    details.neverExampleCom = true;
  }

  // 3. Publisher match: Non-empty, not generic placeholder
  const forbiddenPublishers = ['unknown', 'placeholder', 'fake news', 'generic'];
  if (
    publisher &&
    publisher.trim().length > 0 &&
    !forbiddenPublishers.includes(publisher.toLowerCase().trim())
  ) {
    details.publisherMatched = true;
  }

  // 4. Headline check: Non-empty, not generic fabricated title
  const forbiddenHeadlines = [
    'major developments in world events',
    'breaking news placeholder',
    'lorem ipsum',
    'sample news headline',
  ];
  if (
    headline &&
    headline.trim().length >= 8 &&
    !forbiddenHeadlines.includes(headline.toLowerCase().trim())
  ) {
    details.headlineVerified = true;
  }

  // 5. Date verification: Must parse into a valid timestamp
  if (pubDate) {
    const timestamp = Date.parse(pubDate);
    if (!isNaN(timestamp)) {
      details.dateVerified = true;
    }
  }

  const isValid =
    details.urlChecked &&
    details.neverExampleCom &&
    details.publisherMatched &&
    details.headlineVerified &&
    details.dateVerified;

  return { isValid, details };
}

/**
 * Parses multiple independent sources from the Google News RSS description HTML
 */
function extractMultipleSources(descriptionHtml: string, primaryPublisher: string, primaryUrl: string): VerifiedSource[] {
  const sources: VerifiedSource[] = [];
  const seenUrls = new Set<string>();

  if (primaryUrl) {
    seenUrls.add(primaryUrl);
  }

  const unescaped = decodeHtml(descriptionHtml);
  // Matches list items with links and publisher font tag:
  // <li><a href="URL">Title</a>&nbsp;&nbsp;<font color="#6f6f6f">Publisher</font></li>
  const liRegex = /<li\b[^>]*>(?:<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>)?([\s\S]*?)<\/li>/gi;
  let match;

  while ((match = liRegex.exec(unescaped)) !== null) {
    const url = match[1]?.trim();
    const title = stripHtml(match[2] || '');
    let pub = stripHtml(match[3] || '');

    // Sometimes publisher is within font or span
    pub = pub.replace(/&nbsp;/g, ' ').trim();
    if (!pub && title) {
      // Check if publisher is separated by hyphen in title
      const parts = title.split(' - ');
      if (parts.length > 1) {
        pub = parts[parts.length - 1].trim();
      }
    }

    if (url && pub && !seenUrls.has(url) && !url.includes('example.com')) {
      seenUrls.add(url);
      sources.push({
        publisher: pub,
        url,
        title: title || undefined,
      });
    }
  }

  return sources;
}

// Cache for AI summaries to avoid duplicate LLM calls
const summaryCache = new Map<string, string>();

/**
 * AI Summarizer strictly grounded in retrieved facts
 */
export async function generateFactualAISummary(
  headline: string,
  publisher: string,
  snippet: string,
  useAi: boolean = false
): Promise<string> {
  const cacheKey = `${publisher}:${headline}`;
  if (summaryCache.has(cacheKey)) {
    return summaryCache.get(cacheKey)!;
  }

  // If AI client is requested and available
  if (useAi && aiClient) {
    try {
      const prompt = `You are a strict, factual news summarizer. Summarize this real verified news story in 2 concise sentences based ONLY on the provided headline and source snippet.
STRICT RULE: Do NOT invent events, quotes, numbers, people, dates, or claims. Rely strictly on the given facts. If the information is brief, state only what is confirmed.

Headline: ${headline}
Publisher: ${publisher}
Source Context: ${snippet || 'Recent report from ' + publisher}

Concise AI Summary:`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
      });

      const summary = response.text?.trim();
      if (summary && summary.length > 10 && !summary.includes('I cannot')) {
        summaryCache.set(cacheKey, summary);
        return summary;
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.warn('AI summarization notice (falling back to direct source factual extraction):', errorMsg);
    }
  }

  // Factual deterministic extraction from retrieved snippet & headline
  let factualSummary = '';
  if (snippet && snippet.length > 20) {
    factualSummary = snippet;
  } else {
    factualSummary = `Verified report from ${publisher} covering: ${headline}`;
  }

  summaryCache.set(cacheKey, factualSummary);
  return factualSummary;
}

/**
 * Parses RSS XML into strongly-typed, source-verified NewsArticle objects
 */
async function parseNewsRss(xmlText: string): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = [];
  const rawItems = xmlText.split('<item>').slice(1);

  for (let i = 0; i < rawItems.length; i++) {
    const itemXml = rawItems[i];
    const endIdx = itemXml.indexOf('</item>');
    const item = endIdx !== -1 ? itemXml.slice(0, endIdx) : itemXml;

    // Extract title
    const titleMatch = item.match(/<title>([\s\S]*?)<\/title>/);
    const rawTitle = titleMatch ? stripHtml(titleMatch[1]) : '';

    // Extract link
    const linkMatch =
      item.match(/<link\/?>(.*?)(<\/link>|$)/) ||
      item.match(/<link>([\s\S]*?)<\/link>/) ||
      item.match(/<guid[^>]*>([\s\S]*?)<\/guid>/);
    const originalUrl = linkMatch ? linkMatch[1].trim() : '';

    // Extract pubDate
    const pubDateMatch = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    const rawPubDate = pubDateMatch ? pubDateMatch[1].trim() : '';

    // Extract source tag: <source url="...">Publisher</source>
    const sourceMatch = item.match(/<source\b[^>]*url="([^"]*)"[^>]*>([\s\S]*?)<\/source>/);
    const sourceBaseUrl = sourceMatch ? sourceMatch[1].trim() : '';
    let publisher = sourceMatch ? stripHtml(sourceMatch[2]) : '';

    // Extract description HTML for multiple sources and snippet
    const descMatch = item.match(/<description>([\s\S]*?)<\/description>/);
    const descriptionHtml = descMatch ? descMatch[1] : '';

    // Parse clean headline and fallback publisher
    let cleanHeadline = rawTitle;
    if (rawTitle.includes(' - ')) {
      const parts = rawTitle.split(' - ');
      if (!publisher && parts.length > 1) {
        publisher = parts[parts.length - 1].trim();
      }
      cleanHeadline = parts.slice(0, -1).join(' - ').trim();
    }

    if (!publisher && sourceBaseUrl) {
      try {
        const u = new URL(sourceBaseUrl);
        publisher = u.hostname.replace('www.', '');
      } catch {
        // Leave publisher empty if invalid
      }
    }

    // Clean snippet
    const snippet = stripHtml(descriptionHtml);

    // Verify source
    const { isValid, details } = verifySourceAndContent(
      cleanHeadline,
      publisher,
      originalUrl,
      rawPubDate
    );

    // Strict drop rule: If source verification fails, do not display the article!
    if (!isValid) {
      continue;
    }

    // Extract multiple sources if present
    const multipleSources = extractMultipleSources(descriptionHtml, publisher, originalUrl);

    // Publication Date parsing
    let isoDate = new Date().toISOString();
    try {
      const parsed = Date.parse(rawPubDate);
      if (!isNaN(parsed)) {
        isoDate = new Date(parsed).toISOString();
      }
    } catch {
      // Keep ISO timestamp
    }

    // Extract genuine article image if present
    const mediaMatch =
      item.match(/<media:content[^>]+url="([^">]+)"/i) ||
      item.match(/<enclosure[^>]+url="([^">]+)"[^>]+type="image\//i) ||
      item.match(/<img[^>]+src="([^">]+\.(?:jpg|jpeg|png|webp)[^">]*)"/i);
    const rawImage = mediaMatch ? mediaMatch[1] : undefined;
    const imageUrl = rawImage && (rawImage.startsWith('https://') || rawImage.startsWith('http://')) && !rawImage.includes('example.com')
      ? rawImage
      : undefined;

    articles.push({
      id: `article-${i}-${Date.now()}`,
      headline: cleanHeadline,
      publisher,
      url: originalUrl,
      sourceBaseUrl: sourceBaseUrl || originalUrl,
      pubDate: isoDate,
      pubDateRaw: rawPubDate,
      snippet,
      aiSummary: '', // will be populated
      imageUrl,
      multipleSources,
      isVerified: true,
      verificationDetails: details,
    });
  }

  // Populate factual summaries instantly for all verified articles
  const topArticles = articles.slice(0, 25);
  for (let idx = 0; idx < topArticles.length; idx++) {
    const art = topArticles[idx];
    art.aiSummary = await generateFactualAISummary(art.headline, art.publisher, art.snippet, false);
  }

  return topArticles;
}

/**
 * Fetches real news for a given category
 */
export async function getLiveNewsByCategory(category: string, location?: string): Promise<NewsResponse> {
  let feedUrl = CATEGORY_MAP[category] || CATEGORY_MAP['Top Stories'];

  // Handle Local category with user location or default
  if (category === 'Local') {
    const locQuery = location && location.trim().length > 0 ? location.trim() : 'local community news';
    feedUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(locQuery)}&hl=en-US&gl=US&ceid=US:en`;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(feedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'application/rss+xml, application/xml, text/xml',
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`News source responded with status ${res.status}`);
    }

    const xmlText = await res.text();
    const articles = await parseNewsRss(xmlText);

    return {
      success: true,
      category,
      lastUpdated: new Date().toISOString(),
      count: articles.length,
      articles,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Failed to fetch live news for category ${category}:`, message);
    return {
      success: false,
      category,
      lastUpdated: new Date().toISOString(),
      count: 0,
      articles: [],
      error: 'Live news is temporarily unavailable. Please try again.',
    };
  }
}

/**
 * Fetches real news for a search query
 */
export async function searchLiveNews(query: string): Promise<NewsResponse> {
  const cleanQ = query?.trim();
  if (!cleanQ) {
    return getLiveNewsByCategory('Top Stories');
  }

  // Live Google News Search
  const searchUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(cleanQ)}&hl=en-US&gl=US&ceid=US:en`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'application/rss+xml, application/xml, text/xml',
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`Search provider returned HTTP ${res.status}`);
    }

    const xmlText = await res.text();
    const articles = await parseNewsRss(xmlText);

    return {
      success: true,
      query: cleanQ,
      lastUpdated: new Date().toISOString(),
      count: articles.length,
      articles,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Failed to search live news for query "${cleanQ}":`, message);
    return {
      success: false,
      query: cleanQ,
      lastUpdated: new Date().toISOString(),
      count: 0,
      articles: [],
      error: 'Live news is temporarily unavailable. Please try again.',
    };
  }
}
