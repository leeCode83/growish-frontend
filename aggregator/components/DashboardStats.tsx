'use client'

import { useAccount } from 'wagmi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  usePortfolioValue,
  useTotalValueLocked,
  useUserBalances,
  useFormatTokenAmount,
  useUserClaimableAssets,
  useTransactionHistory
} from '@/hooks/useContracts'
import { TrendingUp, DollarSign, PieChart, Target, History, ArrowUpRight, ArrowDownLeft, CheckCircle2, Clock } from 'lucide-react'
import { SUPPORTED_ASSETS, CONTRACTS, ROUTER_ABI } from '@/lib/contracts'
import { useWriteContract } from 'wagmi'
import { vaultTypeToRiskLevel } from '@/lib/utils'

export function DashboardStats() {
  const { address } = useAccount()
  const { formatAmount } = useFormatTokenAmount()
  const { isPending } = useWriteContract()

  // Global stats
  const { data: portfolioValue, isLoading: portfolioLoading } = usePortfolioValue(address)
  const { data: totalValueLocked, isLoading: tvlLoading } = useTotalValueLocked()

  // User balances for each asset
  const userBalances = useUserBalances(address)

  // Claimable assets
  const claimableAssets = useUserClaimableAssets(address)

  // Transaction History
  const { data: history, isLoading: historyLoading } = useTransactionHistory(address)

  // Calculate total portfolio value in USD (assuming 1:1 for stablecoins)
  const totalPortfolioUSD = userBalances?.reduce((total, { vaultBalance }) => {
    return total + (vaultBalance ? parseFloat(formatAmount(vaultBalance, 6)) : 0)
  }, 0) || 0

  // Calculate weighted average APY (simplified)
  const weightedAPY = 8.5 // This would be calculated based on actual vault APYs

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Total Portfolio</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {portfolioLoading ? (
                <div className="animate-pulse bg-white/20 h-8 w-20 rounded" />
              ) : (
                `$${totalPortfolioUSD.toFixed(2)}`
              )}
            </div>
            <p className="text-xs text-white/50 mt-1">
              Across all vaults
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Weighted APY</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {weightedAPY.toFixed(2)}%
            </div>
            <p className="text-xs text-white/50 mt-1">
              Current yield rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Active Vaults</CardTitle>
            <PieChart className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {userBalances?.filter(({ vaultBalance }) =>
                vaultBalance && vaultBalance > BigInt(0)
              ).length || 0}
            </div>
            <p className="text-xs text-white/50 mt-1">
              Of {SUPPORTED_ASSETS.length} available
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Protocol TVL</CardTitle>
            <Target className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {tvlLoading ? (
                <div className="animate-pulse bg-white/20 h-8 w-20 rounded" />
              ) : (
                `$${formatAmount(totalValueLocked, 6, 0)}`
              )}
            </div>
            <p className="text-xs text-white/50 mt-1">
              Total value locked
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      {address && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Vault Positions & Claimable Assets */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Positions */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Your Vault Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userBalances?.map(({ asset, vaultBalance, tokenBalance }) => {
                    const hasPosition = vaultBalance && vaultBalance > BigInt(0)
                    return (
                      <div key={asset.address} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white font-bold text-xs">{asset.symbol[0]}</span>
                          </div>
                          <div>
                            <h3 className="text-white font-medium">{asset.name}</h3>
                            <p className="text-white/60 text-sm">{asset.symbol}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <div className="text-white font-medium">
                              {formatAmount(vaultBalance, asset.decimals)} {asset.symbol}
                            </div>
                            {hasPosition && (
                              <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 text-xs">
                                Active
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Claimable Assets */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Claimable Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {claimableAssets?.map(({ asset, claimableShares, claimableUSDC, vaultType }) => {
                    const hasClaimableShares = claimableShares && claimableShares > BigInt(0)
                    const hasClaimableUSDC = claimableUSDC && claimableUSDC > BigInt(0)

                    if (!hasClaimableShares && !hasClaimableUSDC) return null

                    return (
                      <div key={asset.address} className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                              <span className="text-white font-bold text-xs">{asset.symbol[0]}</span>
                            </div>
                            <div>
                              <h3 className="text-white font-medium">{asset.name}</h3>
                              <p className="text-white/60 text-sm">Pending Claim</p>
                            </div>
                          </div>
                        </div>

                        {hasClaimableShares && (
                          <div className="flex justify-between items-center text-sm bg-white/5 p-3 rounded-lg border border-white/5">
                            <div className="flex flex-col">
                              <span className="text-white/70 text-xs mb-1">Shares from Deposit:</span>
                              <span className="text-emerald-400 font-medium font-mono">
                                {formatAmount(claimableShares, asset.decimals)} {asset.symbol}
                              </span>
                            </div>
                            <ClaimButton
                              type="deposit"
                              vaultType={vaultType}
                              disabled={isPending}
                            />
                          </div>
                        )}

                        {hasClaimableUSDC && (
                          <div className="flex justify-between items-center text-sm bg-white/5 p-3 rounded-lg border border-white/5">
                            <div className="flex flex-col">
                              <span className="text-white/70 text-xs mb-1">USDC from Withdraw:</span>
                              <span className="text-blue-400 font-medium font-mono">
                                {formatAmount(claimableUSDC, 6)} USDC
                              </span>
                            </div>
                            <ClaimButton
                              type="withdraw"
                              vaultType={vaultType}
                              disabled={isPending}
                            />
                          </div>
                        )}
                      </div>
                    )
                  })}

                  {claimableAssets?.every(item =>
                    (!item.claimableShares || item.claimableShares === BigInt(0)) &&
                    (!item.claimableUSDC || item.claimableUSDC === BigInt(0))
                  ) && (
                      <div className="text-center py-8 text-white/40 text-sm">
                        No assets pending to claim
                      </div>
                    )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Transaction History */}
          <div className="lg:col-span-1">
            <Card className="bg-white/5 border-white/10 h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-white text-lg">Recent Activity</CardTitle>
                <History className="h-4 w-4 text-white/50" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {historyLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="animate-pulse flex items-center gap-3 p-3 rounded-lg bg-white/5">
                          <div className="w-8 h-8 rounded-full bg-white/10" />
                          <div className="flex-1 space-y-2">
                            <div className="h-3 w-20 bg-white/10 rounded" />
                            <div className="h-2 w-12 bg-white/10 rounded" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : history && history.length > 0 ? (
                    history.map((tx, i) => {
                      const isDeposit = tx.type === 'Deposit'
                      const isWithdraw = tx.type === 'Withdraw'
                      const isClaim = tx.type.includes('Claim')

                      return (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center
                              ${isDeposit ? 'bg-emerald-500/20 text-emerald-400' :
                                isWithdraw ? 'bg-red-500/20 text-red-400' :
                                  'bg-blue-500/20 text-blue-400'}`}>
                              {isDeposit && <ArrowDownLeft className="w-4 h-4" />}
                              {isWithdraw && <ArrowUpRight className="w-4 h-4" />}
                              {isClaim && <CheckCircle2 className="w-4 h-4" />}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">{tx.type}</div>
                              <div className="text-xs text-white/50 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(tx.timestamp).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-mono font-medium text-white">
                              {tx.amount}
                            </div>
                            <div className="text-xs text-white/50">
                              {tx.type === 'Deposit' || tx.type === 'Claim USDC' ? 'USDC' : 'Shares'}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="text-center py-12 text-white/40 text-sm">
                      No recent transactions
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

function ClaimButton({ type, vaultType, disabled }: { type: 'deposit' | 'withdraw', vaultType: string, disabled: boolean }) {
  const { writeContract, isPending } = useWriteContract()
  const riskLevel = vaultTypeToRiskLevel(vaultType)

  const handleClaim = () => {
    writeContract({
      address: CONTRACTS.ROUTER as `0x${string}`,
      abi: ROUTER_ABI,
      functionName: type === 'deposit' ? 'claimDepositShares' : 'claimWithdrawAssets',
      args: [riskLevel],
    })
  }

  return (
    <button
      onClick={handleClaim}
      disabled={disabled || isPending}
      className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? 'Claiming...' : 'Claim'}
    </button>
  )
}