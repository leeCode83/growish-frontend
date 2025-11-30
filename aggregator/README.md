# Growish DeFi Aggregator

Growish is a decentralized finance (DeFi) aggregator built on the **Lisk Sepolia Testnet**. It simplifies yield farming by offering curated vaults with different risk strategies (Conservative, Balanced, Aggressive), automatically allocating funds across protocols like Aave and Compound to maximize returns.

## 🌟 Key Features

-   **Multi-Strategy Vaults**:
    -   🛡️ **Conservative**: Low risk, stable yields (80% Aave, 20% Compound).
    -   ⚖️ **Balanced**: Moderate risk and return (50% Aave, 50% Compound).
    -   🚀 **Aggressive**: Higher risk, potential for higher returns (30% Aave, 70% Compound).
-   **Gas-Optimized Batch System**: Implements a batch deposit/withdraw mechanism that executes transactions every 6 hours, significantly reducing gas costs for users.
-   **Real-Time Analytics**: Live dashboard showing portfolio value, vault performance, and protocol allocation.
-   **Seamless Web3 Integration**: Built with **Xellar Kit** and **Wagmi** for easy wallet connection and interaction.
-   **Testnet Ready**: Fully functional on Lisk Sepolia with a built-in test token faucet.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
-   **Web3 Integration**:
    -   [Wagmi](https://wagmi.sh/) & [Viem](https://viem.sh/) (Blockchain interaction)
    -   [Xellar Kit](https://docs.xellar.co/) (Wallet connection)
    -   [TanStack Query](https://tanstack.com/query/latest) (Server state management)
-   **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+ installed
-   pnpm (recommended) or npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd growish-frontend/aggregator
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    # or
    npm install
    ```

3.  **Run the development server:**
    ```bash
    pnpm dev
    # or
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build & Deployment

To build the application for production:

```bash
pnpm build
# or
npm run build
```

> **Note:** The project is configured to use Webpack by default (`next build --webpack`) to ensure compatibility with all Web3 dependencies.

## 🔗 Smart Contracts (Lisk Sepolia)

| Contract | Address |
| :--- | :--- |
| **Router** | `0x7dC0da00F845A4272C08E51a57651ac004f5e0C7` |
| **MockUSDC** | `0x6f576F9A89555b028ce97581DA6d10e35d433F04` |
| **Conservative Vault** | `0x6E69Ed7A9b7F4b1De965328738b3d7Bb757Ea94c` |
| **Balanced Vault** | `0x21AF332B10481972B903cBd6C3f1ec51546552e7` |
| **Aggressive Vault** | `0xc4E50772bd6d27661EE12d81e62Daa4882F4E6f4` |

## 🧪 Testing

1.  Connect your wallet (ensure you are on **Lisk Sepolia**).
2.  Use the **Test Token Faucet** on the dashboard to mint free MockUSDC.
3.  Go to **Vaults**, approve USDC, and deposit into a strategy.
4.  Wait for the batch execution (or use the mock controls if available) to see your shares update.

## 📂 Project Structure

-   `/app`: Next.js App Router pages and layouts.
-   `/components`: Reusable UI components (Vault cards, charts, wallet connect).
-   `/hooks`: Custom Web3 hooks (`useContracts.ts`) for contract interaction.
-   `/lib`: Constants, types, and utility functions.
-   `/scripts`: Scripts for contract initialization and maintenance.

---

Built with ❤️ for the Future of DeFi.
