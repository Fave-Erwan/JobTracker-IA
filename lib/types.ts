// Types pour la table job_offers de Supabase
export interface JobOffer {
  id: string
  created_at: string
  url: string
  title: string
  company: string
  location?: string
  description: string
  match_score: number
  strengths: string[]
  weaknesses: string[]
  pitch: string
  raw_data?: any
}

// Type pour l'analyse retournée par Groq
export interface JobAnalysis {
  match_score: number
  strengths: string[]
  weaknesses: string[]
  pitch: string
}

// Type pour les données scrapées avant analyse
export interface ScrapedJob {
  title: string
  company: string
  description: string
  location?: string
}

// Type pour les erreurs API
export interface ApiError {
  error: string
  details?: any
}

// Type pour la réponse de l'API analyze-job
export interface AnalyzeJobResponse {
  success: boolean
  data?: JobOffer
  error?: string
}