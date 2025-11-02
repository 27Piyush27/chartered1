import { useParams, Link, useNavigate } from "react-router-dom";
import { services } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calculator, FileCheck, Receipt, FileText, PieChart, Settings, CheckCircle, Shield, Search, AlertCircle, TrendingUp, Scale, Users, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const iconMap: Record<string, React.ReactNode> = {
  Calculator: <Calculator className="h-8 w-8" />,
  FileCheck: <FileCheck className="h-8 w-8" />,
  Receipt: <Receipt className="h-8 w-8" />,
  FileText: <FileText className="h-5 w-5" />,
  PieChart: <PieChart className="h-5 w-5" />,
  Settings: <Settings className="h-5 w-5" />,
  CheckCircle: <CheckCircle className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  Search: <Search className="h-5 w-5" />,
  AlertCircle: <AlertCircle className="h-5 w-5" />,
  TrendingUp: <TrendingUp className="h-5 w-5" />,
  Scale: <Scale className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
};

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <Button asChild>
            <Link to="/services">Back to Services</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleRequestService = () => {
    const currentUser = localStorage.getItem("gmr_current_v5");
    
    if (!currentUser) {
      toast.error("Please login to request services");
      navigate("/auth");
      return;
    }

    const user = JSON.parse(currentUser);
    const requests = JSON.parse(localStorage.getItem("gmr_requests_v5") || "[]");
    
    const newRequest = {
      id: Date.now().toString(),
      userId: user.email,
      serviceId: service.id,
      serviceName: service.title,
      status: "pending",
      requestDate: new Date().toISOString(),
      progress: 0,
    };

    requests.push(newRequest);
    localStorage.setItem("gmr_requests_v5", JSON.stringify(requests));

    toast.success("Service requested successfully! Check your dashboard for updates.");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4">
          <Button
            asChild
            variant="secondary"
            className="mb-6"
          >
            <Link to="/services">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
            </Link>
          </Button>
          
          <div className="max-w-3xl">
            <div className="bg-white/10 w-20 h-20 rounded-xl flex items-center justify-center text-white mb-6">
              {iconMap[service.icon]}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
              {service.title}
            </h1>
            <p className="text-xl opacity-95 animate-fade-in">{service.desc}</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {service.features.map((feature, index) => (
              <Card
                key={index}
                className="shadow-card animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg text-primary flex-shrink-0">
                      {iconMap[feature.icon]}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Process</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {service.timeline.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-6 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    {index < service.timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-primary/30 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {service.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
            Request this service now and our expert team will get in touch with you within 24 hours.
          </p>
          <Button
            onClick={handleRequestService}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 shadow-lg"
          >
            Request {service.title}
          </Button>
        </div>
      </section>
    </div>
  );
}
