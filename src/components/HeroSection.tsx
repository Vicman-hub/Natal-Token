import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/Whisk_a93fb261b601644b4a74798b1ae8822fdr.jpeg";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden pt-16">
    <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <span className="inline-block gradient-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-6">
     NATAL TOKEN • WEB3 NEW BEGINNINGS
  </span>

  <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight mb-6">
    The Future of{" "}
    <span className="text-gradient-primary">Maternity-Inspired</span>{" "}
    Cryptocurrency
  </h1>

  <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
    Natal Token (NATAL) is a Web3 cryptocurrency designed to symbolize care,
    growth, and new beginnings. Built on a fixed supply of{" "}
    <strong>55 million tokens</strong>, it combines emotional storytelling with
    real DeFi utility. Join the presale or claim your airdrop and become part of
    a nurturing decentralized community.
  </p>

  {/* Hidden SEO Text */}
  <p className="sr-only">
    Natal Token crypto project, NATAL coin, Web3 presale, crypto airdrop,
    DeFi token with fixed supply, blockchain maternity themed cryptocurrency.
  </p>

  <div className="flex flex-wrap gap-4">
    <Link
      to="/presale"
      className="gradient-primary text-primary-foreground px-8 py-3.5 rounded-full font-semibold shadow-elevated hover:opacity-90 transition-opacity"
    >
      Join Presale
    </Link>

    <Link
      to="/airdrop"
      className="bg-card text-foreground px-8 py-3.5 rounded-full font-semibold shadow-card border border-border hover:border-primary/30 transition-colors"
    >
      Claim Airdrop
    </Link>
  </div>
</motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden lg:block"
      >
        <img
          src={heroImage}
          alt="Natal Token - Nurturing new beginnings"
          className="rounded-3xl shadow-elevated w-full"
        />
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
