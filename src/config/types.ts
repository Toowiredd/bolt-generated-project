export interface ServerConfig {
  port: number;
  nodeEnv: string;
  jwtSecret: string;
  rateLimits: {
    windowMs: number;
    maxRequests: number;
  };
  valtown: {
    apiKey: string;
    endpoint: string;
  };
}

export interface ConversationData {
  id: string;
  timestamp: Date;
  content: string;
  metadata: {
    source: string;
    type: string;
    [key: string]: any;
  };
  analysis?: {
    topics: string[];
    sentiment: number;
    entities: string[];
    summary?: string;
  };
}

export interface Term {
  term: string;
  tfidf: number;
}

export interface SentenceScore {
  sentence: string;
  score: number;
}

export interface AnalyticsReport {
  timeframe: {
    start: Date;
    end: Date;
  };
  metrics: {
    totalConversations: number;
    uniqueTopics: string[];
    sentimentDistribution: {
      positive: number;
      neutral: number;
      negative: number;
    };
    topEntities: Array<{
      entity: string;
      count: number;
    }>;
  };
  trends?: {
    topicTrends: Array<{
      topic: string;
      trend: number;
    }>;
    sentimentTrend: number[];
  };
}

export interface UserAuth {
  id: string;
  role: 'admin' | 'analyst' | 'viewer';
  permissions: string[];
}
