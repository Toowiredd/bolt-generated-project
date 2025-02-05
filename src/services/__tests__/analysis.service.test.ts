import { AnalysisService } from '../analysis.service.js';
import { ConversationData } from '../../config/types.js';

describe('AnalysisService', () => {
  let analysisService: AnalysisService;

  beforeEach(() => {
    analysisService = new AnalysisService();
  });

  describe('analyzeConversation', () => {
    const mockConversation: ConversationData = {
      id: '123',
      timestamp: new Date(),
      content: 'This is a test conversation about AI and machine learning. The sentiment is positive!',
      metadata: {
        source: 'test',
        type: 'chat'
      }
    };

    it('should analyze conversation and return topics, sentiment, and entities', async () => {
      const result = await analysisService.analyzeConversation(mockConversation);

      expect(result.analysis).toBeDefined();
      expect(result.analysis?.topics).toBeInstanceOf(Array);
      expect(result.analysis?.sentiment).toBeGreaterThan(-1);
      expect(result.analysis?.entities).toBeInstanceOf(Array);
    });

    it('should handle sensitive information appropriately', async () => {
      const sensitiveConversation: ConversationData = {
        id: '124',
        timestamp: new Date(),
        content: 'My email is test@example.com and phone is 123-456-7890',
        metadata: {
          source: 'test',
          type: 'chat'
        }
      };

      const result = await analysisService.analyzeConversation(sensitiveConversation);

      expect(result.analysis).toBeDefined();
      expect(result.content).not.toContain('test@example.com');
      expect(result.content).not.toContain('123-456-7890');
      expect(result.content).toContain('[EMAIL]');
      expect(result.content).toContain('[PHONE]');
    });

    it('should generate summary for long conversations', async () => {
      const longConversation: ConversationData = {
        id: '125',
        timestamp: new Date(),
        content: `
          This is a very long conversation about multiple topics.
          It contains information about artificial intelligence and its applications.
          The conversation discusses machine learning algorithms and their implementations.
          Natural language processing is another topic that comes up frequently.
          The discussion also covers deep learning and neural networks.
          There are mentions of various AI frameworks and tools.
          The participants seem very knowledgeable about the subject matter.
          They share interesting insights about the future of AI technology.
          The conversation concludes with thoughts on ethical AI development.
        `,
        metadata: {
          source: 'test',
          type: 'chat'
        }
      };

      const result = await analysisService.analyzeConversation(longConversation);

      expect(result.analysis?.summary).toBeDefined();
      expect(result.analysis?.summary?.length).toBeLessThan(longConversation.content.length);
    });
  });

  describe('batchAnalyze', () => {
    it('should analyze multiple conversations', async () => {
      const conversations: ConversationData[] = [
        {
          id: '126',
          timestamp: new Date(),
          content: 'First test conversation',
          metadata: {
            source: 'test',
            type: 'chat'
          }
        },
        {
          id: '127',
          timestamp: new Date(),
          content: 'Second test conversation',
          metadata: {
            source: 'test',
            type: 'chat'
          }
        }
      ];

      const results = await analysisService.batchAnalyze(conversations);

      expect(results).toHaveLength(2);
      results.forEach(result => {
        expect(result.analysis).toBeDefined();
        expect(result.analysis?.topics).toBeInstanceOf(Array);
        expect(result.analysis?.sentiment).toBeDefined();
      });
    });
  });
});
