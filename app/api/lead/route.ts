import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const response = await fetch(process.env.ERPNEXT_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${process.env.ERPNEXT_API_KEY}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ERPNext API Error:', errorText);
      return NextResponse.json(
        { error: 'Failed to submit lead to ERPNext' },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    return NextResponse.json({ success: true, data: responseData });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
