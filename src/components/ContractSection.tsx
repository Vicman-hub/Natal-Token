import { useState } from "react";
import contractImage from "@/assets/hero.jpeg";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

const CONTRACT_ADDRESS = "0x6167D85E83C147E25B35b2445CBB9C2EB90673b1";

const ContractSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12"
        >

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden lg:block"
          >
            <img
              src={contractImage}
              alt="Natal Token secure smart contract on blockchain"
              className="rounded-2xl shadow-card w-full object-cover"
            />
          </motion.div>
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 text-center lg:text-left">
              Natal Token Contract Address
            </h2>

            <p className="text-muted-foreground mb-6 text-center lg:text-left leading-relaxed">
              The official smart contract for <strong>Natal Token (NATAL)</strong> is publicly deployed and verifiable on the blockchain.
              Built with transparency and security in mind, this contract governs all token transactions, presale participation,
              and airdrop distribution within the ecosystem.
            </p>

            <p className="text-muted-foreground mb-6 text-center lg:text-left leading-relaxed">
              Natal Token operates with a <strong>fixed supply of 55 million tokens</strong>, ensuring scarcity and long-term value.
              Always verify the contract address before interacting to avoid scams or impersonation tokens.
            </p>

            {/* <p className="text-sm text-muted-foreground text-center lg:text-left">
            Tip: Only trust this official contract address when purchasing, swapping, or adding NATAL to your wallet.
            </p> */}
          </div>

          
        </motion.div>

        <div className="text-center max-w-2xl mx-auto">

          <div className="inline-flex items-center gap-3 bg-secondary px-6 py-4 rounded-2xl shadow-soft">
            <code className="text-sm md:text-base text-secondary-foreground font-mono truncate">
              {CONTRACT_ADDRESS}
            </code>

            <button
              onClick={handleCopy}
              className="shrink-0 gradient-primary text-primary-foreground p-2.5 rounded-xl hover:opacity-90 transition-opacity"
              title="Copy contract address"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>

          {/* Extra Context Below Address */}
          <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
            This is the only official Natal Token (NATAL) contract. You can paste it into your wallet (e.g., MetaMask)
            to import the token, or verify it on blockchain explorers for full transparency of transactions and supply.
          </p>

        </div>
      </div>
    </section>
  );
};

export default ContractSection;