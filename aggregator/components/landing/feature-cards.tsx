"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Shield, Zap, BarChart3, Lock, TrendingUp, Users } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Shield,
    title: "Battle-Tested Security",
    description: "Built on Aave V3 and Compound V3, the most audited and trusted DeFi protocols in the ecosystem.",
    color: "emerald",
  },
  {
    icon: Zap,
    title: "Automated Optimization",
    description: "Smart rebalancing algorithms continuously monitor and optimize your positions for maximum yield.",
    color: "cyan",
  },
  {
    icon: BarChart3,
    title: "Risk-Adjusted Strategies",
    description: "Choose from Conservative, Balanced, or Aggressive vaults tailored to your risk tolerance.",
    color: "purple",
  },
  {
    icon: Lock,
    title: "Non-Custodial",
    description: "You maintain full control of your assets. We never hold your funds - only optimize them.",
    color: "emerald",
  },
  {
    icon: TrendingUp,
    title: "Transparent Performance",
    description: "Real-time analytics and historical performance tracking for complete visibility into your yields.",
    color: "cyan",
  },
  {
    icon: Users,
    title: "Batch Processing",
    description: "Gas-efficient batch deposits every 6 hours minimize transaction costs across all users.",
    color: "purple",
  },
]

export function FeatureCards() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

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

      // Stagger animation for feature cards
      if (cardsRef.current) {
        const cards = cardsRef.current.children
        gsap.set(cards, { opacity: 1, y: 0 })
        gsap.from(cards, {
          opacity: 0,
          y: 80,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: {
        icon: "text-emerald-400",
        glow: "group-hover:shadow-emerald-500/20",
        border: "group-hover:border-emerald-500/30",
      },
      cyan: {
        icon: "text-cyan-400",
        glow: "group-hover:shadow-cyan-500/20",
        border: "group-hover:border-cyan-500/30",
      },
      purple: {
        icon: "text-purple-400",
        glow: "group-hover:shadow-purple-500/20",
        border: "group-hover:border-purple-500/30",
      },
    }
    return colors[color as keyof typeof colors] || colors.emerald
  }

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16"
        >
          Why Choose{" "}
          <span className="text-emerald-400">Growish</span>
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const colorClasses = getColorClasses(feature.color)

            return (
              <div
                key={index}
                className={`group p-8 rounded-3xl backdrop-blur-xl transition-all duration-300 hover:scale-105 will-change-transform ${colorClasses.glow} ${colorClasses.border}`}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${colorClasses.icon} transition-all duration-300 group-hover:scale-110`}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
