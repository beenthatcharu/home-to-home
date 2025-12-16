import Link from 'next/link';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="bg-secondary text-secondary-foreground py-16 md:py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
          Have a Project in Mind?
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-secondary-foreground/80">
          Let's discuss your requirements. Our team is ready to help you source the perfect natural stone for your needs.
        </p>
        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="#form">Enquire Now</Link>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
