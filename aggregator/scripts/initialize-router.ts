/**
 * Router Contract Initialization Script
 * 
 * This script initializes the Router contract by registering all vault addresses.
 * Must be run by the contract owner/deployer.
 * 
 * Usage:
 *   npx tsx scripts/initialize-router.ts
 * 
 * Prerequisites:
 *   - Set PRIVATE_KEY in .env.local (contract owner's private key)
 *   - Set RPC_URL in .env.local (Lisk Sepolia RPC endpoint)
 */

import { createWalletClient, createPublicClient, http, parseAbi, getAddress } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { liskSepolia } from 'viem/chains'

// Contract addresses from contracts.ts
const CONTRACTS = {
  ROUTER: getAddress('0x7dC0da00F845A4272C08E51a57651ac004f5e0C7'),
  VAULT_CONSERVATIVE: getAddress('0x6E69Ed7A9b7F4b1De965328738b3d7Bb757Ea94c'),
  VAULT_BALANCED: getAddress('0x21AF332B10481972B903cBd6C3f1ec51546552e7'),
  VAULT_AGGRESSIVE: getAddress('0xc4E50772bd6d27661EE12d81e62Daa4882F4E6f4'),
}

// RiskLevel enum (must match contract)
enum RiskLevel {
  Conservative = 0,
  Balanced = 1,
  Aggressive = 2,
}

// Minimal Router ABI for initialization
const ROUTER_ABI = parseAbi([
  'function setVault(uint8 riskLevel, address vaultAddress) external',
  'function vaults(uint8 riskLevel) external view returns (address)',
  'function owner() external view returns (address)',
  'function paused() external view returns (bool)',
])

