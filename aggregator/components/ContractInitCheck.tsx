'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { useVaultAddress, useBatchInterval, useMinDepositAmount, useUSDCAddress } from '@/hooks/useContracts'
import { CONTRACTS } from '@/lib/contracts'
import { AlertCircle, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { formatUnits } from 'viem'

export function ContractInitCheck() {
  const [isExpanded, setIsExpanded] = useState(false)

  // Check if vaults are registered
  const { data: conservativeVault, isLoading: loadingConservative } = useVaultAddress('conservative')
  const { data: balancedVault, isLoading: loadingBalanced } = useVaultAddress('balanced')
  const { data: aggressiveVault, isLoading: loadingAggressive } = useVaultAddress('aggressive')
  
  // Check other contract settings
  const { data: batchInterval, isLoading: loadingInterval } = useBatchInterval()
  const { data: minDeposit, isLoading: loadingMinDeposit } = useMinDepositAmount()
  const { data: usdcAddress, isLoading: loadingUsdc } = useUSDCAddress()

  const isLoading = loadingConservative || loadingBalanced || loadingAggressive || 
                    loadingInterval || loadingMinDeposit || loadingUsdc

  // Check if vaults are properly initialized (not zero address)
  const isConservativeInit = conservativeVault && conservativeVault !== '0x0000000000000000000000000000000000000000'
  const isBalancedInit = balancedVault && balancedVault !== '0x0000000000000000000000000000000000000000'
  const isAggressiveInit = aggressiveVault && aggressiveVault !== '0x0000000000000000000000000000000000000000'
  
  const allVaultsInitialized = isConservativeInit && isBalancedInit && isAggressiveInit
  const isUsdcInit = usdcAddress && usdcAddress !== '0x0000000000000000000000000000000000000000'

  const getStatusIcon = (condition: boolean | undefined, loading: boolean) => {
    if (loading) return <Loader2 className="w-4 h-4 animate-spin text-white/60" />
    if (condition) return <CheckCircle2 className="w-4 h-4 text-emerald-400" />
    return <XCircle className="w-4 h-4 text-red-400" />
  }

  const getStatusBadge = (condition: boolean | undefined, loading: boolean) => {
    if (loading) return <Badge variant="secondary" className="bg-white/10 text-white/60">Loading...</Badge>
    if (condition) return <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400">✓ OK</Badge>
    return <Badge variant="secondary" className="bg-red-500/20 text-red-400">✗ Not Set</Badge>
  }

  if (isLoading) {
    return (
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Checking Contract Status...
          </CardTitle>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            {allVaultsInitialized && isUsdcInit ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-orange-400" />
            )}
            Router Contract Status
          </CardTitle>
          {allVaultsInitialized && isUsdcInit ? (
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              Initialized
            </Badge>
          ) : (
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
              Needs Setup
            </Badge>
          )}
        </div>
      </CardHeader>

      {(isExpanded || !allVaultsInitialized || !isUsdcInit) && (
        <CardContent className="space-y-4">
          {/* Vault Registration Status */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white/80">Vault Registration</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 rounded bg-white/5">
                <div className="flex items-center gap-2">
                  {getStatusIcon(isConservativeInit, loadingConservative)}
                  <span className="text-white/70">Conservative Vault (RiskLevel 0)</span>
                </div>
                {getStatusBadge(isConservativeInit, loadingConservative)}
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-white/5">
                <div className="flex items-center gap-2">
                  {getStatusIcon(isBalancedInit, loadingBalanced)}
                  <span className="text-white/70">Balanced Vault (RiskLevel 1)</span>
                </div>
                {getStatusBadge(isBalancedInit, loadingBalanced)}
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-white/5">
                <div className="flex items-center gap-2">
                  {getStatusIcon(isAggressiveInit, loadingAggressive)}
                  <span className="text-white/70">Aggressive Vault (RiskLevel 2)</span>
                </div>
                {getStatusBadge(isAggressiveInit, loadingAggressive)}
              </div>
            </div>

            {!allVaultsInitialized && (
              <Alert className="bg-orange-500/10 border-orange-500/30 mt-4">
                <AlertCircle className="h-4 w-4 text-orange-400" />
                <AlertDescription className="text-orange-200">
                  <strong>Vaults Not Registered:</strong> The contract owner needs to call <code className="bg-black/30 px-1 py-0.5 rounded">setVault(riskLevel, vaultAddress)</code> for each vault.
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Contract Configuration */}
          <div className="space-y-2 pt-4 border-t border-white/10">
            <h3 className="text-sm font-medium text-white/80">Contract Configuration</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 rounded bg-white/5">
                <div className="flex items-center gap-2">
                  {getStatusIcon(isUsdcInit, loadingUsdc)}
                  <span className="text-white/70">USDC Token</span>
                </div>
                <span className="text-white/60 font-mono text-xs">
                  {usdcAddress ? `${usdcAddress.slice(0, 6)}...${usdcAddress.slice(-4)}` : 'Not set'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-white/5">
                <span className="text-white/70">Batch Interval</span>
                <span className="text-white/60">
                  {batchInterval ? `${formatUnits(batchInterval, 0)} seconds` : 'Not set'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-white/5">
                <span className="text-white/70">Minimum Deposit</span>
                <span className="text-white/60">
                  {minDeposit ? `${formatUnits(minDeposit, 6)} USDC` : 'Not set'}
                </span>
              </div>
            </div>
          </div>

          {/* Expected vs Actual Vault Addresses */}
          {isExpanded && (
            <div className="space-y-2 pt-4 border-t border-white/10">
              <h3 className="text-sm font-medium text-white/80">Expected Vault Addresses</h3>
              <div className="space-y-1 text-xs font-mono">
                <div className="p-2 rounded bg-white/5">
                  <div className="text-white/50 mb-1">Conservative:</div>
                  <div className="text-emerald-400">{CONTRACTS.VAULT_CONSERVATIVE}</div>
                  {conservativeVault && conservativeVault !== CONTRACTS.VAULT_CONSERVATIVE && (
                    <div className="text-orange-400 mt-1">Actual: {conservativeVault}</div>
                  )}
                </div>
                <div className="p-2 rounded bg-white/5">
                  <div className="text-white/50 mb-1">Balanced:</div>
                  <div className="text-cyan-400">{CONTRACTS.VAULT_BALANCED}</div>
                  {balancedVault && balancedVault !== CONTRACTS.VAULT_BALANCED && (
                    <div className="text-orange-400 mt-1">Actual: {balancedVault}</div>
                  )}
                </div>
                <div className="p-2 rounded bg-white/5">
                  <div className="text-white/50 mb-1">Aggressive:</div>
                  <div className="text-orange-400">{CONTRACTS.VAULT_AGGRESSIVE}</div>
                  {aggressiveVault && aggressiveVault !== CONTRACTS.VAULT_AGGRESSIVE && (
                    <div className="text-orange-400 mt-1">Actual: {aggressiveVault}</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Initialization Instructions */}
          {!allVaultsInitialized && (
            <Alert className="bg-blue-500/10 border-blue-500/30">
              <AlertDescription className="text-blue-200 text-sm">
                <strong>For Contract Owner:</strong> Initialize the Router contract with these commands:
                <pre className="mt-2 p-2 bg-black/30 rounded text-xs overflow-x-auto">
{`// Using ethers.js or similar
const router = new ethers.Contract(routerAddress, abi, signer);

await router.setVault(0, "${CONTRACTS.VAULT_CONSERVATIVE}");
await router.setVault(1, "${CONTRACTS.VAULT_BALANCED}");
await router.setVault(2, "${CONTRACTS.VAULT_AGGRESSIVE}");`}
                </pre>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      )}
    </Card>
  )
}
