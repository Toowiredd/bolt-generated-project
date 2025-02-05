import { ValTownService } from '../valtown.service.js';
import { ConversationData, AnalyticsReport } from '../../config/types.js';

// Mock the global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('ValTownService', () => {
  let valTownService: ValTownService;

  beforeEach(() => {
    valTownService = new ValTownService();
    jest.clearAllMocks();
  });

  describe('storeConversation', () => {
    const mockConversation: ConversationData = {
      id: '123',
      timestamp: new Date(),
      content: 'Test conversation',
      metadata: {
        source: 'test',
        type: 'chat'
      }
    };

    it('should successfully store a conversation', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ id: '123' })
      });

      const result = await valTownService.storeConversation(mockConversation);

      expect(result).toBe(true);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/conversations'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(mockConversation)
        })
      );
    });

    it('should handle storage failure', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Storage failed'));

      const result = await valTownService.storeConversation(mockConversation);

      expect(result).toBe(false);
    });
  });

  describe('getConversation', () => {
    it('should retrieve a conversation by id', async () => {
      const mockResponse: ConversationData = {
        id: '123',
        timestamp: new Date(),
        content: 'Test conversation',
        metadata: {
          source: 'test',
          type: 'chat'
        }
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await valTownService.getConversation('123');

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/conversations/123'),
        expect.any(Object)
      );
    });

    it('should return null for non-existent conversation', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      const result = await valTownService.getConversation('999');

      expect(result).toBeNull();
    });
  });

  describe('generateAnalytics', () => {
    const mockStartDate = new Date('2024-01-01');
    const mockEndDate = new Date('2024-01-31');

    it('should generate analytics report', async () => {
      const mockReport: AnalyticsReport = {
        timeframe: {
          start: mockStartDate,
          end: mockEndDate
        },
        metrics: {
          totalConversations: 100,
          uniqueTopics: ['AI', 'ML'],
          sentimentDistribution: {
            positive: 60,
            neutral: 30,
            negative: 10
          },
          topEntities: [
            { entity: 'AI', count: 50 },
            { entity: 'ML', count: 30 }
          ]
        }
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockReport)
      });

      const result = await valTownService.generateAnalytics(mockStartDate, mockEndDate);

      expect(result).toEqual(mockReport);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/analytics/generate'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ startDate: mockStartDate, endDate: mockEndDate })
        })
      );
    });

    it('should handle analytics generation failure', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Analytics generation failed'));

      const result = await valTownService.generateAnalytics(mockStartDate, mockEndDate);

      expect(result).toBeNull();
    });
  });

  describe('getStoredAnalytics', () => {
    it('should retrieve stored analytics for timeframe', async () => {
      const mockReport: AnalyticsReport = {
        timeframe: {
          start: new Date(),
          end: new Date()
        },
        metrics: {
          totalConversations: 50,
          uniqueTopics: ['AI'],
          sentimentDistribution: {
            positive: 30,
            neutral: 15,
            negative: 5
          },
          topEntities: [
            { entity: 'AI', count: 25 }
          ]
        }
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockReport)
      });

      const result = await valTownService.getStoredAnalytics('day');

      expect(result).toEqual(mockReport);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/analytics/day'),
        expect.any(Object)
      );
    });
  });
});
