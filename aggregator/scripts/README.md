# Router Contract Initialization

This directory contains scripts for initializing and managing the Router contract.

## Prerequisites

Before running the initialization script, ensure you have:

1. **Environment Variables** - Create `.env.local` in the `aggregator/` directory:
   ```env
   PRIVATE_KEY=0x... # Contract owner's private key
   RPC_URL=https://rpc.sepolia-api.lisk.com # Optional, defaults to Lisk Sepolia
   ```

2. **Dependencies** - Install required packages:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **TypeScript Execution** - Ensure `tsx` is available:
   ```bash
   npm install -g tsx
   # or use npx
   ```

## Initialize Router Contract

The Router contract must be initialized with vault addresses before users can deposit or withdraw. This is a **one-time setup** that must be performed by the contract owner.

### Run Initialization Script

```bash
cd aggregator
npx tsx scripts/initialize-router.ts
```

### What It Does

The script will:

1. ✅ Verify you are the contract owner
2. ✅ Check if the contract is paused
3. ✅ Display current vault registrations
4. ✅ Register any unregistered vaults:
   - Conservative Vault (RiskLevel 0) → `0x6E69Ed7A9b7F4b1De965328738b3d7Bb757Ea94c`
   - Balanced Vault (RiskLevel 1) → `0x21AF332B10481972B903cBd6C3f1ec51546552e7`
   - Aggressive Vault (RiskLevel 2) → `0xc4E50772bd6d27661EE12d81e62Daa4882F4E6f4`
5. ✅ Verify final state

### Expected Output

```
🔧 Router Contract Initialization
==================================
📍 Router: 0x7dC0da00F845A4272C08E51a57651ac004f5e0C7
👤 Signer: 0x...

✅ Verified: Signer is contract owner
✅ Contract is not paused

📋 Current Vault Registrations:
------------------------------
Conservative (0): ❌ 0x0000000000000000000000000000000000000000
Balanced (1):     ❌ 0x0000000000000000000000000000000000000000
Aggressive (2):   ❌ 0x0000000000000000000000000000000000000000

🚀 Registering 3 vault(s)...

📝 Registering Conservative Vault (RiskLevel 0)...
   Address: 0x6E69Ed7A9b7F4b1De965328738b3d7Bb757Ea94c
   Transaction hash: 0x...
   Waiting for confirmation...
   ✅ Conservative vault registered successfully!

... (similar for Balanced and Aggressive)

🔍 Final Verification:
---------------------
Conservative: ✅ 0x6E69Ed7A9b7F4b1De965328738b3d7Bb757Ea94c
Balanced:     ✅ 0x21AF332B10481972B903cBd6C3f1ec51546552e7
Aggressive:   ✅ 0xc4E50772bd6d27661EE12d81e62Daa4882F4E6f4

🎉 SUCCESS! All vaults are properly registered.
   The Router contract is now ready for deposits and withdrawals.
```

## Troubleshooting

### Error: "PRIVATE_KEY not found in environment variables"

Create `.env.local` file in the `aggregator/` directory with your private key:
```env
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
```

### Error: "Signer is not the contract owner"

Only the contract owner (deployer) can initialize the Router. Make sure you're using the correct private key.

### Error: "Transaction reverted"

Possible causes:
- Contract is paused - unpause it first
- Vault address is invalid (zero address)
- Gas limit too low - the script uses default gas estimation
- Network congestion - try again later

### Contract is Paused

If the script shows "Contract is paused", you need to unpause it first:

```typescript
// Unpause the contract (owner only)
import { createWalletClient, http, parseAbi } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { liskSepolia } from 'viem/chains'

const account = privateKeyToAccount('0x...')
const client = createWalletClient({
  account,
  chain: liskSepolia,
  transport: http('https://rpc.sepolia-api.lisk.com'),
})

const hash = await client.writeContract({
  address: '0x7dC0da00F845A4272C08E51a57651ac004f5e0C7',
  abi: parseAbi(['function unpause() external']),
  functionName: 'unpause',
})
```

## Manual Initialization (Alternative)

If you prefer to initialize manually using a different tool (Hardhat, Foundry, etc.):

```solidity
// Connect to Router contract at 0x7dC0da00F845A4272C08E51a57651ac004f5e0C7

// Register Conservative Vault
router.setVault(0, 0x6E69Ed7A9b7F4b1De965328738b3d7Bb757Ea94c);

// Register Balanced Vault
router.setVault(1, 0x21AF332B10481972B903cBd6C3f1ec51546552e7);

// Register Aggressive Vault
router.setVault(2, 0xc4E50772bd6d27661EE12d81e62Daa4882F4E6f4);
```

## Verify Initialization

You can verify the Router is properly initialized by:

1. **Using the Frontend** - Visit the dashboard and check the "Router Contract Status" card. It should show all vaults as "Initialized".

2. **Using the Script** - Run the initialization script again. If already initialized, it will show:
   ```
   ✅ All vaults are already registered!
      No initialization needed.
   ```

3. **Direct Contract Call** - Query the `vaults(uint8)` function:
   ```typescript
   const conservativeVault = await router.vaults(0); // Should return 0x6E69Ed7A...
   const balancedVault = await router.vaults(1);     // Should return 0x21AF332B...
   const aggressiveVault = await router.vaults(2);   // Should return 0xc4E50772...
   ```

## Security Notes

⚠️ **Never commit `.env.local` to version control!**

The `.env.local` file contains your private key and should be kept secret. It's already in `.gitignore`, but always verify before pushing to GitHub.

## Next Steps

After successful initialization:

1. ✅ The Router is ready for user deposits and withdrawals
2. ✅ Users can interact with all three vault types (Conservative, Balanced, Aggressive)
3. ✅ Batch deposit system will queue deposits and execute them every 6 hours
4. ✅ Users can claim their vault shares after batch execution

For more information about the batch deposit system, see [WEB3_IMPLEMENTATION.md](../WEB3_IMPLEMENTATION.md).
