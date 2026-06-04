/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PRESALE_CONTRACT: `0x${string}`;
  readonly VITE_USDT_BSC: `0x${string}`;
  readonly VITE_WALLETCONNECT_PROJECT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}