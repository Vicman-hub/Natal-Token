import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ContractSection from "@/components/ContractSection";
import TokenomicsSection from "@/components/TokenomicsSection";
import DocumentsSection from "@/components/DocumentsSection";
import AboutSection from "@/components/AboutSection";
import RoadmapSection from "@/components/RoadmapSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <ContractSection />
    <TokenomicsSection />
    <DocumentsSection />
    <AboutSection />
    <RoadmapSection />
    <Footer />
  </div>
);

export default Index;
