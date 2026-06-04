import { motion } from "framer-motion";

const allocations = [
  { label: "Presale", pct: 40, amount: "22,000,000", color: "bg-primary" },
  { label: "Airdrop", pct: 25, amount: "13,750,000", color: "bg-rose-glow" },
  { label: "Liquidity", pct: 20, amount: "11,000,000", color: "bg-warm-gold" },
  { label: "Team", pct: 10, amount: "5,500,000", color: "bg-soft-lavender" },
  { label: "Development", pct: 5, amount: "2,750,000", color: "bg-sage" },
];

const TokenomicsSection = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
          Tokenomics
        </h2>
        <p className="text-muted-foreground">
          Total Supply: <span className="font-semibold text-foreground">55,000,000 NATAL</span>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
        {allocations.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="gradient-card rounded-2xl p-6 shadow-card border border-border text-center"
          >
            <div className={`w-12 h-12 ${item.color} rounded-xl mx-auto mb-4 flex items-center justify-center text-primary-foreground font-bold text-sm`}>
              {item.pct}%
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1">{item.label}</h3>
            <p className="text-sm text-muted-foreground">{item.amount} NATAL</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TokenomicsSection;
