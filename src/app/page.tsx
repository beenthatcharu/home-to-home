
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import LeadFormSection from '@/components/landing/LeadFormSection';
import CoreStrength from '@/components/landing/CoreStrength';
import ProductRange from '@/components/landing/ProductRange';
import CTASection from '@/components/landing/CTASection';
import WhyChooseUs from '@/components/landing/WhyChooseUs';
import Footer from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="relative bg-background text-foreground pb-24 md:pb-0">
      <div className="relative z-10">
        <Header />
        <main className="flex-grow">
          <div className="relative">
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1589863089941-51eddece5107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxoYW5kY3JhZnRlZCUyMGZ1cm5pdHVyZXxlbnwwfHx8fDE3NjQ3NDM2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Handcrafted furniture"
                fill
                className="object-cover"
                data-ai-hint="handcrafted furniture"
              />
              <div className="absolute inset-0 bg-black/80" />
            </div>
            <div className="relative container mx-auto px-6 pt-12 md:pt-24 pb-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <Hero />
                <LeadFormSection />
              </div>
            </div>
          </div>
          <CoreStrength />
          <ProductRange />
          <WhyChooseUs />
          <CTASection />
        </main>
        <Footer />
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-4 bg-background/80 backdrop-blur-sm border-t border-border">
        <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="#form">Enquire Now</Link>
        </Button>
      </div>
    </div>
  );
}
