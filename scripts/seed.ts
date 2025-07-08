import clientPromise from '../lib/mongodb';

async function seed() {
  const client = await clientPromise;
  const db = client.db();

  await db.collection('lessons').deleteMany({});
  await db.collection('lessons').insertMany([
    {
      slug: 'verkeersborden',
      title: 'Verkeersborden',
      content: '<p>In deze les leer je de basis van de verkeersborden.</p>',
    },
    {
      slug: 'voorrangsregels',
      title: 'Voorrangsregels',
      content: '<p>In deze les leer je over de belangrijkste voorrangsregels.</p>',
    },
  ]);

  await db.collection('questions').deleteMany({});
  await db.collection('questions').insertMany([
    {
      question: 'Wat betekent een rood verkeerslicht?',
      options: ['Stoppen', 'Gas geven', 'Niets'],
      answer: 0,
    },
    {
      question: 'Wat doe je bij een stopbord?',
      options: ['Altijd stoppen', 'Kijken en doorrijden', 'Alleen stoppen bij verkeer'],
      answer: 0,
    },
  ]);

  console.log('Database seeded');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
