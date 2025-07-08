import Link from 'next/link';
import clientPromise from '@/lib/mongodb';

export default async function LearnPage() {
  const client = await clientPromise;
  const lessons = await client
    .db()
    .collection('lessons')
    .find()
    .project({ title: 1, slug: 1 })
    .toArray();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lessen</h1>
      <ul className="space-y-2">
        {lessons.map((lesson: any) => (
          <li key={lesson._id}>
            <Link href={`/learn/${lesson.slug}`} className="text-blue-600 underline">
              {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
