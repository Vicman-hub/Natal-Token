import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Gift, CheckCircle, Wallet } from "lucide-react";

import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSwitchChain,
} from "wagmi";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { isAddress } from "viem";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { bscChain, PRESALE_CONTRACT } from "../config/chains";

/* =========================
   AIRDROP ABI
========================= */
const airdropAbi = [
  {
    name: "claimAirdrop",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
] as const;

const Airdrop = () => {
  const [wallet, setWallet] = useState("");
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();

  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const { writeContract, isPending } = useWriteContract();
  const { switchChain } = useSwitchChain();
  const { toast } = useToast();

  /* =========================
     TRANSACTION TRACKING
  ========================= */
  const { status } = useWaitForTransactionReceipt({
    hash: txHash,
    query: {
      enabled: !!txHash,
    },
  });

  const claimed = Boolean(txHash && status === "success");

  /* =========================
     CLAIM FUNCTION
  ========================= */
  const handleClaim = async () => {
    try {
      const target = isConnected ? address : wallet;

      if (!target || !isAddress(target)) {
        toast({
          variant: "destructive",
          title: "Invalid wallet",
          description: "Enter a valid wallet address",
        });
        return;
      }

      if (!isConnected) {
        toast({
          variant: "destructive",
          title: "Wallet not connected",
          description: "Please connect wallet first",
        });
        return;
      }

      await switchChain({ chainId: bscChain.id });

      toast({
        title: "Claim started",
        description: "Confirm in your wallet",
      });

      writeContract(
        {
          address: PRESALE_CONTRACT,
          abi: airdropAbi,
          functionName: "claimAirdrop",
          account: address,
          chain: bscChain,
        },
        {
          onSuccess: (hash) => {
            setTxHash(hash);
          },
        }
      );

    } catch (err) {
      toast({
        variant: "destructive",
        title: "Claim failed",
        description: (err as Error).message,
      });
    }
  };

  /* =========================
     UI
========================= */
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 gradient-hero">
        <div className="container mx-auto px-4 max-w-lg">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="gradient-card rounded-3xl p-8 border space-y-6"
          >

            {/* HEADER */}
            <div className="text-center">
              <span className="text-4xl">🎁</span>
              <h1 className="text-3xl font-bold">NATAL Airdrop</h1>
              <p className="text-sm text-muted-foreground">
                Claim your allocated tokens
              </p>
            </div>

            {/* SUCCESS STATE */}
            {claimed ? (
              <div className="text-center space-y-3 py-6">
                <CheckCircle className="mx-auto text-green-500" size={48} />
                <h2 className="text-xl font-semibold">
                  Airdrop Claimed
                </h2>
                <p className="text-sm text-muted-foreground">
                  Transaction confirmed on BSC
                </p>

                {txHash && (
                  <a
                    href={`https://bscscan.com/tx/${txHash}`}
                    target="_blank"
                    className="text-xs text-blue-500 underline"
                  >
                    View Transaction
                  </a>
                )}
              </div>
            ) : (
              <div className="space-y-5">

                {/* CONNECT */}
                {!isConnected && (
                  <Button
                    onClick={() => openConnectModal?.()}
                    className="w-full flex gap-2"
                  >
                    <Wallet size={18} />
                    Connect Wallet
                  </Button>
                )}

                {/* INPUT */}
                {!isConnected && (
                  <input
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    placeholder="0x wallet address"
                    className="w-full px-4 py-3 rounded-xl bg-secondary border"
                  />
                )}

                {/* CLAIM BUTTON */}
                <Button
                  onClick={handleClaim}
                  disabled={isPending || !!txHash}
                  className="w-full flex gap-2"
                >
                  <Gift size={18} />
                  {isPending ? "Claiming..." : "Claim Airdrop"}
                </Button>

              </div>
            )}

            <p className="text-xs text-center text-muted-foreground">
              One claim per wallet. Anti-bot protection enabled.
            </p>

          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Airdrop;