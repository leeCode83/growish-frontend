"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TrendingUp, Users, DollarSign, Zap } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  {
    icon: DollarSign,
    label: "Total Value Locked",
    value: 2400000,
    prefix: "$",
    suffix: "M+",
    decimals: 1,
    color: "emerald",
  },
  {
    icon: Users,
    label: "Active Users",
    value: 1250,
    prefix: "",
    suffix: "+",
    decimals: 0,
    color: "cyan",
  },
  {
    icon: TrendingUp,
    label: "Average APY",
    value: 12.5,
    prefix: "",
    suffix: "%",
    decimals: 1,
    color: "purple",
  },
  {
    icon: Zap,
    label: "Transactions",
    value: 8500,
    prefix: "",
    suffix: "+",
    decimals: 0,
    color: "orange",
  },
]

export function StatsCounter() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current && !hasAnimated) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 75%",
          onEnter: () => {
            setHasAnimated(true)
            animateCounters()
          },
          once: true,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [hasAnimated])

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const element = counterRefs.current[index]
      if (!element) return

      const obj = { value: 0 }
      
      gsap.to(obj, {
        value: stat.value,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          const displayValue = stat.decimals === 0 
            ? Math.floor(obj.value).toLocaleString()
            : obj.value.toFixed(stat.decimals)
          
          element.textContent = displayValue
        },
      })
    })
  }

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: {
        icon: "text-emerald-400 bg-emerald-500/10",
        gradient: "from-emerald-500 to-teal-500",
      },
      cyan: {
        icon: "text-cyan-400 bg-cyan-500/10",
        gradient: "from-cyan-500 to-blue-500",
      },
      purple: {
        icon: "text-purple-400 bg-purple-500/10",
        gradient: "from-purple-500 to-pink-500",
      },
      orange: {
        icon: "text-orange-400 bg-orange-500/10",
        gradient: "from-orange-500 to-red-500",
      },
    }
    return colors[color as keyof typeof colors] || colors.emerald
  }

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Powering DeFi{" "}
            <span className="text-emerald-400">Growth</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Join thousands of users already earning optimized yields
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const colorClasses = getColorClasses(stat.color)

            return (
              <div
                key={index}
                className="group p-8 rounded-3xl backdrop-blur-xl transition-all duration-300 hover:scale-105 will-change-transform"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${colorClasses.icon} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>

                <div className="mb-2">
                  <div className={`text-4xl font-bold bg-gradient-to-r ${colorClasses.gradient} bg-clip-text text-transparent`}>
                    {stat.prefix}
                    <span
                      ref={(el) => {
                        counterRefs.current[index] = el
                      }}
                    >
                      0
                    </span>
                    {stat.suffix}
                  </div>
                </div>

                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Protocol badges */}
        <div className="mt-20 flex flex-wrap justify-center gap-8 items-center">
          <div className="text-white/40 text-sm font-medium">Powered by</div>
          {["Aave V3", "Compound V3"].map((protocol, index) => (
            <div
              key={index}
              className="px-6 py-3 rounded-2xl backdrop-blur-xl"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <span className="text-white/80 font-medium">{protocol}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
