import { cookies } from 'next/headers'
import { unstable_noStore as noStore } from 'next/cache'

export default async function DebugPage() {
  // Force le mode dynamique pour Next.js 16
  noStore()
  
  // Test 1 : Variables d'environnement
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Test 2 : Cookies
  let cookiesWork = false
  let cookiesError = null
  try {
    const cookieStore = await cookies()
    cookiesWork = true
  } catch (error: any) {
    cookiesError = error.message
  }

  // Test 3 : Import du client
  let clientImportError = null
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    
    // Test 4 : Connexion réelle
    const { data, error } = await supabase
      .from('job_offers')
      .select('count')
      .limit(1)
    
    if (error) throw error

    return (
      <div className="min-h-screen bg-green-50 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-green-600 mb-6">
            ✅ Tout fonctionne !
          </h1>
          
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded">
              <h2 className="font-bold mb-2">✅ Variables d'environnement</h2>
              <p className="text-sm">URL: {supabaseUrl}</p>
              <p className="text-sm">Key: {supabaseKey?.slice(0, 30)}...</p>
            </div>

            <div className="bg-green-50 p-4 rounded">
              <h2 className="font-bold mb-2">✅ Cookies</h2>
              <p className="text-sm">Fonctionnent correctement</p>
            </div>

            <div className="bg-green-50 p-4 rounded">
              <h2 className="font-bold mb-2">✅ Connexion Supabase</h2>
              <p className="text-sm">Base de données accessible</p>
            </div>
          </div>

          <a href="/test" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Aller à la page de test →
          </a>
        </div>
      </div>
    )
  } catch (error: any) {
    clientImportError = error.message
  }

  // Affichage des erreurs
  return (
    <div className="min-h-screen bg-red-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-red-600 mb-6">
          🐛 Diagnostic des problèmes
        </h1>

        <div className="space-y-4">
          {/* Test 1 */}
          <div className={`p-4 rounded ${supabaseUrl && supabaseKey ? 'bg-green-50' : 'bg-red-50'}`}>
            <h2 className="font-bold mb-2">
              {supabaseUrl && supabaseKey ? '✅' : '❌'} Variables d'environnement
            </h2>
            <div className="text-sm space-y-1">
              <p>NEXT_PUBLIC_SUPABASE_URL: <code>{supabaseUrl || '❌ MANQUANT'}</code></p>
              <p>NEXT_PUBLIC_SUPABASE_ANON_KEY: <code>{supabaseKey?.slice(0, 30) || '❌ MANQUANT'}...</code></p>
            </div>
          </div>

          {/* Test 2 */}
          <div className={`p-4 rounded ${cookiesWork ? 'bg-green-50' : 'bg-red-50'}`}>
            <h2 className="font-bold mb-2">
              {cookiesWork ? '✅' : '❌'} Cookies
            </h2>
            {cookiesError && (
              <p className="text-sm text-red-600">Erreur: {cookiesError}</p>
            )}
          </div>

          {/* Test 3 */}
          <div className="bg-red-50 p-4 rounded">
            <h2 className="font-bold mb-2">❌ Client Supabase</h2>
            <p className="text-sm text-red-600 mb-2">Erreur: {clientImportError}</p>
            <details className="text-xs">
              <summary className="cursor-pointer font-semibold">Stack trace complète</summary>
              <pre className="mt-2 bg-gray-100 p-2 rounded overflow-auto">
                {clientImportError}
              </pre>
            </details>
          </div>
        </div>

        {/* Actions recommandées */}
        <div className="mt-6 bg-blue-50 p-4 rounded">
          <h2 className="font-bold mb-2">🔧 Actions recommandées</h2>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Vérifier que `.env.local` est à la racine du projet</li>
            <li>Redémarrer le serveur après modification des variables</li>
            <li>Vérifier que `lib/supabase/server.ts` utilise les bonnes variables</li>
          </ul>
        </div>
      </div>
    </div>
  )
}