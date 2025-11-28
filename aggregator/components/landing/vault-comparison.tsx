"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Shield, TrendingUp, Flame, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

const vaults = [
  {
    name: "Conservative",
    icon: Shield,
    risk: "Low Risk",
    apy: "5-8%",
    color: "emerald",
    gradient: "from-emerald-500 to-teal-500",
    features: [
      "Stable yield focus",
      "Lower volatility",
      "Ideal for beginners",
      "Principal protection priority",
    ],
    allocation: "80% Stablecoins, 20% Blue Chips",
  },
  {
    name: "Balanced",
    icon: TrendingUp,
    risk: "Medium Risk",
    apy: "8-15%",
    color: "cyan",
    gradient: "from-cyan-500 to-blue-500",
    features: [
      "Optimized risk/reward",
      "Diversified strategy",
      "Popular choice",
      "Growth with stability",
    ],
    allocation: "50% Stablecoins, 50% Blue Chips",
    popular: true,
  },
  {
    name: "Aggressive",
    icon: Flame,
    risk: "High Risk",
    apy: "15-25%",
    color: "orange",
    gradient: "from-orange-500 to-red-500",
    features: [
      "Maximum yield potential",
      "Higher volatility",
      "For experienced users",
      "Active rebalancing",
    ],
    allocation: "30% Stablecoins, 70% Blue Chips",
  },
]

export function VaultComparison() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial visible states
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 1, y: 0 })
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 50,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        })
      }

      // Stagger vault cards
      if (cardsRef.current) {
        const cards = cardsRef.current.children
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 })
        gsap.from(cards, {
          opacity: 0,
          y: 100,
          scale: 0.9,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSelectVault = (vaultName: string) => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname
      const protocol = window.location.protocol
      
      if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
        window.location.href = `/vaults?selected=${vaultName.toLowerCase()}`
      } else {
        const rootDomain = hostname.split('.').slice(-2).join('.')
        window.location.href = `${protocol}//app.${rootDomain}/vaults?selected=${vaultName.toLowerCase()}`
      }
    }
  }

  return (
    <section id="vaults-section" ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Choose Your{" "}
            <span className="text-emerald-400">Strategy</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Select a vault that matches your risk tolerance and investment goals
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {vaults.map((vault, index) => {
            const Icon = vault.icon

            return (
              <div
                key={index}
                className={`relative group rounded-3xl backdrop-blur-xl transition-all duration-500 hover:scale-105 will-change-transform ${
                  vault.popular ? "ring-2 ring-cyan-500/50" : ""
                }`}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                {vault.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className="p-8">
                  {/* Icon and badge */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${vault.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Vault name and risk */}
                  <h3 className="text-2xl font-bold mb-2">{vault.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-sm px-3 py-1 rounded-full bg-gradient-to-r ${vault.gradient} bg-opacity-10`}>
                      {vault.risk}
                    </span>
                  </div>

                  {/* APY */}
                  <div className="mb-6">
                    <div className="text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                      {vault.apy}
                    </div>
                    <div className="text-sm text-white/60">Estimated APY</div>
                  </div>

                  {/* Allocation */}
                  <div className="mb-6 p-4 rounded-xl bg-white/5">
                    <div className="text-xs text-white/60 mb-1">Asset Allocation</div>
                    <div className="text-sm text-white/90">{vault.allocation}</div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {vault.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-white/80">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    onClick={() => handleSelectVault(vault.name)}
                    className={`w-full bg-gradient-to-r ${vault.gradient} hover:opacity-90 text-white py-6 rounded-2xl transition-all hover:shadow-lg`}
                  >
                    Select {vault.name}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
