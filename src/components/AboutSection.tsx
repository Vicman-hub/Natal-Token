import { motion } from "framer-motion";
import aboutImage from "@/assets/Whisk_mtz3ugmzktozgjzw0yykhdotmmnjrtlmj2my0in.png";
import { Heart, Sprout, Users } from "lucide-react";

const values = [
  { icon: Heart, title: "Care", desc: "Built on the principle that every community member matters." },
  { icon: Sprout, title: "Growth", desc: "Fostering sustainable development for long-term value." },
  { icon: Users, title: "Community", desc: "A decentralized family nurturing shared success." },
];

const AboutSection = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
          About Natal Token
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Inspired by the miracle of birth, Natal Token represents new beginnings in the blockchain space.
          Just as a mother nurtures life, our project nurtures a community-driven ecosystem where every
          participant is valued and every contribution helps the ecosystem grow.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <img
          src={aboutImage}
          alt="Natal Token growth and nurturing"
          className="w-full max-w-4xl mx-auto rounded-3xl shadow-elevated object-cover"
        />
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center p-6"
          >
            <div className="w-14 h-14 gradient-primary rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <v.icon className="text-primary-foreground" size={24} />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">{v.title}</h3>
            <p className="text-sm text-muted-foreground">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
