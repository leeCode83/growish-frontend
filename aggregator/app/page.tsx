import { AiInsightCard } from "@/components/ai-insight-card"
import { YieldOpportunities } from "@/components/yield-opportunities"
import { PortfolioChart } from "@/components/portfolio-chart"
import { StatsCards } from "@/components/stats-cards"
import { PortfolioDistribution } from "@/components/portfolio-distribution"
import { FloatingNav } from "@/components/floating-nav"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#050510] text-white overflow-hidden relative">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 py-8 pb-32">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#050510]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="font-sans text-xl font-bold tracking-tight">Growish</span>
          </div>
          <button className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm font-medium hover:bg-white/10 transition-all hover:border-white/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            Connect Wallet
          </button>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 auto-rows-min">
          {/* AI Insight Card - Top Left */}
          <div className="lg:col-span-5 lg:row-span-1">
            <AiInsightCard />
          </div>

          {/* Stats Cards - Top Right */}
          <div className="lg:col-span-7 lg:row-span-1">
            <StatsCards />
          </div>

          {/* Yield Opportunities - Left */}
          <div className="lg:col-span-5 lg:row-span-2">
            <YieldOpportunities />
          </div>

          {/* Portfolio Chart - Right Top */}
          <div className="lg:col-span-7 lg:row-span-1">
            <PortfolioChart />
          </div>

          {/* Portfolio Distribution - Right Bottom */}
          <div className="lg:col-span-7 lg:row-span-1">
            <PortfolioDistribution />
          </div>
        </div>
      </div>

      {/* Floating Navigation */}
      <FloatingNav />
    </div>
  )
}
