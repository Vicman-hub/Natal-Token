import { Link } from "react-router-dom";
import icon from "../assets/icon.png";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">...</span>
            <span className="font-display text-xl font-bold">Natal Token</span>
          </div>
          <p className="text-sm opacity-70">
            A token of care, growth, and new beginnings. Nurturing the future of decentralized community.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
            <Link to="/presale" className="hover:opacity-100 transition-opacity">Presale</Link>
            <Link to="/airdrop" className="hover:opacity-100 transition-opacity">Airdrop</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Documents</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
<a href="/NatalToken_Whitepaper_v1.docx" className="hover:opacity-100 transition-opacity">Whitepaper</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Audit Report</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Smart Contract</a>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm opacity-50">
        © 2026 Natal Token. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
