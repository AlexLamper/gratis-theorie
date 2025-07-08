import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const client = await clientPromise;
  const lesson = await client
    .db()
    .collection('lessons')
    .findOne({ slug: params.slug });

  if (!lesson) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(lesson);
}
