import { PortfolioDistribution } from "@/components/portfolio-distribution"
import { PageLayout } from "@/components/page-layout"
import { FloatingNav } from "@/components/floating-nav"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Transparency() {
  return (
    <>
      <PageLayout>
        <div className="space-y-6">
          {/* Page Title */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Radical Transparency</h1>
            <p className="text-white/60">Real-time breakdown of your funds and strategies</p>
          </div>

          {/* Protocol TVL & Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/5 border-white/10 p-6">
              <p className="text-white/60 text-sm mb-2">Total Value Locked</p>
              <p className="text-3xl font-bold">$11.7B</p>
              <p className="text-sm text-emerald-400 mt-1">Combined across protocols</p>
            </Card>
            <Card className="bg-white/5 border-white/10 p-6">
              <p className="text-white/60 text-sm mb-2">Active Protocols</p>
              <p className="text-3xl font-bold">2</p>
              <p className="text-sm text-white/60 mt-1">Aave V3 & Compound V3</p>
            </Card>
            <Card className="bg-white/5 border-white/10 p-6">
              <p className="text-white/60 text-sm mb-2">Average APY</p>
              <p className="text-3xl font-bold">5.0%</p>
              <p className="text-sm text-cyan-400 mt-1">USDC risk-adjusted</p>
            </Card>
          </div>

          {/* Risk Analysis */}
          <PortfolioDistribution />

          {/* Protocol Details Accordion */}
          <Card className="bg-white/5 border-white/10">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Protocol Breakdown</h2>
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="aave" className="border-white/10">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500" />
                      <div className="text-left">
                        <p className="font-medium">Aave V3</p>
                        <p className="text-sm text-white/60">Lending Protocol • $8.2B TVL</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-11 pt-2 space-y-2 text-sm text-white/80">
                      <p>
                        <span className="text-white/60">Contract:</span> 0x0000000000000000000000000000000000000000
                      </p>
                      <p>
                        <span className="text-white/60">Chain:</span> Lisk Sepolia
                      </p>
                      <p>
                        <span className="text-white/60">Last Audit:</span> OpenZeppelin, Trail of Bits, ABDK (2024-Q2)
                      </p>
                      <p>
                        <span className="text-white/60">Risk Score:</span> 2.5/10 (Very Low)
                      </p>
                      <p>
                        <span className="text-white/60">USDC APY:</span> 4.2%
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="compound" className="border-white/10">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500" />
                      <div className="text-left">
                        <p className="font-medium">Compound V3</p>
                        <p className="text-sm text-white/60">Lending Protocol • $3.5B TVL</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-11 pt-2 space-y-2 text-sm text-white/80">
                      <p>
                        <span className="text-white/60">Contract:</span> 0x0000000000000000000000000000000000000000
                      </p>
                      <p>
                        <span className="text-white/60">Chain:</span> Lisk Sepolia
                      </p>
                      <p>
                        <span className="text-white/60">Last Audit:</span> OpenZeppelin, ChainSecurity (2024-Q1)
                      </p>
                      <p>
                        <span className="text-white/60">Risk Score:</span> 3.0/10 (Low)
                      </p>
                      <p>
                        <span className="text-white/60">USDC APY:</span> 5.8%
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </Card>

          {/* Fee Transparency */}
          <Card className="bg-white/5 border-white/10">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Complete Fee Breakdown</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                  <span className="text-white/80">Platform Management Fee</span>
                  <span className="font-medium">0.5% annually</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                  <span className="text-white/80">Performance Fee</span>
                  <span className="font-medium">10% on profits</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                  <span className="text-white/80">Gas Optimization Savings</span>
                  <span className="font-medium text-emerald-400">-$2.50 average</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                  <span className="text-white/80">Protocol Fees (passed through)</span>
                  <span className="font-medium">Varies by protocol</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </PageLayout>

      <FloatingNav />
    </>
  )
}
