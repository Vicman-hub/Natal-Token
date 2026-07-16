import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Timeline, MapPin, Calendar, CheckCircle, Star, Globe, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
 
const Roadmap = () => {
  const [activeTab, setActiveTab] = useState("2024");

  const milestones = {
    "2024": [
      {
        quarter: "Q4 2024",
        title: "Token Launch",
        description: "Natal Token launch on PancakeSwap with liquidity lock.",
        icon: CheckCircle,
        status: "active",
      },
      {
        quarter: "Q4 2024",
        title: "Presale Live",
        description: "Multi-chain presale with BNB, ETH, USDT support.",
        icon: Star,
        status: "active",
      },
    ],
    "2025": [
      {
        quarter: "Q1 2025",
        title: "DEX Listings",
        description: "Listings on PancakeSwap V3, Uniswap V3.",
        icon: Globe,
        status: "planned",
      },
      {
        quarter: "Q2 2025",
        title: "CEX Partnerships",
        description: "Negotiations with Tier-2 CEXs (Gate.io, MEXC).",
        icon: MapPin,
        status: "planned",
      },
      {
        quarter: "Q3 2025",
        title: "Community Airdrop",
        description: "500K NATAL airdrop to early holders and contributors.",
        icon: Users,
        status: "planned",
      },
      {
        quarter: "Q4 2025",
        title: "Tier-1 CEX Launch",
        description: "Listing on Binance, Bybit or OKX.",
        icon: Calendar,
        status: "planned",
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 gradient-hero">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              NATAL Roadmap
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our journey to bring NATAL to the moon
            </p>
          </motion.div>

          {/* TABS */}
          <div className="flex justify-center mb-12">
            {Object.keys(milestones).map((year) => (
              <Button
                key={year}
                variant={activeTab === year ? "default" : "outline"}
                className="mx-2 px-6 py-3 text-lg font-semibold rounded-xl"
                onClick={() => setActiveTab(year)}
              >
                {year}
              </Button>
            ))}
          </div>

          {/* TIMELINE */}
          <div className="grid md:grid-cols-2 gap-6">
            {milestones[activeTab as keyof typeof milestones].map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <motion.div
                  key={milestone.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="gradient-card border-0 shadow-2xl hover:shadow-glow hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-3 rounded-2xl ${milestone.status === 'active' ? 'gradient-primary text-primary-foreground shadow-soft' : 'bg-muted text-muted-foreground'}`}>
                          <Icon size={24} />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold">{milestone.title}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            {milestone.quarter}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {milestone.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        {milestone.status === "active" ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="font-medium text-green-600">Live</span>
                          </>
                        ) : (
                          <>
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Planned</span>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* CALL TO ACTION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-20 p-8 gradient-card rounded-3xl"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Join the Journey?</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Follow us on socials for real-time updates on roadmap progress.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gradient-primary px-8">
                Buy NATAL
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Telegram
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                X/Twitter
              </Button>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Roadmap;
