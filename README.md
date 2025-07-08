Gratis Theorie is een simpel leerplatform gebaseerd op Next.js waarmee je gratis kunt oefenen voor je theorie-examen.

## Installatie

1. Kopieer `.env.example` naar `.env.local` en vul je MongoDB connectiestring in:

```bash
cp .env.example .env.local
```

2. Installeer de afhankelijkheden:

```bash
npm install
```

3. (Optioneel) Vul de database met voorbeelddata:

```bash
npx ts-node scripts/seed.ts
```

4. Start de ontwikkelserver:

```bash
npm run dev
```

