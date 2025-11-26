import type React from "react"
export function StatsCards() {
  const stats = [
    { label: "Total Stablecoins", value: "$15,750.00", change: "+8.2%" },
    { label: "Weighted APY", value: "8.95%", change: "+0.3%" },
    { label: "Total Earnings", value: "$1,205.00", change: "+$89" },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="relative rounded-3xl backdrop-blur-xl p-5 hover:border-white/15 transition-all duration-300 group"
          style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
        >
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ "--tw-gradient-from": "rgba(255, 255, 255, 0.02)" } as React.CSSProperties}
          />
          <p className="text-white/50 text-sm font-medium mb-1">{stat.label}</p>
          <p className="text-2xl font-bold font-sans text-white tracking-tight">{stat.value}</p>
          <span
            className={`text-xs font-medium ${index === 0 ? "text-emerald-400" : index === 1 ? "text-cyan-400" : "text-emerald-400"}`}
          >
            {stat.change}
          </span>
        </div>
      ))}
    </div>
  )
}
