'use server';

/**
 * @fileOverview This file defines the Genkit flow for processing a lead form submission
 * for natural stone products.
 *
 * - personalizedCollectionInfo - A function that handles the lead processing.
 * - PersonalizedCollectionInfoInput - The input type for the function.
 * - PersonalizedCollectionInfoOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCollectionInfoInputSchema = z.object({
  name: z.string().describe('The full name of the person making the enquiry.'),
  email: z.string().email().describe('The email address of the person.'),
  phone: z.string().describe('The phone number of the person.'),
  city: z.string().describe('The city of the person or company.'),
  productRequirement: z.string().describe('The type of furniture the user is interested in.'),
});

export type PersonalizedCollectionInfoInput = z.infer<
  typeof PersonalizedCollectionInfoInputSchema
>;

const PersonalizedCollectionInfoOutputSchema = z.object({
  personalizedCollectionInfo: z
    .string()
    .describe(
      'A summary of the user\'s enquiry for their confirmation.'
    ),
  designTeamIntroduction: z
    .string()
    .describe('A brief, friendly message for the user.'),
});

export type PersonalizedCollectionInfoOutput = z.infer<
  typeof PersonalizedCollectionInfoOutputSchema
>;

export async function personalizedCollectionInfo(
  input: PersonalizedCollectionInfoInput
): Promise<PersonalizedCollectionInfoOutput> {
  return personalizedCollectionInfoFlow(input);
}

const personalizedCollectionInfoPrompt = ai.definePrompt({
  name: 'personalizedCollectionInfoPrompt',
  input: {schema: PersonalizedCollectionInfoInputSchema},
  output: {schema: PersonalizedCollectionInfoOutputSchema},
  prompt: `You are an assistant for a natural stone supplier.
A potential customer has submitted an enquiry form.
Summarize their request in a friendly and professional paragraph for the "personalizedCollectionInfo" field.
Do not include their personal contact details in the summary.
For the "designTeamIntroduction" field, just write "Our team will review your requirements and be in contact shortly."

Enquiry Details:
Name: {{{name}}}
Email: {{{email}}}
Phone: {{{phone}}}
City: {{{city}}}
Product Requirement: {{{productRequirement}}}
`,
});

const personalizedCollectionInfoFlow = ai.defineFlow(
  {
    name: 'personalizedCollectionInfoFlow',
    inputSchema: PersonalizedCollectionInfoInputSchema,
    outputSchema: PersonalizedCollectionInfoOutputSchema,
  },
  async input => {
    const {output} = await personalizedCollectionInfoPrompt(input);
    return output!;
  }
);
