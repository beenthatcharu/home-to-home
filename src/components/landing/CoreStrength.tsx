import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Award, Puzzle, Leaf, Factory, Star } from 'lucide-react';


const coreStrengths = [
  {
    icon: Star,
    title: '30+ Years of Craftsmanship',
    description: 'Decades of experience crafting export-quality furniture — now available factory-direct with complete transparency.',
  },
  {
    icon: Factory,
    title: 'In-House Manufacturing Excellence',
    description: 'See cutting, carving, assembly, upholstery, and finishing happen live inside our advanced production facility.',
  },
  {
    icon: Puzzle,
    title: 'Product & Design',
    description: 'Exclusive collections, customization options, and bulk-order capability for homes, villas, hotels, and large interior projects.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: "We source solid Sheesham, Mango, and Acacia responsibly, while optimizing materials and processes for reduced waste.",
  },
];

const CoreStrength = () => {
  return (
    <section id="about" className="bg-primary text-primary-foreground py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-semibold uppercase tracking-widest text-accent mb-2">Our Versatile Approach</p>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary-foreground">
            Core Strength
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-primary-foreground/80">
            Our Jodhpur factory is home to highly skilled artisans creating furniture for premium global markets with solid wood, impeccable joinery, and timeless detailing.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreStrengths.map((element, index) => {
            const Icon = element.icon;
            return (
              <Card key={index} className="bg-primary border-accent/20 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto p-4 rounded-full w-fit mb-4">
                    <Icon className="h-12 w-12 text-accent" />
                  </div>
                  <CardTitle className="font-headline text-2xl text-primary-foreground">{element.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-foreground/80">{element.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreStrength;