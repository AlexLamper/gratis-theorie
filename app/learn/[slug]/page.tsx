import clientPromise from '@/lib/mongodb';
import { notFound } from 'next/navigation';

export default async function LessonPage({ params }: { params: { slug: string } }) {
  const client = await clientPromise;
  const lesson = await client
    .db()
    .collection('lessons')
    .findOne({ slug: params.slug });

  if (!lesson) {
    notFound();
  }

  return (
    <article className="prose">
      <h1>{lesson?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: lesson?.content || '' }} />
    </article>
  );
}
