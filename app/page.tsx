import Link from "next/link";

export default function Home() {
  return (
    <section className="text-center space-y-6">
      <h1 className="text-4xl font-bold">Welkom bij Gratis Theorie</h1>
      <p>Oefen en leer volledig gratis voor je theorie examen.</p>
      <div className="flex justify-center gap-4">
        <Link href="/learn" className="rounded bg-blue-600 px-4 py-2 text-white">
          Start met leren
        </Link>
        <Link href="/quiz" className="rounded bg-green-600 px-4 py-2 text-white">
          Maak oefentoets
        </Link>
      </div>
    </section>
  );
}
