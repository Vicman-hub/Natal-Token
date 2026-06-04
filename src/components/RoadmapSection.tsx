import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, CheckCircle, Star, Globe, Users, Rocket, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const roadmapPhases = [
  {
    phase: "Launch",
    color: "from-blue-500 to-cyan-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    icon: Rocket,
  },
  {
    phase: "Expansion",
    color: "from-purple-500 to-pink-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    icon: TrendingUp,
  },
];

const RoadmapSection = () => {
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
  const totalProgress = (completedCount / milestones.length) * 100;

  const filteredMilestones = activePhase === "all" 
    ? milestones 
    : milestones.filter(m => m.phase.toLowerCase() === activePhase);

  return (
    <motion.section
      id="roadmap"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-24 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Roadmap
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Our journey to bring NATAL to the moon
          </p>
          
          {/* PROGRESS INDICATOR */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">
                {completedCount} Completed
              </span>
              <span className="text-muted-foreground">
                {inProgressCount} In Progress
              </span>
              <span className="text-muted-foreground">
                {milestones.length - completedCount - inProgressCount} Upcoming
              </span>
            </div>
            <Progress value={totalProgress} className="h-3" />
            <p className="text-sm text-muted-foreground mt-2 text-center">
              {Math.round(totalProgress)}% Complete
            </p>
          </div>
        </motion.div>

        {/* PHASE FILTERS */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button
            variant={activePhase === "all" ? "default" : "outline"}
            className="px-6 py-2 rounded-full"
            onClick={() => setActivePhase("all")}
          >
            All Phases
          </Button>
          {roadmapPhases.map((phase) => (
            <Button
              key={phase.phase}
              variant={activePhase === phase.phase.toLowerCase() ? "default" : "outline"}
              className="px-6 py-2 rounded-full"
              onClick={() => setActivePhase(phase.phase.toLowerCase())}
            >
              {phase.phase}
            </Button>
          ))}
        </div>

        {/* TIMELINE GRID */}
        <div className="relative">
          {/* TIMELINE CONNECTOR */}
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
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.15, 
                    type: "spring",
                    stiffness: 100,
                    damping: 20 
                  }}
                  className={`relative ${isLeft ? 'md:pr-12' : 'md:pl-12 md:row-start-1'}`}
                >
                  {/* TIMELINE DOT */}
                  <div className={`absolute hidden md:block top-8 w-5 h-5 rounded-full border-4 border-background transform -translate-x-1/2 z-10 ${
                    isCompleted ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 
                    isInProgress ? 'bg-primary animate-pulse shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]' :
                    'bg-muted'
                  }`} style={{ left: isLeft ? 'calc(50% - 24px)' : 'calc(50% + 24px)' }} />
                  
                  <Card className={`
                    relative overflow-hidden border
                    ${isCompleted ? 'border-green-500/30 bg-green-500/5' : 
                      isInProgress ? 'border-primary/30 bg-primary/5' :
                      'border-border bg-card'}
                    hover:shadow-lg hover:-translate-y-1 transition-all duration-300
                  `}>
                    {/* STATUS GLOW */}
                    {(isCompleted || isInProgress) && (
                      <div className={`absolute inset-0 opacity-10 ${
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
                            <CardTitle className="text-lg font-semibold">{milestone.title}</CardTitle>
                            <CardDescription className="text-xs flex items-center gap-1">
                              <span className={`
                                px-2 py-0.5 rounded-full text-xs
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
                          px-3 py-1 rounded-full text-xs font-medium
                          ${isCompleted ? 'bg-green-500 text-white' : 
                            isInProgress ? 'bg-primary text-white' :
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
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{milestone.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${milestone.progress}%` }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
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
      </div>
    </motion.section>
  );
};

export default RoadmapSection;
