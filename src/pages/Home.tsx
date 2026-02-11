import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export default function Home() {
  const services = [
    {
      title: "Accounting & Bookkeeping",
      desc: "Precision financial management with meticulous attention to detail.",
      link: "/services/accounting",
    },
    {
      title: "Auditing & Assurance",
      desc: "Comprehensive audits ensuring accuracy and regulatory compliance.",
      link: "/services/auditing",
    },
    {
      title: "Tax Advisory",
      desc: "Strategic planning to optimize your tax position responsibly.",
      link: "/services/tax",
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-24 md:py-40 px-6 lg:px-12 relative overflow-hidden">
          {/* Subtle gradient orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/[0.03] blur-[120px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto relative">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm tracking-widest text-muted-foreground uppercase mb-6"
            >
              Chartered Accountants
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
              className="text-4xl md:text-6xl lg:text-7xl mb-8 text-balance"
            >
              Financial clarity for those who 
              <span className="italic gradient-text"> demand excellence</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
            >
              Since 2011, we've partnered with discerning businesses to deliver 
              accounting services of the highest caliber.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="group">
                <Link to="/contact">
                  Schedule Consultation
                  <motion.span
                    className="inline-block ml-1"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    →
                  </motion.span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group">
                <Link to="/services">
                  Our Services <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 border-y border-border/50 relative">
          <div className="container mx-auto px-6 lg:px-12">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8" staggerDelay={0.15}>
              <StaggerItem className="text-center md:text-left">
                <AnimatedCounter target={500} suffix="+" className="text-5xl md:text-6xl font-light mb-2 block" />
                <p className="text-sm text-muted-foreground tracking-wide">Clients Served</p>
              </StaggerItem>
              <StaggerItem className="text-center md:text-left">
                <AnimatedCounter target={13} suffix="+" className="text-5xl md:text-6xl font-light mb-2 block" />
                <p className="text-sm text-muted-foreground tracking-wide">Years of Practice</p>
              </StaggerItem>
              <StaggerItem className="text-center md:text-left">
                <AnimatedCounter target={99} suffix="%" className="text-5xl md:text-6xl font-light mb-2 block" />
                <p className="text-sm text-muted-foreground tracking-wide">Client Retention</p>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <ScrollReveal className="max-w-2xl mb-16">
              <p className="text-sm tracking-widest text-muted-foreground uppercase mb-4">
                Services
              </p>
              <h2 className="text-3xl md:text-4xl mb-6">
                Comprehensive expertise across all financial disciplines
              </h2>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/50" staggerDelay={0.12}>
              {services.map((service, index) => (
                <StaggerItem key={index}>
                  <Link
                    to={service.link}
                    className="group block bg-background p-8 md:p-10 hover:bg-secondary/30 transition-all duration-500 relative overflow-hidden"
                  >
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <span className="text-xs text-muted-foreground tracking-widest">
                        0{index + 1}
                      </span>
                      <h3 className="text-xl md:text-2xl mt-4 mb-4 group-hover:text-accent transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {service.desc}
                      </p>
                      <span className="text-sm flex items-center gap-2 text-foreground group-hover:gap-4 transition-all duration-300">
                        Learn more <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />
          <div className="container mx-auto px-6 lg:px-12">
            <ScrollReveal className="max-w-3xl mx-auto text-center">
              <p className="text-sm tracking-widest text-muted-foreground uppercase mb-6">
                Our Philosophy
              </p>
              <motion.blockquote
                className="text-2xl md:text-3xl lg:text-4xl italic leading-relaxed mb-8"
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
              >
                "Excellence is not a skill. It's an attitude reflected in every balance sheet, 
                every audit, every consultation."
              </motion.blockquote>
              <p className="text-muted-foreground">— GMR & Associates</p>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <ScrollReveal className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl mb-6">
                Ready to elevate your financial strategy?
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Let's discuss how our expertise can serve your business objectives.
              </p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button asChild size="lg">
                  <Link to="/contact">Begin the Conversation</Link>
                </Button>
              </motion.div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
