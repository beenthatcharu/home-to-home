import { Gem, Scaling, Globe, Settings, Users, Leaf } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const reasons = [
  {
    icon: Gem,
    title: 'Direct Quarry Access & Control',
    description: 'We own and operate our quarries, giving us unparalleled control over material selection, quality, and consistency from the very first step.',
  },
  {
    icon: Scaling,
    title: 'Precision Manufacturing',
    description: 'Our state-of-the-art facilities use calibrated machinery and meticulous processes to ensure every piece meets exacting standards for size, thickness, and finish.',
  },
  {
    icon: Globe,
    title: 'Global Export Expertise',
    description: 'With decades of experience in international logistics and packaging, we guarantee secure, timely, and cost-effective delivery to any port worldwide.',
  },
  {
    icon: Settings,
    title: 'Customization at Scale',
    description: 'Our integrated capabilities allow us to fulfill custom orders for unique sizes, intricate cuts, and specialized finishes, even for large-scale projects.',
  },
  {
    icon: Users,
    title: 'Unmatched Project Support',
    description: 'From initial consultation to final delivery, our dedicated team provides expert guidance, transparent communication, and proactive problem-solving.',
  },
  {
    icon: Leaf,
    title: 'Sustainable & Ethical Sourcing',
    description: 'We are committed to responsible quarrying practices that minimize environmental impact and ensure the well-being of our communities.',
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-semibold uppercase tracking-widest text-accent mb-2">WHY CHOOSE US?</p>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary">
            Unwavering Commitment to Quality and Client Success
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            We are not just suppliers; we are partners in your success. Our vertically integrated model—from quarry to container—ensures every piece of stone we deliver embodies our commitment to excellence. We provide architects, builders, and importers with a reliable, efficient, and quality-driven supply chain they can trust.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card key={index} className="bg-card border-border text-left shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-headline text-xl text-primary">{reason.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{reason.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
