import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  const client = await clientPromise;
  const lessons = await client
    .db()
    .collection('lessons')
    .find()
    .project({ title: 1, slug: 1 })
    .toArray();
  return NextResponse.json(lessons);
}