async function main() {
  // Load environment variables
  const privateKey = process.env.PRIVATE_KEY
  const rpcUrl = process.env.RPC_URL || 'https://rpc.sepolia-api.lisk.com'

  if (!privateKey) {
    console.error('❌ Error: PRIVATE_KEY not found in environment variables')
    console.error('   Please set PRIVATE_KEY in .env.local')
    process.exit(1)
  }

  // Create clients
  const account = privateKeyToAccount(privateKey as `0x${string}`)
  const publicClient = createPublicClient({
    chain: liskSepolia,
    transport: http(rpcUrl),
  })
  const walletClient = createWalletClient({
    account,
    chain: liskSepolia,
    transport: http(rpcUrl),
  })

  console.log('🔧 Router Contract Initialization')
  console.log('==================================')
  console.log(`📍 Router: ${CONTRACTS.ROUTER}`)
  console.log(`👤 Signer: ${account.address}`)
  console.log('')

  try {
    // 1. Check if signer is the owner
    const owner = await publicClient.readContract({
      address: CONTRACTS.ROUTER,
      abi: ROUTER_ABI,
      functionName: 'owner',
    })

    if (owner.toLowerCase() !== account.address.toLowerCase()) {
      console.error(`❌ Error: Signer (${account.address}) is not the contract owner (${owner})`)
      console.error('   Only the contract owner can initialize the Router')
      process.exit(1)
    }
    console.log('✅ Verified: Signer is contract owner')

    // 2. Check if contract is paused
    const isPaused = await publicClient.readContract({
      address: CONTRACTS.ROUTER,
      abi: ROUTER_ABI,
      functionName: 'paused',
    })

    if (isPaused) {
      console.warn('⚠️  Warning: Contract is paused')
    } else {
      console.log('✅ Contract is not paused')
    }
    console.log('')

    // 3. Check current vault registrations
    console.log('📋 Current Vault Registrations:')
    console.log('------------------------------')
    
    const conservativeVault = await publicClient.readContract({
      address: CONTRACTS.ROUTER,
      abi: ROUTER_ABI,
      functionName: 'vaults',
      args: [RiskLevel.Conservative],
    })
    const balancedVault = await publicClient.readContract({
      address: CONTRACTS.ROUTER,
      abi: ROUTER_ABI,
      functionName: 'vaults',
      args: [RiskLevel.Balanced],
    })
    const aggressiveVault = await publicClient.readContract({
      address: CONTRACTS.ROUTER,
      abi: ROUTER_ABI,
      functionName: 'vaults',
      args: [RiskLevel.Aggressive],
    })

    const isConservativeSet = conservativeVault !== '0x0000000000000000000000000000000000000000'
    const isBalancedSet = balancedVault !== '0x0000000000000000000000000000000000000000'
    const isAggressiveSet = aggressiveVault !== '0x0000000000000000000000000000000000000000'

    console.log(`Conservative (0): ${isConservativeSet ? '✅' : '❌'} ${conservativeVault}`)
    console.log(`Balanced (1):     ${isBalancedSet ? '✅' : '❌'} ${balancedVault}`)
    console.log(`Aggressive (2):   ${isAggressiveSet ? '✅' : '❌'} ${aggressiveVault}`)
    console.log('')

    // 4. Register vaults if not already set
    const vaultsToRegister: Array<{ riskLevel: RiskLevel; address: `0x${string}`; name: string }> = []

    if (!isConservativeSet) {
      vaultsToRegister.push({
        riskLevel: RiskLevel.Conservative,
        address: CONTRACTS.VAULT_CONSERVATIVE,
        name: 'Conservative',
      })
    }
    if (!isBalancedSet) {
      vaultsToRegister.push({
        riskLevel: RiskLevel.Balanced,
        address: CONTRACTS.VAULT_BALANCED,
        name: 'Balanced',
      })
    }
    if (!isAggressiveSet) {
      vaultsToRegister.push({
        riskLevel: RiskLevel.Aggressive,
        address: CONTRACTS.VAULT_AGGRESSIVE,
        name: 'Aggressive',
      })
    }

    if (vaultsToRegister.length === 0) {
      console.log('✅ All vaults are already registered!')
      console.log('   No initialization needed.')
      return
    }

    console.log(`🚀 Registering ${vaultsToRegister.length} vault(s)...`)
    console.log('')

    // Register each vault
    for (const vault of vaultsToRegister) {
      console.log(`📝 Registering ${vault.name} Vault (RiskLevel ${vault.riskLevel})...`)
      console.log(`   Address: ${vault.address}`)

      try {
        const hash = await walletClient.writeContract({
          address: CONTRACTS.ROUTER,
          abi: ROUTER_ABI,
          functionName: 'setVault',
          args: [vault.riskLevel, vault.address],
        })

        console.log(`   Transaction hash: ${hash}`)
        console.log(`   Waiting for confirmation...`)

        const receipt = await publicClient.waitForTransactionReceipt({ hash })
        
        if (receipt.status === 'success') {
          console.log(`   ✅ ${vault.name} vault registered successfully!`)
        } else {
          console.log(`   ❌ Transaction reverted for ${vault.name} vault`)
        }
        console.log('')
      } catch (error) {
        console.error(`   ❌ Error registering ${vault.name} vault:`, error)
        console.log('')
      }
    }

    // 5. Verify final state
    console.log('🔍 Final Verification:')
    console.log('---------------------')
    
    const finalConservative = await publicClient.readContract({
      address: CONTRACTS.ROUTER,
      abi: ROUTER_ABI,
      functionName: 'vaults',
      args: [RiskLevel.Conservative],
    })
    const finalBalanced = await publicClient.readContract({
      address: CONTRACTS.ROUTER,
      abi: ROUTER_ABI,
      functionName: 'vaults',
      args: [RiskLevel.Balanced],
    })
    const finalAggressive = await publicClient.readContract({
      address: CONTRACTS.ROUTER,
      abi: ROUTER_ABI,
      functionName: 'vaults',
      args: [RiskLevel.Aggressive],
    })

    const allRegistered = 
      finalConservative === CONTRACTS.VAULT_CONSERVATIVE &&
      finalBalanced === CONTRACTS.VAULT_BALANCED &&
      finalAggressive === CONTRACTS.VAULT_AGGRESSIVE

    console.log(`Conservative: ${finalConservative === CONTRACTS.VAULT_CONSERVATIVE ? '✅' : '❌'} ${finalConservative}`)
    console.log(`Balanced:     ${finalBalanced === CONTRACTS.VAULT_BALANCED ? '✅' : '❌'} ${finalBalanced}`)
    console.log(`Aggressive:   ${finalAggressive === CONTRACTS.VAULT_AGGRESSIVE ? '✅' : '❌'} ${finalAggressive}`)
    console.log('')

    if (allRegistered) {
      console.log('🎉 SUCCESS! All vaults are properly registered.')
      console.log('   The Router contract is now ready for deposits and withdrawals.')
    } else {
      console.log('⚠️  Warning: Some vaults may not be registered correctly.')
      console.log('   Please check the transaction receipts above.')
    }

  } catch (error) {
    console.error('❌ Error during initialization:', error)
    process.exit(1)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
