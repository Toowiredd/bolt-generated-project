import natural from 'natural';
import { ConversationData, SentenceScore, Term } from '../config/types.js';

// Initialize tokenizers
const sentenceTokenizer = new natural.SentenceTokenizer();

export class AnalysisService {
  private tokenizer: natural.WordTokenizer;
  private tfidf: natural.TfIdf;
  private sentiment: natural.SentimentAnalyzer;

  constructor() {
    this.tokenizer = new natural.WordTokenizer();
    this.tfidf = new natural.TfIdf();
    this.sentiment = new natural.SentimentAnalyzer(
      'English',
      natural.PorterStemmer,
      'afinn'
    );
  }

  private sanitizeText(text: string): string {
    // Remove sensitive patterns (emails, phone numbers, etc.)
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const phonePattern = /(\+\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/g;

    return text
      .replace(emailPattern, '[EMAIL]')
      .replace(phonePattern, '[PHONE]')
      .replace(/\b(?:\d{4}[ -]?){4}\b/g, '[CREDIT_CARD]');
  }

  private extractTopics(text: string): string[] {
    const tokens = this.tokenizer.tokenize(text);
    if (!tokens) return [];

    this.tfidf.addDocument(tokens);
    const terms: string[] = [];

    this.tfidf.listTerms(0).forEach((item: Term) => {
      terms.push(item.term);
    });

    return terms.slice(0, 5);
  }

  private extractEntities(text: string): string[] {
    const tokens = this.tokenizer.tokenize(text);
    if (!tokens) return [];

    return tokens.filter((token: string) =>
      token.length > 1 && token[0] === token[0].toUpperCase()
    );
  }

  private analyzeSentiment(text: string): number {
    const tokens = this.tokenizer.tokenize(text);
    if (!tokens) return 0;

    return this.sentiment.getSentiment(tokens);
  }

  async analyzeConversation(conversation: ConversationData): Promise<ConversationData> {
    const sanitizedText = this.sanitizeText(conversation.content);

    const analysis = {
      topics: this.extractTopics(sanitizedText),
      sentiment: this.analyzeSentiment(sanitizedText),
      entities: this.extractEntities(sanitizedText)
    };

    if (conversation.content.length > 200) {
      return {
        ...conversation,
        analysis: {
          ...analysis,
          summary: await this.generateSummary(sanitizedText)
        }
      };
    }

    return {
      ...conversation,
      analysis
    };
  }

  private async generateSummary(text: string): Promise<string> {
    const sentences = sentenceTokenizer.tokenize(text);
    if (!sentences || sentences.length <= 3) return text;

    // Calculate sentence scores based on term frequency
    const sentenceScores: SentenceScore[] = sentences.map((sentence: string) => {
      const tokens = this.tokenizer.tokenize(sentence);
      if (!tokens) return { sentence, score: 0 };

      const score = tokens.reduce((acc: number, token: string) => {
        this.tfidf.tfidfs(token, (_: number, measure: number) => {
          acc += measure;
        });
        return acc;
      }, 0);

      return { sentence, score };
    });

    // Return top 3 sentences as summary
    return sentenceScores
      .sort((a: SentenceScore, b: SentenceScore) => b.score - a.score)
      .slice(0, 3)
      .map((item: SentenceScore) => item.sentence)
      .join(' ');
  }

  async batchAnalyze(conversations: ConversationData[]): Promise<ConversationData[]> {
    return Promise.all(conversations.map(conv => this.analyzeConversation(conv)));
  }
}
