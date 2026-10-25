# FinPilot AI

**An MCP server that turns any MCP-compatible AI assistant into an equity research analyst.**

Ask your assistant *"Is RELIANCE.NS a good buy right now?"* and FinPilot gives it the tools to pull live prices and financial statements, calculate ratios, run a DCF valuation, check portfolio diversification and risk, and compile everything into an investment report — rendered as interactive charts and cards directly inside the chat.

Built with TypeScript on [NitroStack](https://nitrostack.ai), with market data from Yahoo Finance. **Runner-up at the NitroStack MCP Hackathon 2026.**

---

## Features

- **Live market data** — real-time quotes, price history and recent news for any ticker, including NSE/BSE symbols such as `TCS.NS`.
- **Fundamental analysis** — income statement, balance sheet and cash flow retrieval, plus key ratios (P/E, Debt-to-Equity, ROE).
- **DCF valuation** — estimates intrinsic value from live free cash flow, with adjustable growth and discount (WACC) rates.
- **Risk & portfolio analysis** — beta-based risk profile and sector / asset-class diversification for a set of holdings.
- **Multi-step orchestration** — an orchestration tool plans a full analysis across the market data, financials, valuation and report modules.
- **In-chat UI widgets** — results render as interactive React components (dashboards, charts, valuation models) instead of raw JSON.
- **Emailed reports** — compiles findings into an investment report and can send it to any email address over SMTP.

## Tools

| Module | Tool | What it does |
|---|---|---|
| Market Data | `get_stock_price` | Real-time price and historical data for a ticker |
| Market Data | `get_market_news` | Latest news articles for a stock |
| Financials | `get_financial_statements` | Income statement, balance sheet or cash flow |
| Financials | `calculate_financial_ratios` | P/E, Debt-to-Equity, ROE and more |
| Valuation | `run_dcf_valuation` | Discounted Cash Flow intrinsic value estimate |
| Valuation | `get_risk_assessment` | Live risk profile, including beta |
| Portfolio | `analyze_portfolio_diversification` | Sector and asset-class mix of a portfolio |
| Orchestrator | `orchestrate_financial_analysis` | Plans a multi-step analysis across modules |
| Report | `generate_investment_report` | Aggregates findings into one report |
| Report | `email_investment_report` | Emails the report to a given address |

Each tool is paired with a widget in `src/widgets/app/` (for example `valuation-model`, `financial-dashboard`, `portfolio-diversification`), so the assistant shows a visual result alongside its answer.

## How it works

```
 AI assistant (any MCP client)
          │  MCP (stdio / HTTP)
          ▼
 ┌─────────────────────────── FinPilot MCP server ───────────────────────────┐
 │  Orchestrator ──► Market Data ──► Financials ──► Valuation ──► Report     │
 │                                        │                         │        │
 │                                  Yahoo Finance              SMTP email    │
 │                                                                           │
 │  Widgets (Next.js / React) rendered inside the chat via server-driven UI  │
 └───────────────────────────────────────────────────────────────────────────┘
```

The server is organised into feature modules (`src/modules/*`), each exposing its tools through NitroStack decorators with [Zod](https://zod.dev) input schemas. The root module in `src/app.module.ts` registers them all, along with a health check.

## Tech stack

| Layer | Technology |
|---|---|
| Language | TypeScript (Node.js) |
| MCP framework | NitroStack (`@nitrostack/core`, `@nitrostack/cli`) |
| Widgets | Next.js, React |
| Market data | `yahoo-finance2` |
| Validation | Zod |
| Email | Nodemailer (Gmail SMTP) |

## Getting started

**Prerequisites:** Node.js 18+ and npm.

```bash
git clone https://github.com/izaanebrahim/finpilot-ai.git
cd finpilot-ai
npm run install:all      # installs server and widget dependencies
cp .env.example .env
npm run dev              # starts the MCP server in development mode
```

To enable emailed reports, add a Gmail address and an [app password](https://support.google.com/accounts/answer/185833) to `.env`:

```env
GMAIL_USER=you@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

Without these, every other tool still works; the email tool simply reports that email is disabled.

### Production build

```bash
npm run build
npm run start:prod
```

## Connect it to an AI assistant

Add FinPilot to your MCP client's configuration. To use the hosted server:

```json
{
  "mcpServers": {
    "finpilot": {
      "url": "https://finpilot-6a6d8635-rushd-srmist.app.nitrocloud.ai/mcp"
    }
  }
}
```

Restart the client and the FinPilot tools become available. Try prompts like:

- *"Run a DCF on INFY.NS with 8% growth and a 11% discount rate."*
- *"Compare the financial ratios of HDFCBANK.NS and ICICIBANK.NS."*
- *"How diversified is a portfolio of TCS.NS, RELIANCE.NS, ITC.NS and SUNPHARMA.NS?"*
- *"Write an investment report on TATAMOTORS.NS and email it to me."*

## Project structure

```
src/
├── app.module.ts          # Root module — registers all feature modules
├── index.ts               # Server entry point
├── health/                # Health check
├── modules/
│   ├── market-data/       # Prices, history, news
│   ├── financials/        # Statements and ratios
│   ├── valuation/         # DCF and risk assessment
│   ├── portfolio/         # Diversification analysis
│   ├── orchestrator/      # Multi-step analysis planning
│   ├── report/            # Report generation and email
│   └── calculator/        # Utility calculator
└── widgets/               # Next.js app with one page per in-chat widget
```

## Disclaimer

FinPilot is a research and learning project. Its output is not investment advice; always do your own research before making financial decisions.

## Team

Built by [Izaan Ebrahim](https://github.com/izaanebrahim) and [Shahzaad Ahmed](https://github.com/ShahzaadAhmed). Originally developed in [ShahzaadAhmed/MCP_project](https://github.com/ShahzaadAhmed/MCP_project).

## License

MIT
