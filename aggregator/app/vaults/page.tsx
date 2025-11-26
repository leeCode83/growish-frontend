import { YieldOpportunities } from "@/components/yield-opportunities"
import { PageLayout } from "@/components/page-layout"
import { FloatingNav } from "@/components/floating-nav"
import { Card } from "@/components/ui/card"

export default function Vaults() {
  return (
    <>
      <PageLayout>
        <div className="space-y-6">
          {/* Page Title */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Available Vaults</h1>
            <p className="text-white/60">Explore and manage yield opportunities across multiple protocols</p>
          </div>

          {/* Filter Section - Placeholder */}
          <Card className="bg-white/5 border-white/10 p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search vaults..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-all">
                  All Chains
                </button>
                <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-all">
                  Sort by APY
                </button>
              </div>
            </div>
          </Card>

          {/* Vault List */}
          <YieldOpportunities />
        </div>
      </PageLayout>

      <FloatingNav />
    </>
  )
}
