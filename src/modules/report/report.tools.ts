import { ToolDecorator as Tool, ExecutionContext, z } from '@nitrostack/core';

export class ReportTools {
  @Tool({
    name: 'generate_investment_report',
    description: 'Aggregates findings into a comprehensive AI investment report.',
    inputSchema: z.object({
      ticker: z.string().describe('The stock ticker symbol'),
      summary: z.string().describe('Executive summary text'),
      recommendation: z.enum(['BUY', 'HOLD', 'SELL']).describe('Final investment recommendation')
    })
  })
  async generateReport(
    input: { ticker: string; summary: string; recommendation: string },
    ctx: ExecutionContext
  ) {
    ctx.logger.info(`Generating final investment report for ${input.ticker}`);
    
    // In a real scenario, this could generate a PDF or a comprehensive markdown document
    return {
      title: `${input.ticker.toUpperCase()} Investment Analysis Report`,
      date: new Date().toISOString().split('T')[0],
      recommendation: input.recommendation,
      executiveSummary: input.summary,
      status: 'success'
    };
  }
}
