'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import { CheckCircle } from 'lucide-react';

function ThankYouContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-4">
      <div className="max-w-xl mx-auto">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-4">
          Thank You for Your Enquiry!
        </h1>
        <p className="text-lg text-muted-foreground mb-8">Our team will review your requirements and be in contact shortly.</p>
        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <ThankYouContent />
        </Suspense>
    )
}
