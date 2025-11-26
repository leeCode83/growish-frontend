import { AiInsightCard } from "@/components/ai-insight-card"
import { YieldOpportunities } from "@/components/yield-opportunities"
import { PortfolioChart } from "@/components/portfolio-chart"
import { StatsCards } from "@/components/stats-cards"
import { PortfolioDistribution } from "@/components/portfolio-distribution"
import { PageLayout } from "@/components/page-layout"
import { FloatingNav } from "@/components/floating-nav"

export default function Dashboard() {
  return (
    <>
      <PageLayout>
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
      </PageLayout>

      {/* Floating Navigation */}
      <FloatingNav />
    </>
  )
}
