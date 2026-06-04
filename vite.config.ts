import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // ── Web3 pages get a separate chunk that only loads when accessed
          if (id.includes("Presale") || id.includes("Airdrop")) {
            return "chunk-web3-pages";
          }

          // ── All Web3 in one chunk — these packages have circular deps
          //    that break when split across chunk boundaries.
          if (
            id.includes("@metamask/") ||
            id.includes("@walletconnect/") ||
            id.includes("@reown/") ||
            id.includes("@rainbow-me/") ||
            id.includes("@coinbase/") ||
            id.includes("@base-org/") ||
            id.includes("/wagmi/") ||
            id.includes("/viem/") ||
            id.includes("/ox/") ||
            id.includes("secp256k1") ||
            id.includes("@noble/") ||
            id.includes("@wagmi/")
          ) {
            return "chunk-web3";
          }

          // ── React + Tanstack (Tanstack calls createContext at module init) ──
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/react-router-dom/") ||
            id.includes("/scheduler/") ||
            id.includes("@tanstack/")
          ) {
            return "chunk-react";
          }

          // ── UI libraries ───────────────────────────────────────────────────
          if (id.includes("@radix-ui/")) {
            return "chunk-radix";
          }

          if (id.includes("framer-motion")) {
            return "chunk-framer-motion";
          }

          if (id.includes("recharts") || id.includes("d3-")) {
            return "chunk-charts";
          }

          // ── i18n locale files ──────────────────────────────────────────────
          if (id.includes("node_modules") && /[a-z]{2}_[A-Z]{2}/.test(id)) {
            return "chunk-i18n";
          }

          // ── Everything else ────────────────────────────────────────────────
          if (id.includes("node_modules")) {
            return "chunk-vendor";
          }
        },
      },
    },
  },
}));