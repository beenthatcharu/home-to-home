// src/app/api/hubspot/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const hubspotApiKey = process.env.HUBSPOT_API_KEY;

  if (!hubspotApiKey) {
    console.error('HubSpot API key is not configured.');
    // In a real app, you might want to return a more generic error
    // to avoid exposing internal configuration details.
    return NextResponse.json(
      { message: 'Internal Server Error: Service not configured.' },
      { status: 500 }
    );
  }

  // HubSpot API endpoint for creating or updating contacts
  const hubspotApiUrl = `https://api.hubapi.com/crm/v3/objects/contacts`;

  // Format the data for the HubSpot API.
  // The property names must match the internal names in your HubSpot portal.
  // Example: 'email', 'firstname', 'phone', 'city'.
  const properties = {
    email: body.email,
    firstname: body.name,
    phone: body.phone,
    city: body.city,
    // Assuming you have a custom property for 'product_requirement' in HubSpot.
    // If the internal name is different, you must change it here.
    product_requirement: body.productRequirement,
  };

  try {
    //
    // ** YOUR ACTION REQUIRED HERE **
    // This is where you make the actual call to the HubSpot API.
    // The example below uses the fetch API.
    //
    const response = await fetch(hubspotApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${hubspotApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      // If HubSpot returns an error, log it and return a server error.
      console.error('HubSpot API Error:', responseData);
      return NextResponse.json(
        { message: 'Failed to submit data to HubSpot.', error: responseData },
        { status: response.status }
      );
    }

    // If the call is successful, return a success response.
    return NextResponse.json(
        { message: 'Data submitted successfully.', data: responseData },
        { status: 201 } // 201 Created
    );

  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
