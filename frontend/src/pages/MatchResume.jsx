import { useEffect, useState } from 'react'
import api from '../api'

export default function MatchResume() {
  const [jobs, setJobs] = useState([])
  const [form, setForm] = useState({ resume: '', job_id: '' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => { api.get('/jobs').then(r => setJobs(r.data)) }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const r = await api.post('/match', form)
    setResult(r.data)
    setLoading(false)
  }

  const score = result ? Math.round(result.result.score * 100) : 0

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Match Resume</h1>
        <p className="text-blue-300 mt-1">See how well your resume matches a job</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="bg-blue-900/50 border border-blue-800 rounded-2xl p-6 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-blue-200 mb-1 block">Your Resume Skills</label>
            <textarea className="w-full bg-blue-950 border border-blue-700 text-white placeholder-blue-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" placeholder="Paste your skills e.g. Python, Flask, SQL, React..." rows={8} value={form.resume} onChange={e => setForm({...form, resume: e.target.value})} required />
          </div>
          <div>
            <label className="text-sm font-medium text-blue-200 mb-1 block">Select Job</label>
            <select className="w-full bg-blue-950 border border-blue-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" value={form.job_id} onChange={e => setForm({...form, job_id: e.target.value})} required>
              <option value="">Choose a job...</option>
              {jobs.map(j => <option key={j.id} value={j.id}>{j.company} — {j.role}</option>)}
            </select>
          </div>
          <button type="submit" disabled={loading} className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 rounded-xl font-medium hover:opacity-90 transition shadow-lg shadow-blue-900 disabled:opacity-50">
            {loading ? 'Matching...' : 'Match Resume'}
          </button>
        </form>

        {result && (
          <div className="bg-blue-900/50 border border-blue-800 rounded-2xl p-6 flex flex-col gap-6">
            <h2 className="text-lg font-bold text-white">Results — {result.job.company}</h2>
            <div className="flex flex-col items-center">
              <div className="relative w-36 h-36">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#1e3a5f" strokeWidth="10" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="url(#grad)" strokeWidth="10"
                    strokeDasharray={`${score * 2.51} 251`} strokeLinecap="round" />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white">{score}%</span>
                  <span className="text-xs text-blue-300">Match</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-200 mb-2">Matched Keywords</p>
              <div className="flex flex-wrap gap-2">
                {result.result.matched.map(k => (
                  <span key={k} className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-medium">{k}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
