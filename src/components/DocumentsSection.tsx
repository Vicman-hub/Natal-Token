import documentsImage from "@/assets/Whisk_453eb5ac7d0f9f1a2144b102661138efdr.jpeg";
import { FileText, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const docs = [
  {
    icon: FileText,
    title: "Whitepaper",
    desc: "Full project overview, roadmap, tokenomics, and use cases.",
link: "/NatalToken_Whitepaper_v1.docx",
  },
  {
    icon: ShieldCheck,
    title: "Audit Report",
    desc: "Independent security audit with vulnerability analysis and risk rating.",
    link: "#",
  },
];

const DocumentsSection = () => (
  <section className="py-20 bg-card">
    <div className="container mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <img
          src={documentsImage}
          alt="Natal Token documents and transparency"
          className="w-full max-w-4xl mx-auto rounded-3xl shadow-elevated mb-8 object-cover"
        />
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
          Documents
        </h2>
        <p className="text-muted-foreground">Transparency you can trust</p>
      </motion.div>
      <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
        {docs.map((doc, i) => (
          <motion.a
            key={doc.title}
            href={doc.link}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex-1 gradient-card rounded-2xl p-8 shadow-card border border-border hover:shadow-elevated transition-shadow text-left group"
          >
            <doc.icon className="text-primary mb-4" size={32} />
            <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {doc.title}
            </h3>
            <p className="text-sm text-muted-foreground">{doc.desc}</p>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default DocumentsSection;
