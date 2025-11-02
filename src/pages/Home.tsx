import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calculator, FileCheck, Receipt, ArrowRight, Users, Award, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

export default function Home() {
  const stats = [
    { number: "500+", label: "Happy Clients" },
    { number: "13+", label: "Years of Experience" },
    { number: "99%", label: "Client Retention" },
  ];

  const services = [
    {
      icon: <Calculator className="h-8 w-8" />,
      title: "Accounting & Bookkeeping",
      desc: "Precision bookkeeping and financial statement preparation with AI-powered automation.",
      link: "/services/accounting",
    },
    {
      icon: <FileCheck className="h-8 w-8" />,
      title: "Auditing & Assurance",
      desc: "Comprehensive statutory and internal audits to ensure financial accuracy.",
      link: "/services/auditing",
    },
    {
      icon: <Receipt className="h-8 w-8" />,
      title: "Tax Advisory",
      desc: "Strategic tax planning and compliance services to minimize liabilities.",
      link: "/services/tax",
    },
  ];

  const features = [
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Expert Team",
      desc: "Experienced chartered accountants with deep domain expertise.",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Quality Assured",
      desc: "Highest standards of professional service and accuracy.",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: "AI-Enhanced",
      desc: "Cutting-edge technology for faster, more accurate results.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-20 md:py-32 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(96, 165, 250, 0.9)), url(${heroImage})`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI-Enhanced Financial Solutions
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95">
              GMR & Associates combines expert Chartered Accountancy with cutting-edge AI to
              deliver faster, more accurate financial services for your business.
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
              <Link to="/services">
                Explore Our Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-5xl md:text-6xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Professional Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive financial solutions tailored to meet your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="shadow-card hover:shadow-primary transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center text-primary mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.desc}</p>
                  <Button asChild variant="link" className="p-0 text-primary">
                    <Link to={service.link}>
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose GMR & Associates?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-slide-up">
            Ready to Elevate Your Finances?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95 animate-fade-in">
            Let our expert team help you navigate complex financial challenges and achieve your
            business goals with innovative, data-driven solutions.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-white/90 shadow-lg animate-slide-up"
          >
            <Link to="/contact">Schedule a Free Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
