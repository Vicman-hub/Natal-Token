import { useState, useCallback, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  Wallet,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";

import {
  useAccount,
  useWriteContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useReadContract,
  useBalance,
  useChainId,
} from "wagmi";

import { useConnectModal } from "@rainbow-me/rainbowkit";

import {
  parseEther,
  formatUnits,
} from "viem";

import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

import { bscChain, PRESALE_CONTRACT } from "../config/chains";

const TOKEN_PRICE = 0.005;
const PRESALE_CAP = 20_000_000;
const MIN_USD = 0.2;

async function fetchBNBPrice(): Promise<number> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd"
    );

    if (!res.ok) {
      return 600;
    }

    const data = await res.json();
    return data?.binancecoin?.usd ?? 600;
  } catch {
    // Prevent UI from crashing/blanking when network is blocked/offline.
    return 600;
  }
}


const presaleAbi = [
  {
    name: "buy",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    name: "totalSold",
    inputs: [],
    outputs: [{ type: "uint256", name: "" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

const Presale = () => {
  const [bnbAmount, setBnbAmount] = useState("");

  const [buyHash, setBuyHash] =
    useState<`0x${string}` | null>(null);

  const { isConnected, address } = useAccount();

  const chainId = useChainId();

  const { openConnectModal } = useConnectModal();

  const { writeContract, isPending } =
    useWriteContract();

  const { switchChain, isPending: isSwitching } =
    useSwitchChain();

  const { toast } = useToast();

  // ─────────────────────────────────────
  // BNB PRICE
  // ─────────────────────────────────────

  const { data: bnbPrice = 600 } = useQuery({
    queryKey: ["bnbPrice"],
    queryFn: fetchBNBPrice,
    refetchInterval: 120000,
    staleTime: 60000,
  });

  // ─────────────────────────────────────
  // PRESALE SOLD
  // ─────────────────────────────────────

  const { data: soldRaw } = useReadContract({
    address: PRESALE_CONTRACT,
    abi: presaleAbi,
    functionName: "totalSold",
    query: {
      refetchInterval: 15000,
    },
  });

  const sold = soldRaw
    ? Math.min(
        Number(formatUnits(soldRaw as bigint, 18)),
        PRESALE_CAP
      )
    : 0;

  const progress = (sold / PRESALE_CAP) * 100;

  // ─────────────────────────────────────
  // NETWORK
  // ─────────────────────────────────────

  const wrongNetwork = chainId !== bscChain.id;

  // ─────────────────────────────────────
  // BALANCE
  // ─────────────────────────────────────

  const { data: nativeBalance } = useBalance({
    address,
    chainId: bscChain.id,
  });

  // ─────────────────────────────────────
  // CALCULATIONS
  // ─────────────────────────────────────

  const amount = useMemo(() => {
    const parsed = Number(bnbAmount);

    if (!Number.isFinite(parsed)) return 0;

    return parsed;
  }, [bnbAmount]);

  const usdValue = amount * bnbPrice;

  const tokens = usdValue / TOKEN_PRICE;

  // ─────────────────────────────────────
  // VALIDATION
  // ─────────────────────────────────────

  const validationError = useMemo(() => {
    if (!bnbAmount || amount <= 0) {
      return null;
    }

    if (/e/i.test(bnbAmount)) {
      return "Scientific notation is not allowed";
    }

    if (usdValue < MIN_USD) {
      return `Minimum purchase is $${MIN_USD}`;
    }

    if (nativeBalance) {
      const balance = Number(
        formatUnits(nativeBalance.value, 18)
      );

      if (amount > balance) {
        return "Insufficient BNB balance";
      }
    }

    return null;
  }, [
    bnbAmount,
    amount,
    usdValue,
    nativeBalance,
  ]);

  // ─────────────────────────────────────
  // MAX
  // ─────────────────────────────────────

  const handleMax = useCallback(() => {
    if (!nativeBalance) return;

    const raw = Number(
      formatUnits(nativeBalance.value, 18)
    );

    const buffered = Math.max(0, raw - 0.002);

    setBnbAmount(buffered.toFixed(6));
  }, [nativeBalance]);

  // ─────────────────────────────────────
  // TX RECEIPT
  // ─────────────────────────────────────

  const { isSuccess: buySuccess } =
    useWaitForTransactionReceipt({
      hash: buyHash ?? undefined,
      query: {
        enabled: !!buyHash,
      },
    });

  // ─────────────────────────────────────
  // SUCCESS
  // ─────────────────────────────────────

  useEffect(() => {
    if (!buySuccess) return;

    toast({
      title: "Purchase successful",
      description:
        "Tokens will be delivered after presale ends.",
    });

    setBnbAmount("");

    setBuyHash(null);
  }, [buySuccess, toast]);

  // ─────────────────────────────────────
  // BUY
  // ─────────────────────────────────────

  const handleBuy = useCallback(async () => {
    if (
      !bnbAmount ||
      !isConnected ||
      !address ||
      validationError
    ) {
      return;
    }

    try {
      if (wrongNetwork) {
        switchChain({
          chainId: bscChain.id,
        });

        toast({
          title: "Switch Network",
          description:
            "Please switch to BNB Smart Chain.",
        });

        return;
      }

      toast({
        title: "Transaction started",
        description: "Check your wallet...",
      });

      const value = parseEther(bnbAmount);

      writeContract(
        {
          address: PRESALE_CONTRACT,
          abi: presaleAbi,
          functionName: "buy",
          args: [],
          value,
          account: address,
          chain: bscChain,
        },
        {
          onSuccess: (hash) => {
            setBuyHash(hash);
          },

          onError: (err) => {
            toast({
              variant: "destructive",
              title: "Transaction failed",
              description: err.message,
            });
          },
        }
      );
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Transaction failed",
        description: (error as Error).message,
      });
    }
  }, [
    bnbAmount,
    isConnected,
    address,
    validationError,
    wrongNetwork,
    switchChain,
    writeContract,
    toast,
  ]);

  // ─────────────────────────────────────
  // UI STATES
  // ─────────────────────────────────────

  const isBusy =
    isPending ||
    isSwitching ||
    !!buyHash;

  const canBuy =
    !!bnbAmount &&
    amount > 0 &&
    !validationError &&
    !isBusy &&
    !wrongNetwork;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 gradient-hero">
        <div className="container mx-auto px-4 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="gradient-card rounded-3xl p-6 md:p-8 border space-y-6"
          >
            <div className="text-center space-y-1">
              <h1 className="text-3xl font-bold">
                NATAL Presale
              </h1>

              <p className="text-sm text-muted-foreground">
                1 NATAL = ${TOKEN_PRICE}
              </p>
            </div>

            {!isConnected ? (
              <Button
                onClick={() => openConnectModal?.()}
                className="w-full py-4 flex items-center justify-center gap-2"
              >
                <Wallet size={18} />
                Connect Wallet
              </Button>
            ) : (
              <div className="space-y-5">
                {/* Balance */}

                <div className="bg-muted/30 rounded-xl p-4 space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Your Balance
                  </p>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      BNB
                    </span>

                    <span className="font-medium">
                      {nativeBalance
                        ? `${Number(
                            formatUnits(
                              nativeBalance.value,
                              18
                            )
                          ).toFixed(4)} BNB`
                        : "—"}
                    </span>
                  </div>
                </div>

                {/* Amount */}

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <Label>BNB Amount</Label>

                    <span>
                      Balance:{" "}
                      {nativeBalance
                        ? `${Number(
                            formatUnits(
                              nativeBalance.value,
                              18
                            )
                          ).toFixed(4)} BNB`
                        : "—"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min="0"
                      step="any"
                      value={bnbAmount}
                      onChange={(e) =>
                        setBnbAmount(e.target.value)
                      }
                      placeholder="0.0"
                      className="flex-1"
                    />

                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleMax}
                    >
                      Max
                    </Button>
                  </div>

                  {validationError && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle size={12} />
                      {validationError}
                    </p>
                  )}

                  {wrongNetwork && (
                    <p className="text-xs text-yellow-500 flex items-center gap-1">
                      <AlertCircle size={12} />
                      Wrong network selected
                    </p>
                  )}
                </div>

                {/* Preview */}

                {tokens > 0 && !validationError && (
                  <div className="bg-muted/40 rounded-xl p-4 space-y-1">
                    <p className="text-xs text-muted-foreground">
                      You will receive
                    </p>

                    <p className="text-lg font-semibold">
                      {tokens.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}{" "}
                      NATAL
                    </p>

                    <p className="text-xs text-muted-foreground">
                      ≈ ${usdValue.toFixed(2)} USD
                    </p>
                  </div>
                )}

                {/* Progress */}

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Presale Progress</span>

                    <span>
                      {sold.toLocaleString()} /{" "}
                      {PRESALE_CAP.toLocaleString()} NATAL
                    </span>
                  </div>

                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      className="bg-primary h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${progress}%`,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                    />
                  </div>

                  <p className="text-xs text-right text-muted-foreground">
                    {progress.toFixed(2)}% sold
                  </p>
                </div>

                {/* Buy */}

                <Button
                  onClick={handleBuy}
                  disabled={!canBuy}
                  className="w-full py-4 flex items-center justify-center gap-2"
                >
                  {isBusy ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      Buy NATAL
                      <ArrowRight size={18} />
                    </>
                  )}
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Presale;