import { PortfolioChart } from "@/components/portfolio-chart"
import { PageLayout } from "@/components/page-layout"
import { FloatingNav } from "@/components/floating-nav"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function History() {
  return (
    <>
      <PageLayout>
        <div className="space-y-6">
          {/* Page Title */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Transaction History</h1>
            <p className="text-white/60">View your portfolio performance and transaction records</p>
          </div>

          {/* Portfolio Performance Chart */}
          <PortfolioChart />

          {/* Transaction History Table */}
          <Card className="bg-white/5 border-white/10">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
              <div className="space-y-3">
                {/* Sample Transaction Items */}
                {[
                  {
                    type: "Deposit",
                    vault: "Balanced Vault",
                    amount: "$5,000.00",
                    tokens: "5.000 USDC",
                    status: "Completed",
                    time: "22 hours ago",
                    hash: "0x742a35Cc6634C...454e4438f4de",
                  },
                  {
                    type: "Rebalance",
                    vault: "Conservative Vault",
                    amount: "$12,500.00",
                    tokens: "Auto",
                    status: "Completed",
                    time: "3 days ago",
                    hash: "0x8b3f21Dd9845A...892c9123e2af",
                  },
                  {
                    type: "Withdraw",
                    vault: "Aggressive Vault",
                    amount: "$2,100.00",
                    tokens: "2.100 USDC",
                    status: "Completed",
                    time: "1 week ago",
                    hash: "0x1c7e89Ff2341B...7a3d5678f9bc",
                  },
                ].map((tx, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{tx.type}</span>
                          <Badge variant="secondary" className="text-xs">
                            {tx.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-white/60">
                          {tx.vault} • {tx.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{tx.amount}</p>
                      <p className="text-sm text-white/60">{tx.tokens}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </PageLayout>

      <FloatingNav />
    </>
  )
}
