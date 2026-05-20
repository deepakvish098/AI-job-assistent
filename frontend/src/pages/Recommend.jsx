import { useState } from 'react'
import api from '../api'

export default function Recommend() {
  const [resume, setResume] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const r = await api.post('/recommend', { resume })
    setResults(r.data)
    setLoading(false)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Job Recommendations</h1>
        <p className="text-blue-300 mt-1">Find the best matching jobs for your skills</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="bg-blue-900/50 border border-blue-800 rounded-2xl p-6 flex flex-col gap-4 h-fit">
          <div>
            <label className="text-sm font-medium text-blue-200 mb-1 block">Your Skills</label>
            <textarea className="w-full bg-blue-950 border border-blue-700 text-white placeholder-blue-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none" placeholder="Paste your skills e.g. Python, Flask, SQL, React..." rows={8} value={resume} onChange={e => setResume(e.target.value)} required />
          </div>
          <button type="submit" disabled={loading} className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-2.5 rounded-xl font-medium hover:opacity-90 transition shadow-lg shadow-purple-900 disabled:opacity-50">
            {loading ? 'Finding matches...' : 'Get Recommendations'}
          </button>
        </form>

        <div className="flex flex-col gap-4">
          {results.length > 0 ? results.map((r, i) => (
            <div key={i} className="bg-blue-900/50 border border-blue-800 rounded-2xl p-5 flex justify-between items-center hover:bg-blue-800/50 transition">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center text-lg font-bold text-purple-300">
                  {i + 1}
                </div>
                <div>
                  <p className="font-bold text-white">{r.company}</p>
                  <p className="text-blue-300 text-sm">{r.role}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-400">{(r.score * 100).toFixed(1)}%</p>
                <p className="text-xs text-blue-400">match</p>
              </div>
            </div>
          )) : (
            <div className="bg-blue-900/50 border border-blue-800 rounded-2xl p-12 text-center">
              <p className="text-blue-200 font-medium">Enter your skills to get recommendations</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
