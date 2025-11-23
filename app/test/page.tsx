import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { JobOffer } from '@/lib/types'
import { unstable_noStore as noStore } from 'next/cache'

async function JobsList() {
  noStore() // ← Remplace export const dynamic
  
  const supabase = await createClient()
  
  const { data: jobs, error, count } = await supabase
    .from('job_offers')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          ❌ Erreur de connexion
        </h1>
        <p className="text-gray-700 mb-4">{error.message}</p>
        <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          ✅ Connexion Supabase réussie !
        </h1>
        <p className="text-gray-600">
          {count} offre(s) trouvée(s)
        </p>
      </div>

      <div className="space-y-6">
        {jobs?.map((job: JobOffer) => (
          <article 
            key={job.id} 
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {job.title}
                </h2>
                <div className="flex items-center gap-3 text-gray-600">
                  <span className="font-semibold">{job.company}</span>
                  {job.location && (
                    <>
                      <span>•</span>
                      <span>📍 {job.location}</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className={`text-4xl font-bold px-6 py-3 rounded-xl ${
                job.match_score >= 80 ? 'bg-green-100 text-green-700' :
                job.match_score >= 60 ? 'bg-blue-100 text-blue-700' :
                job.match_score >= 40 ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {job.match_score}%
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {job.description}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <span>✅</span> Points forts
                </h3>
                <ul className="text-sm space-y-1 text-green-700">
                  {job.strengths.map((strength, i) => (
                    <li key={i}>• {strength}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                  <span>⚠️</span> Points d'attention
                </h3>
                <ul className="text-sm space-y-1 text-orange-700">
                  {job.weaknesses.map((weakness, i) => (
                    <li key={i}>• {weakness}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <span>💬</span> Phrase d'accroche
              </h3>
              <p className="text-blue-800 italic text-sm">
                "{job.pitch}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              
            <a href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
              >
                Voir l'offre originale
                <span>→</span>
              </a>
              <span className="text-sm text-gray-500">
                Ajoutée le {new Date(job.created_at).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
          </article>
        ))}
      </div>

      <details className="mt-8 bg-gray-800 text-white p-6 rounded-lg">
        <summary className="cursor-pointer font-semibold">
          🔍 Données brutes (debug)
        </summary>
        <pre className="mt-4 overflow-auto text-xs">
          {JSON.stringify(jobs, null, 2)}
        </pre>
      </details>
    </>
  )
}

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <Suspense fallback={
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des données...</p>
          </div>
        }>
          <JobsList />
        </Suspense>
      </div>
    </div>
  )
}