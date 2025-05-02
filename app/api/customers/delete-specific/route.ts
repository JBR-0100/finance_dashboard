import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function DELETE(request: Request) {
  try {
    // Delete customers with names 'madan' and 'yo bro'
    await sql`
      DELETE FROM customers 
      WHERE name IN ('madan', 'yo bro')
    `;

    return NextResponse.json({ message: 'Customers deleted successfully' });
  } catch (error) {
    console.error('Error deleting customers:', error);
    return NextResponse.json(
      { error: 'Error deleting customers' },
      { status: 500 }
    );
  }
} 