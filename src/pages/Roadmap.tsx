import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import { MapPin, Calendar, CheckCircle, Star, Globe, Users, Rocket, TrendingUp, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
 
const BUY_URL =
  "https://pancakeswap.finance/add/BNB/0x6167D85E83C147E25B35b2445CBB9C2EB90673b1/500?chain=bsc";

const TG_URL = "https://t.me/nataltoken";
const X_URL = "https://x.com/nataltoken";

const Roadmap = () => {
  const [activePhase, setActivePhase] = useState("all");

  const milestones = [
    {
      id: 1,
      quarter: "Q4 2024",
      phase: "Launch",
      title: "Token Launch",
      description: "Natal Token launch on PancakeSwap with liquidity lock.",
      icon: CheckCircle,
      status: "completed",
      progress: 100,
    },
    {
      id: 2,
      quarter: "Q4 2024",
      phase: "Launch",
      title: "Presale Live",
      description: "Multi-chain presale with BNB, ETH, USDT support.",
      icon: Star,
      status: "completed",
      progress: 100,
    },
    {
      id: 3,
      quarter: "Q1 2025",
      phase: "Expansion",
      title: "DEX Listings",
      description: "Listings on PancakeSwap V3, Uniswap V3.",
      icon: Globe,
      status: "in-progress",
      progress: 60,
    },
    {
      id: 4,
      quarter: "Q2 2025",
      phase: "Expansion",
      title: "CEX Partnerships",
      description: "Negotiations with Tier-2 CEXs (Gate.io, MEXC).",
      icon: MapPin,
      status: "in-progress",
      progress: 40,
    },
    {
      id: 5,
      quarter: "Q3 2025",
      phase: "Expansion",
      title: "Community Airdrop",
      description: "500K NATAL airdrop to early holders and contributors.",
      icon: Users,
      status: "upcoming",
      progress: 0,
    },
    {
      id: 6,
      quarter: "Q4 2025",
      phase: "Expansion",
      title: "Tier-1 CEX Launch",
      description: "Listing on Binance, Bybit or OKX.",
      icon: Calendar,
      status: "upcoming",
      progress: 0,
    },
  ];

  const completedCount = milestones.filter(m => m.status === "completed").length;
  const inProgressCount = milestones.filter(m => m.status === "in-progress").length;
  const totalProgress = Math.round((completedCount / milestones.length) * 100);

  const filteredMilestones = activePhase === "all" 
    ? milestones 
    : milestones.filter(m => m.phase.toLowerCase() === activePhase);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 gradient-hero">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Rocket className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Building the Future</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-4">
              Roadmap
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our journey to bring NATAL to the moon
            </p>
            
            {/* OVERALL PROGRESS */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-md mx-auto mt-10 p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-2xl font-bold text-primary">{totalProgress}%</span>
              </div>
              <Progress value={totalProgress} className="h-3" />
              <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>{completedCount} Completed</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>{inProgressCount} In Progress</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-muted" />
                  <span>{milestones.length - completedCount - inProgressCount} Upcoming</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* PHASE FILTERS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <Button
              variant={activePhase === "all" ? "default" : "outline"}
              className="px-6 py-2 rounded-full"
              onClick={() => setActivePhase("all")}
            >
              All Phases
            </Button>
            <Button
              variant={activePhase === "launch" ? "default" : "outline"}
              className="px-6 py-2 rounded-full"
              onClick={() => setActivePhase("launch")}
            >
              <Rocket className="w-4 h-4 mr-2" />
              Launch
            </Button>
            <Button
              variant={activePhase === "expansion" ? "default" : "outline"}
              className="px-6 py-2 rounded-full"
              onClick={() => setActivePhase("expansion")}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Expansion
            </Button>
          </motion.div>

          {/* TIMELINE GRID */}
          <div className="relative">
            {/* VERTICAL TIMELINE CONNECTOR */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-primary to-muted hidden md:block transform -translate-x-1/2" />
            
            <div className="grid md:grid-cols-2 gap-8 relative">
              {filteredMilestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const isLeft = index % 2 === 0;
                const isCompleted = milestone.status === "completed";
                const isInProgress = milestone.status === "in-progress";
                
                return (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.1, 
                      type: "spring",
                      stiffness: 100,
                      damping: 20 
                    }}
                    className={`relative ${isLeft ? 'md:pr-16' : 'md:pl-16 md:row-start-1'}`}
                  >
                    {/* TIMELINE DOT */}
                    <div className={`absolute hidden md:block top-8 w-4 h-4 rounded-full border-4 border-background transform -translate-x-1/2 z-10 ${
                      isCompleted ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]' : 
                      isInProgress ? 'bg-primary animate-pulse shadow-[0_0_15px_rgba(var(--primary-rgb),0.6)]' :
                      'bg-muted'
                    }`} style={{ left: isLeft ? 'calc(50% - 20px)' : 'calc(50% + 20px)' }} />
                    
                    <Card className={`
                      relative overflow-hidden border
                      ${isCompleted ? 'border-green-500/30 bg-green-500/5' : 
                        isInProgress ? 'border-primary/30 bg-primary/5' :
                        'border-border bg-card'}
                      hover:shadow-xl hover:-translate-y-2 transition-all duration-300
                    `}>
                      {/* STATUS GLOW BACKGROUND */}
                      {(isCompleted || isInProgress) && (
                        <div className={`absolute inset-0 opacity-20 ${
                          isCompleted ? 'bg-green-500' : 'bg-primary'
                        }`} />
                      )}
                      
                      <CardHeader className="pb-3 relative">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`
                              p-2.5 rounded-xl
                              ${isCompleted ? 'bg-green-500/20 text-green-500' : 
                                isInProgress ? 'bg-primary/20 text-primary' :
                                'bg-muted text-muted-foreground'}
                            `}>
                              <Icon size={20} />
                            </div>
                            <div>
                              <CardTitle className="text-lg font-bold">{milestone.title}</CardTitle>
                              <CardDescription className="text-xs">
                                <span className={`
                                  px-2 py-0.5 rounded-full text-xs font-medium
                                  ${isCompleted ? 'bg-green-500/20 text-green-600' : 
                                    isInProgress ? 'bg-primary/20 text-primary' :
                                    'bg-muted text-muted-foreground'}
                                `}>
                                  {milestone.quarter}
                                </span>
                              </CardDescription>
                            </div>
                          </div>
                          
                          {/* STATUS BADGE */}
                          <div className={`
                            px-3 py-1.5 rounded-full text-xs font-semibold
                            ${isCompleted ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 
                              isInProgress ? 'bg-primary text-white shadow-lg shadow-primary/30' :
                              'bg-muted text-muted-foreground'}
                          `}>
                            {isCompleted && <CheckCircle className="w-3 h-3 inline mr-1" />}
                            {milestone.status === "completed" ? "Done" : 
                             milestone.status === "in-progress" ? "Active" : "Planned"}
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="relative">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {milestone.description}
                        </p>
                        
                        {/* PROGRESS BAR */}
                        {milestone.status !== "upcoming" && (
                          <div className="mt-4">
                            <div className="flex justify-between text-xs mb-1.5">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-semibold">{milestone.progress}%</span>
                            </div>
                            <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${milestone.progress}%` }}
                                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                                className={`h-full rounded-full ${
                                  isCompleted ? 'bg-green-500' : 'bg-primary'
                                }`}
                              />
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CALL TO ACTION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center mt-20 p-10 bg-card/50 backdrop-blur-sm rounded-3xl border border-border"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Join the Journey?</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Follow us on socials for real-time updates on roadmap progress.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-lg shadow-primary/30 hover:opacity-90 transition-all hover:scale-105"
              >
                Buy NATAL
                <ArrowRight className="w-4 h-4" />
              </a>
              
              <a
                href={TG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-border hover:bg-accent transition-all"
              >
                Telegram
              </a>

              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-border hover:bg-accent transition-all"
              >
                X/Twitter
              </a>
            </div>
          </motion.div>

        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};
 
export default Roadmap;
