"use client"

import { VaultType } from "@/lib/types"

const opportunities = [
  {
    token: "USDC",
    protocol: "Aave V3",
    apy: "4.2%",
    risk: "low",
    tvl: "$8.2B",
    icon: "$",
    color: "from-blue-500 to-cyan-500",
    chain: "Lisk Sepolia",
    vaultType: VaultType.CONSERVATIVE,
  },
  {
    token: "USDC",
    protocol: "Compound V3",
    apy: "5.8%",
    risk: "med",
    tvl: "$3.5B",
    icon: "$",
    color: "from-emerald-500 to-teal-500",
    chain: "Lisk Sepolia",
    vaultType: VaultType.AGGRESSIVE,
  },
]

const riskColors = {
  low: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  med: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  high: "text-rose-400 bg-rose-400/10 border-rose-400/30",
}

export function YieldOpportunities() {
  return (
    <div
      className="h-full rounded-3xl backdrop-blur-xl p-6 hover:border-white/15 transition-all duration-300"
      style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold font-sans text-white">Yield Opportunities</h2>
        <button className="text-xs text-white/50 hover:text-white/80 transition-colors">View All</button>
      </div>

      <div className="space-y-3">
        {opportunities.map((opp) => (
          <div
            key={`${opp.token}-${opp.protocol}`}
            className="relative rounded-2xl p-4 hover:border-white/15 transition-all duration-300 group"
            style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)" }}
          >
            <div className="flex items-center gap-4">
              {/* Token Icon */}
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${opp.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
              >
                {opp.icon}
              </div>

              {/* Token Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{opp.token}</span>
                  <span className="text-white/40 text-sm">• {opp.protocol}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-medium">
                    Lisk Sepolia
                  </span>
                  <p className="text-white/40 text-xs">TVL: {opp.tvl}</p>
                </div>
              </div>

              {/* APY & Risk */}
              <div className="text-right">
                <p className="text-lg font-bold text-[#00ff88] font-mono tracking-tight">{opp.apy}</p>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider border ${riskColors[opp.risk as keyof typeof riskColors]}`}
                >
                  {opp.risk}
                </span>
              </div>
            </div>

            {/* Zap Button */}
            <button className="mt-3 w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:from-emerald-500/20 hover:to-cyan-500/20 hover:border-emerald-500/40">
              One-Click Zap
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
