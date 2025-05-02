import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const defaultImageUrl = 'https://st2.depositphotos.com/3096625/7785/v/450/depositphotos_77856488-stock-illustration-logo-c-monogram-modern-letter.jpg';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const imageUrl = formData.get('image_url')?.toString().trim();

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Use provided image URL or default
    const finalImageUrl = imageUrl || defaultImageUrl;

    // Insert into database
    const newCustomer = await sql`
      INSERT INTO customers (name, email, image_url)
      VALUES (${name}, ${email}, ${finalImageUrl})
      RETURNING id, name, email, image_url
    `;

    return NextResponse.json({
      message: 'Customer created successfully',
      customer: newCustomer[0]
    });
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json(
      { error: 'Error creating customer' },
      { status: 500 }
    );
  }
}