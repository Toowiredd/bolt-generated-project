import { ConversationData, AnalyticsReport } from '../config/types.js';

// Val Town function for conversation storage and analytics
export async function conversationStorage(req: Request): Promise<Response> {
  const { blob, json } = await import('https://esm.town/v/std');
  const url = new URL(req.url);
  const path = url.pathname;

  // Storage keys
  const CONVERSATIONS_KEY = 'ai_conversations';
  const ANALYTICS_KEY = 'conversation_analytics';

  // Helper functions
  const getConversations = async (): Promise<ConversationData[]> => {
    try {
      const data = await blob.get(CONVERSATIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  const saveConversations = async (conversations: ConversationData[]): Promise<boolean> => {
    try {
      await blob.set(CONVERSATIONS_KEY, JSON.stringify(conversations));
      return true;
    } catch (error) {
      console.error('Error saving conversations:', error);
      return false;
    }
  };

  const generateAnalytics = async (
    conversations: ConversationData[],
    startDate?: string,
    endDate?: string
  ): Promise<AnalyticsReport> => {
    const start = startDate ? new Date(startDate) : new Date(0);
    const end = endDate ? new Date(endDate) : new Date();

    const filteredConversations = conversations.filter(conv => {
      const timestamp = new Date(conv.timestamp);
      return timestamp >= start && timestamp <= end;
    });

    // Collect metrics
    const topics = new Set<string>();
    const entities = new Map<string, number>();
    const sentiments = {
      positive: 0,
      neutral: 0,
      negative: 0
    };

    filteredConversations.forEach(conv => {
      // Topics
      conv.analysis?.topics.forEach(topic => topics.add(topic));

      // Entities
      conv.analysis?.entities.forEach(entity => {
        entities.set(entity, (entities.get(entity) || 0) + 1);
      });

      // Sentiment
      const sentiment = conv.analysis?.sentiment || 0;
      if (sentiment > 0.3) sentiments.positive++;
      else if (sentiment < -0.3) sentiments.negative++;
      else sentiments.neutral++;
    });

    return {
      timeframe: { start, end },
      metrics: {
        totalConversations: filteredConversations.length,
        uniqueTopics: Array.from(topics),
        sentimentDistribution: sentiments,
        topEntities: Array.from(entities.entries())
          .map(([entity, count]) => ({ entity, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)
      }
    };
  };

  try {
    switch (path) {
      case '/api/conversations': {
        if (req.method === 'POST') {
          const conversation = await req.json();
          const conversations = await getConversations();
          conversations.push(conversation);

          const success = await saveConversations(conversations);
          return json({ success, id: conversation.id });
        }

        if (req.method === 'GET') {
          const conversations = await getConversations();
          const { start, end, limit = '100', offset = '0' } = Object.fromEntries(
            url.searchParams.entries()
          );

          let filtered = conversations;
          if (start || end) {
            const startDate = start ? new Date(start) : new Date(0);
            const endDate = end ? new Date(end) : new Date();

            filtered = conversations.filter(conv => {
              const timestamp = new Date(conv.timestamp);
              return timestamp >= startDate && timestamp <= endDate;
            });
          }

          const limitNum = parseInt(limit);
          const offsetNum = parseInt(offset);
          const paged = filtered.slice(offsetNum, offsetNum + limitNum);

          return json({ success: true, data: paged });
        }

        return json({ error: 'Method not allowed' }, { status: 405 });
      }

      case '/api/analytics/generate': {
        if (req.method !== 'POST') {
          return json({ error: 'Method not allowed' }, { status: 405 });
        }

        const { startDate, endDate } = await req.json();
        const conversations = await getConversations();
        const report = await generateAnalytics(conversations, startDate, endDate);

        await blob.set(
          ANALYTICS_KEY,
          JSON.stringify({
            timestamp: new Date().toISOString(),
            report
          })
        );

        return json({ success: true, data: report });
      }

      case '/api/analytics': {
        if (req.method !== 'GET') {
          return json({ error: 'Method not allowed' }, { status: 405 });
        }

        const stored = await blob.get(ANALYTICS_KEY);
        if (!stored) {
          return json({ error: 'No analytics available' }, { status: 404 });
        }

        const { timestamp, report } = JSON.parse(stored);
        return json({ success: true, data: report, timestamp });
      }

      default:
        return json({ error: 'Not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error:', error);
    return json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Example usage:
// curl -X POST -H "Content-Type: application/json" -d '{"id":"123","content":"test"}' https://api.val.town/v1/conversations
// curl https://api.val.town/v1/analytics?timeframe=day

export const handler = conversationStorage;
