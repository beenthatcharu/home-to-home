'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { personalizedCollectionInfo, type PersonalizedCollectionInfoInput } from '@/ai/flows/personalized-collection-info';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const step1Schema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
});

const step2Schema = z.object({
  city: z.string().min(2, { message: 'City must be at least 2 characters.' }),
  productRequirement: z.string({ required_error: 'Please select a product requirement.' }),
});

const formSchema = step1Schema.merge(step2Schema);

const productRequirements = [
  'Hotel Furniture ',
  'Cafe and Restaurant Furniture ',
  'Farmhouse Furniture',
  'House / Villa Furniture',
  'Furniture of Flat ',
  'Bedroom Furniture ',
  'Living Room Furniture ',
  'Dining Room Furniture ',
  'General Interiors / Others',
];

// Function to send data to the backend API
async function saveToCrm(data: Partial<z.infer<typeof formSchema>>) {
  try {
    const response = await fetch('/api/hubspot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Log the error but don't block the user journey.
      try {
        const errorData = await response.json();
        console.error('Failed to save data to HubSpot', errorData);
      } catch (e) {
        console.error('Failed to save data to HubSpot and failed to parse error response.', await response.text());
      }
    }
  } catch (error) {
    console.error('Error calling /api/hubspot:', error);
  }
}

export default function LeadForm() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      city: '',
    },
  });

  const handleNext = async () => {
    const isValid = await form.trigger(['name', 'email', 'phone']);
    if (isValid) {
      // Save step 1 data to HubSpot
      const step1Data = form.getValues();
      await saveToCrm({
        name: step1Data.name,
        email: step1Data.email,
        phone: step1Data.phone,
      });
      setStep(2);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    // Save final data to HubSpot
    await saveToCrm(values);

    try {
      await personalizedCollectionInfo(values as PersonalizedCollectionInfoInput);
      router.push(`/thank-you`);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to submit your enquiry. Please try again.',
      });
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-2xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-headline">
            Enquire Now
          </CardTitle>
          <div className="text-sm text-muted-foreground">Step {step} of 2</div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input type="email" placeholder="your@email.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl><Input type="tel" placeholder="Your Phone Number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" onClick={handleNext} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Next</Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl><Input placeholder="Your City" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productRequirement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Requirement</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a product category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {productRequirements.map((req) => (
                            <SelectItem key={req} value={req}>{req}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-full" disabled={isLoading}>Back</Button>
                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''}
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
