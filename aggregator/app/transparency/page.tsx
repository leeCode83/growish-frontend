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
              <p className="text-3xl font-bold">$95.80M</p>
              <p className="text-sm text-emerald-400 mt-1">+12.4% this month</p>
            </Card>
            <Card className="bg-white/5 border-white/10 p-6">
              <p className="text-white/60 text-sm mb-2">Active Protocols</p>
              <p className="text-3xl font-bold">8</p>
              <p className="text-sm text-white/60 mt-1">Across 3 chains</p>
            </Card>
            <Card className="bg-white/5 border-white/10 p-6">
              <p className="text-white/60 text-sm mb-2">Average APY</p>
              <p className="text-3xl font-bold">11.5%</p>
              <p className="text-sm text-cyan-400 mt-1">Risk-adjusted</p>
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
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                      <div className="text-left">
                        <p className="font-medium">Aave V3</p>
                        <p className="text-sm text-white/60">Lending Protocol • $32.00M TVL</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-11 pt-2 space-y-2 text-sm text-white/80">
                      <p>
                        <span className="text-white/60">Contract:</span> 0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2
                      </p>
                      <p>
                        <span className="text-white/60">Chain:</span> Ethereum Mainnet
                      </p>
                      <p>
                        <span className="text-white/60">Last Audit:</span> Trail of Bits (Oct 2024)
                      </p>
                      <p>
                        <span className="text-white/60">Risk Score:</span> 2/10 (Very Low)
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
                        <p className="text-sm text-white/60">Lending Protocol • $28.50M TVL</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-11 pt-2 space-y-2 text-sm text-white/80">
                      <p>
                        <span className="text-white/60">Contract:</span> 0xc3d688B66703497DAA19211EEdff47f25384cdc3
                      </p>
                      <p>
                        <span className="text-white/60">Chain:</span> Ethereum Mainnet
                      </p>
                      <p>
                        <span className="text-white/60">Last Audit:</span> OpenZeppelin (Sep 2024)
                      </p>
                      <p>
                        <span className="text-white/60">Risk Score:</span> 3/10 (Low)
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="curve" className="border-white/10">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500" />
                      <div className="text-left">
                        <p className="font-medium">Curve Finance</p>
                        <p className="text-sm text-white/60">DEX & Stablecoin • $23.30M TVL</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-11 pt-2 space-y-2 text-sm text-white/80">
                      <p>
                        <span className="text-white/60">Contract:</span> 0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7
                      </p>
                      <p>
                        <span className="text-white/60">Chain:</span> Ethereum Mainnet
                      </p>
                      <p>
                        <span className="text-white/60">Last Audit:</span> ChainSecurity (Nov 2024)
                      </p>
                      <p>
                        <span className="text-white/60">Risk Score:</span> 4/10 (Medium-Low)
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
