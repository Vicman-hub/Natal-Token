import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ContractSection from "@/components/ContractSection";
import TokenomicsSection from "@/components/TokenomicsSection";
import DocumentsSection from "@/components/DocumentsSection";
import AboutSection from "@/components/AboutSection";
import Roadmap from "./Roadmap";
// import RoadmapSection from "@/components/RoadmapSection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    if (window.location.hash === "#roadmap") {
      setTimeout(() => {
        document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ContractSection />
      <TokenomicsSection />
      <DocumentsSection />
      <AboutSection />
      <div id="roadmap">
        <Roadmap />
      </div>
      {/* <RoadmapSection /> */}
      <Footer />
    </div>
  );
};

export default Index;
