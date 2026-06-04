import { createConfig, http } from 'wagmi'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { bsc, mainnet } from 'viem/chains'
import type { Chain } from 'viem'

// ─────────────────────────────────────
// CHAINS
// ─────────────────────────────────────

export const bscChain: Chain = {
  ...bsc,
  rpcUrls: {
    default: {
      http: ['https://bsc-dataseed1.binance.org'],
    },
    public: {
      http: ['https://bsc-dataseed1.binance.org'],
    },
  },
}

export const ethChain: Chain = {
  ...mainnet,
  rpcUrls: {
    default: {
      http: ['https://eth.llamarpc.com'],
    },
    public: {
      http: ['https://eth.llamarpc.com'],
    },
  },
}

// FIX: tuple type
export const chains = [bscChain, ethChain] as const

// ─────────────────────────────────────
// WAGMI CONFIG
// ─────────────────────────────────────

export const config = createConfig({
  chains,
  transports: {
    [bscChain.id]: http(),
    [ethChain.id]: http(),
  },
})

// ─────────────────────────────────────
// RAINBOWKIT CONFIG
// ─────────────────────────────────────

export const rainbowConfig = getDefaultConfig({
  appName: 'Natal token',
  projectId: String(
    import.meta.env.VITE_WALLETCONNECT_PROJECT_ID
  ),
  chains,
  ssr: false,
})

// ─────────────────────────────────────
// ENV VARIABLES
// ─────────────────────────────────────

export const USDT_BSC = import.meta.env.VITE_USDT_BSC

export const PRESALE_CONTRACT =
  import.meta.env.VITE_PRESALE_CONTRACT