import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  const client = await clientPromise;
  const questions = await client
    .db()
    .collection('questions')
    .find()
    .project({ question: 1, options: 1, answer: 1 })
    .toArray();
  return NextResponse.json(questions);
}
