# JobTracker IA 🚀

Outil personnel qui analyse automatiquement les offres d’emploi et génère une candidature ultra-personnalisée en quelques secondes.

### Fonctionnalités
- Scrape Indeed / LinkedIn / HelloWork
- Analyse IA (Groq Llama 3 70B) → % de matching + points forts/faibles
- Phrase d’accroche personnalisée prête à copier-coller
- Tableau de bord avec filtres et historique

### Stack
- Next.js 14 (App Router)
- Tailwind CSS
- Supabase (stockage)
- Groq AI (Llama 3 70B gratuit)
- Vercel (déploiement)

### Démo live
🔗 https://jobtracker-erwan.vercel.app (à mettre à jour après deploy)

### Installation rapide
```bash
git clone https://github.com/tonpseudo/JobTracker-IA.git
cd JobTracker-IA
npm install
cp .env.example .env.local
# → colle tes clés Groq + Supabase
npm run dev