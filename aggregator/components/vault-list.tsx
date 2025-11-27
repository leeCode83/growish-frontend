"use client"

import { VaultType } from "@/lib/types"
import { getAllVaultTypes } from "@/lib/constants"
import { VaultCard } from "./vault-card"

interface VaultListProps {
  filter?: VaultType | "all"
  onVaultSelect?: (vaultType: VaultType) => void
}

// Mock data - replace with real data from API/blockchain
const mockVaultData = {
  [VaultType.CONSERVATIVE]: {
    totalDeposited: 1250000,
    currentAPY: 4.2,
    userDeposit: 5000,
  },
  [VaultType.BALANCED]: {
    totalDeposited: 850000,
    currentAPY: 5.5,
    userDeposit: 3000,
  },
  [VaultType.AGGRESSIVE]: {
    totalDeposited: 620000,
    currentAPY: 6.8,
    userDeposit: 0,
  },
}

export function VaultList({ filter = "all", onVaultSelect }: VaultListProps) {
  const vaultTypes = getAllVaultTypes()
  const filteredVaults = filter === "all" ? vaultTypes : vaultTypes.filter((type) => type === filter)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredVaults.map((vaultType) => {
        const data = mockVaultData[vaultType]
        return (
          <VaultCard
            key={vaultType}
            vaultType={vaultType}
            totalDeposited={data.totalDeposited}
            currentAPY={data.currentAPY}
            userDeposit={data.userDeposit}
            onDeposit={() => onVaultSelect?.(vaultType)}
          />
        )
      })}
    </div>
  )
}
