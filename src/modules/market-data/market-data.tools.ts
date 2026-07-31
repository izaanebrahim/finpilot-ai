import { ToolDecorator as Tool, ExecutionContext, z } from '@nitrostack/core';

export class MarketDataTools {
  @Tool({
    name: 'get_stock_price',
    description: 'Retrieve the current stock price and historical data for a given ticker symbol.',
    inputSchema: z.object({
      ticker: z.string().describe('The stock ticker symbol (e.g., AAPL, MSFT)'),
      period: z.enum(['1D', '1W', '1M', '1Y']).default('1D').describe('The historical time period to fetch')
    })
  })
  async getStockPrice(
    input: { ticker: string; period: string },
    ctx: ExecutionContext
  ) {
    ctx.logger.info(`Fetching market data for ${input.ticker}`);
    
    // TODO: Integrate with a real financial API like AlphaVantage or Yahoo Finance.
    // For now, returning mock data for the hackathon MVP.
    const mockPrice = (Math.random() * 500 + 50).toFixed(2);
    
    return {
      ticker: input.ticker.toUpperCase(),
      currentPrice: parseFloat(mockPrice),
      currency: 'USD',
      period: input.period,
      status: 'success',
      data: `Simulated price data for ${input.ticker} over ${input.period}.`
    };
  }

  @Tool({
    name: 'get_market_news',
    description: 'Retrieve recent market news articles for a specific stock or general market.',
    inputSchema: z.object({
      ticker: z.string().optional().describe('The stock ticker symbol to filter news by')
    })
  })
  async getMarketNews(
    input: { ticker?: string },
    ctx: ExecutionContext
  ) {
    const topic = input.ticker ? input.ticker.toUpperCase() : 'General Market';
    ctx.logger.info(`Fetching news for ${topic}`);
    
    return {
      topic,
      articles: [
        { title: `${topic} sees unexpected surge in trading volume`, source: 'Financial Times' },
        { title: `Analysts predict stable quarter for ${topic}`, source: 'Bloomberg' }
      ]
    };
  }
}
