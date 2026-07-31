import { ToolDecorator as Tool, ExecutionContext, z, Widget } from '@nitrostack/core';

export class FinancialTools {
  @Widget('financial-dashboard')
  @Tool({
    name: 'get_financial_statements',
    description: 'Retrieve the income statement, balance sheet, or cash flow statement for a company.',
    inputSchema: z.object({
      ticker: z.string().describe('The stock ticker symbol'),
      statementType: z.enum(['income_statement', 'balance_sheet', 'cash_flow']).describe('The type of financial statement to retrieve'),
      period: z.enum(['annual', 'quarterly']).default('annual').describe('The reporting period')
    })
  })
  async getFinancialStatements(
    input: { ticker: string; statementType: string; period: string },
    ctx: ExecutionContext
  ) {
    ctx.logger.info(`Fetching ${input.period} ${input.statementType} for ${input.ticker}`);
    
    // Mock financial statement data for MVP
    return {
      ticker: input.ticker.toUpperCase(),
      statementType: input.statementType,
      period: input.period,
      metrics: {
        revenue: '$10.5B',
        netIncome: '$2.1B',
        operatingCashFlow: '$3.4B'
      },
      status: 'success'
    };
  }

  @Tool({
    name: 'calculate_financial_ratios',
    description: 'Calculate and retrieve key financial ratios like P/E, Debt-to-Equity, and ROE.',
    inputSchema: z.object({
      ticker: z.string().describe('The stock ticker symbol')
    })
  })
  async calculateRatios(
    input: { ticker: string },
    ctx: ExecutionContext
  ) {
    ctx.logger.info(`Calculating ratios for ${input.ticker}`);
    
    // Mock financial ratios for MVP
    return {
      ticker: input.ticker.toUpperCase(),
      ratios: {
        peRatio: (Math.random() * 20 + 10).toFixed(2),
        debtToEquity: (Math.random() * 2).toFixed(2),
        returnOnEquity: `${(Math.random() * 20 + 5).toFixed(1)}%`
      },
      status: 'success'
    };
  }
}
