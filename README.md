# Gratis Theorie - Gratis Leerplatform voor Theorie-examens

Een modern, gratis leerplatform voor Nederlandse theorie-examens (auto, scooter, motor). Gebouwd met Next.js, MongoDB en Tailwind CSS.

## 🚀 Features

- **100% Gratis**: Geen kosten, geen abonnementen
- **Geen Registratie**: Direct beginnen zonder account
- **Responsive Design**: Werkt perfect op desktop en mobiel
- **Drie Categorieën**: Auto (B), Scooter (AM), Motor (A)
- **Oefenmodus**: Individuele vragen met directe feedback
- **Proefexamens**: Volledige examens met tijdslimiet
- **Moderne UI**: Professioneel design met Tailwind CSS
- **Snelle Performance**: Geoptimaliseerd voor snelheid

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: MongoDB
- **Deployment**: Vercel (recommended)

## 📋 Vereisten

- Node.js 18+ 
- MongoDB database (lokaal of cloud)
- npm of yarn

## 🚀 Installatie

### 1. Clone het project
\`\`\`bash
git clone <repository-url>
cd gratis-theorie
\`\`\`

### 2. Installeer dependencies
\`\`\`bash
npm install
# of
yarn install
\`\`\`

### 3. Environment variabelen instellen
Kopieer `.env.example` naar `.env.local`:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Vul je MongoDB connection string in:
\`\`\`env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gratis-theorie
\`\`\`

### 4. Database setup
Er zijn twee opties voor de database setup:

#### Optie A: MongoDB Atlas (Cloud) - Aanbevolen
1. Ga naar [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Maak een gratis account aan
3. Maak een nieuwe cluster aan
4. Krijg je connection string
5. Voeg deze toe aan `.env.local`

#### Optie B: Lokale MongoDB
1. Installeer MongoDB lokaal
2. Start MongoDB service
3. Gebruik: `MONGODB_URI=mongodb://localhost:27017/gratis-theorie`

### 5. Database seeden met sample data
Run het MongoDB setup script in MongoDB Compass of MongoDB Shell:
\`\`\`javascript
// Kopieer en plak de inhoud van scripts/mongodb-setup.js
\`\`\`

Of gebruik de MongoDB CLI:
\`\`\`bash
mongosh "your-connection-string" --file scripts/mongodb-setup.js
\`\`\`

### 6. Start de development server
\`\`\`bash
npm run dev
# of
yarn dev
\`\`\`

Ga naar [http://localhost:3000](http://localhost:3000)

## 📁 Project Structuur

\`\`\`
gratis-theorie/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── questions/     # Vragen API
│   │   └── categories/    # Categorieën API
│   ├── practice/          # Oefenpagina
│   ├── exams/            # Examenpagina
│   ├── categories/       # Categorieën overzicht
│   └── page.tsx          # Homepage
├── components/           # React componenten
│   └── ui/              # shadcn/ui componenten
├── lib/                 # Utilities
│   └── mongodb.ts       # Database connectie
├── scripts/             # Database scripts
└── public/             # Statische bestanden
\`\`\`

## 🗄️ Database Schema

### Questions Collection
\`\`\`javascript
{
  _id: ObjectId,
  question: String,           // De vraag
  options: [String],          // Antwoordopties (array)
  correctAnswer: Number,      // Index van het juiste antwoord
  explanation: String,        // Uitleg van het antwoord
  category: String,          // "auto", "scooter", "motor"
  difficulty: String,        // "easy", "medium", "hard"
  image: String,             // Optioneel: URL naar afbeelding
  createdAt: Date
}
\`\`\`

### Categories Collection
\`\`\`javascript
{
  _id: ObjectId,
  id: String,                // "auto", "scooter", "motor"
  name: String,              // Display naam
  description: String,       // Beschrijving
  minimumAge: Number,        // Minimum leeftijd
  active: Boolean,           // Of categorie actief is
  createdAt: Date
}
\`\`\`

## 🔧 Configuratie

### Environment Variabelen
- `MONGODB_URI`: MongoDB connection string (verplicht)
- `NEXT_PUBLIC_APP_URL`: Base URL van de applicatie

### MongoDB Indexes
Voor optimale performance worden deze indexes automatisch aangemaakt:
- `{ category: 1 }`
- `{ difficulty: 1 }`
- `{ category: 1, difficulty: 1 }`

## 📱 Features in Detail

### Oefenmodus (`/practice`)
- Willekeurige vragen per categorie
- Directe feedback met uitleg
- Voortgangsindicator
- Navigatie tussen vragen
- Score tracking

### Proefexamens (`/exams`)
- Volledige examens (40 vragen)
- 30 minuten tijdslimiet
- 70% vereist om te slagen
- Vraag navigator
- Eindresultaat met percentage

### Categorieën (`/categories`)
- Overzicht van alle categorieën
- Statistieken per categorie
- Directe links naar oefenen/examens

## 🚀 Deployment

### Vercel (Aanbevolen)
1. Push code naar GitHub
2. Verbind repository met Vercel
3. Voeg environment variabelen toe in Vercel dashboard
4. Deploy automatisch bij elke push

### Andere platforms
Het project werkt op elke Node.js hosting provider:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔄 Data Management

### Nieuwe vragen toevoegen
Voeg vragen toe via MongoDB Compass of programmatisch:
\`\`\`javascript
db.questions.insertOne({
  question: "Je nieuwe vraag?",
  options: ["Optie 1", "Optie 2", "Optie 3", "Optie 4"],
  correctAnswer: 0,
  explanation: "Uitleg van het juiste antwoord",
  category: "auto",
  difficulty: "medium",
  createdAt: new Date()
})
\`\`\`

### Backup en Restore
\`\`\`bash
# Backup
mongodump --uri="your-connection-string" --db=gratis-theorie

# Restore  
mongorestore --uri="your-connection-string" --db=gratis-theorie dump/gratis-theorie/
\`\`\`

## 🎨 Customization

### Styling aanpassen
- Wijzig kleuren in `tailwind.config.ts`
- Pas componenten aan in `components/ui/`
- Globale styles in `app/globals.css`

### Nieuwe categorieën toevoegen
1. Voeg categorie toe aan database
2. Voeg vragen toe voor nieuwe categorie
3. Update frontend componenten indien nodig

## 🐛 Troubleshooting

### Database connectie problemen
- Controleer MongoDB connection string
- Zorg dat IP-adres is whitelisted (Atlas)
- Check firewall instellingen

### Performance problemen
- Controleer database indexes
- Monitor API response times
- Optimaliseer queries indien nodig

### Build errors
- Controleer TypeScript errors
- Zorg dat alle dependencies geïnstalleerd zijn
- Check environment variabelen

## 📄 Licentie

Dit project is open source en beschikbaar onder de MIT licentie.

## 🤝 Bijdragen

Bijdragen zijn welkom! Open een issue of submit een pull request.

## 📞 Support

Voor vragen of problemen, open een issue in de GitHub repository.
