"use client"

import { VaultType, Protocol } from "@/lib/types"
import { VAULT_CONFIGS, PROTOCOLS } from "@/lib/constants"
import { X, TrendingUp, AlertCircle, Clock, RefreshCw } from "lucide-react"

interface VaultDetailsProps {
  vaultType: VaultType
  onClose: () => void
}

export function VaultDetails({ vaultType, onClose }: VaultDetailsProps) {
  const config = VAULT_CONFIGS[vaultType]
  const aaveInfo = PROTOCOLS[Protocol.AAVE_V3]
  const compoundInfo = PROTOCOLS[Protocol.COMPOUND_V3]

  // Mock data
  const protocolBreakdown = [
    {
      protocol: aaveInfo,
      allocation: config.allocation.aave,
      amount: (config.allocation.aave / 100) * 10000, // Mock amount
      currentAPY: aaveInfo.baseAPY,
    },
    {
      protocol: compoundInfo,
      allocation: config.allocation.compound,
      amount: (config.allocation.compound / 100) * 10000, // Mock amount
      currentAPY: compoundInfo.baseAPY,
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="w-full max-w-2xl rounded-3xl backdrop-blur-xl p-8 relative max-h-[90vh] overflow-y-auto"
        style={{ background: "rgba(10, 10, 20, 0.95)", border: "1px solid rgba(255, 255, 255, 0.1)" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-white/60" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">{config.name}</h2>
          <p className="text-white/60">{config.description}</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl p-4" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
            <div className="text-xs text-white/50 mb-1">Risk Level</div>
            <div className="text-lg font-bold text-white">{config.riskLevel}</div>
          </div>
          <div className="rounded-2xl p-4" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
            <div className="text-xs text-white/50 mb-1">Target APY Range</div>
            <div className="text-lg font-bold text-white font-mono">
              {config.targetAPY.min}%-{config.targetAPY.max}%
            </div>
          </div>
          <div className="rounded-2xl p-4" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
            <div className="text-xs text-white/50 mb-1">Rebalance Threshold</div>
            <div className="text-lg font-bold text-white">{config.rebalanceThreshold}%</div>
          </div>
        </div>

        {/* Protocol Breakdown */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Protocol Allocation
          </h3>
          <div className="space-y-4">
            {protocolBreakdown.map((item) => (
              <div
                key={item.protocol.id}
                className="rounded-2xl p-4"
                style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.05)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold text-white">{item.protocol.displayName}</div>
                    <div className="text-xs text-white/50">{item.protocol.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-emerald-400 font-mono">{item.currentAPY}%</div>
                    <div className="text-xs text-white/50">APY</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white/70">Allocation</span>
                  <span className="text-white font-mono">{item.allocation}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                    style={{ width: `${item.allocation}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategy Info */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Strategy Details
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3 text-white/70">
              <RefreshCw className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-white mb-1">Automatic Rebalancing</div>
                <div>
                  The vault automatically rebalances when allocations drift by more than {config.rebalanceThreshold}%
                  from target percentages.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-white/70">
              <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-white mb-1">Yield Optimization</div>
                <div>
                  Continuously monitors protocol performance and adjusts allocations to maximize returns within risk
                  parameters.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
            Deposit USDC
          </button>
          <button
            className="px-6 py-3 rounded-xl border border-white/10 text-white/70 font-medium hover:bg-white/5 transition-all duration-300"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
