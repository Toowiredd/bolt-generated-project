import { ConversationData, AnalyticsReport } from '../config/types.js';
import { config } from '../config/config.js';

interface ValTownResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export class ValTownService {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor() {
    this.baseUrl = config.valtown.endpoint;
    this.apiKey = config.valtown.apiKey;
  }

  private async fetchWithAuth<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ValTownResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data as T };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async storeConversation(conversation: ConversationData): Promise<boolean> {
    const response = await this.fetchWithAuth<{ id: string }>('/conversations', {
      method: 'POST',
      body: JSON.stringify(conversation),
    });

    return response.success;
  }

  async batchStoreConversations(conversations: ConversationData[]): Promise<boolean> {
    const response = await this.fetchWithAuth<{ count: number }>('/conversations/batch', {
      method: 'POST',
      body: JSON.stringify({ conversations }),
    });

    return response.success;
  }

  async getConversation(id: string): Promise<ConversationData | null> {
    const response = await this.fetchWithAuth<ConversationData>(`/conversations/${id}`);
    return response.success && response.data ? response.data : null;
  }

  async getConversations(
    startDate?: Date,
    endDate?: Date,
    limit = 100,
    offset = 0
  ): Promise<ConversationData[]> {
    const queryParams = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
      ...(startDate && { start: startDate.toISOString() }),
      ...(endDate && { end: endDate.toISOString() }),
    });

    const response = await this.fetchWithAuth<ConversationData[]>(
      `/conversations?${queryParams}`
    );

    return response.success && response.data ? response.data : [];
  }

  async generateAnalytics(
    startDate: Date,
    endDate: Date
  ): Promise<AnalyticsReport | null> {
    const response = await this.fetchWithAuth<AnalyticsReport>('/analytics/generate', {
      method: 'POST',
      body: JSON.stringify({ startDate, endDate }),
    });

    return response.success && response.data ? response.data : null;
  }

  async getStoredAnalytics(
    timeframe: 'day' | 'week' | 'month'
  ): Promise<AnalyticsReport | null> {
    const response = await this.fetchWithAuth<AnalyticsReport>(
      `/analytics/${timeframe}`
    );

    return response.success && response.data ? response.data : null;
  }
}
