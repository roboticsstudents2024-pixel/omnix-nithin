/**
 * Shared Type Definitions for Live Verified News
 */

export interface VerifiedSource {
  publisher: string;
  url: string;
  title?: string;
}

export interface VerificationDetails {
  urlChecked: boolean;
  publisherMatched: boolean;
  headlineVerified: boolean;
  dateVerified: boolean;
  neverExampleCom: boolean;
}

export interface NewsArticle {
  id: string;
  headline: string;
  publisher: string;
  url: string;
  sourceBaseUrl: string;
  pubDate: string;
  pubDateRaw: string;
  snippet: string;
  aiSummary: string;
  imageUrl?: string;
  multipleSources: VerifiedSource[];
  isVerified: boolean;
  verificationDetails: VerificationDetails;
}

export interface NewsApiResponse {
  success: boolean;
  category?: string;
  query?: string;
  lastUpdated: string;
  count: number;
  articles: NewsArticle[];
  error?: string;
}

export interface SystemStatus {
  configured: boolean;
  active: boolean;
  provider: string;
  aiEnabled: boolean;
  timestamp: string;
  statusMessage: string;
}
