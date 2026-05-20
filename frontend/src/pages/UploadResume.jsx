import { useState } from 'react'
import api from '../api'

export default function UploadResume() {
  const [file, setFile] = useState(null)
  const [job, setJob] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append('resume_pdf', file)
    formData.append('job', job)
    const r = await api.post('/upload', formData)
    setResult(r.data)
    setLoading(false)
  }

  const score = result ? Math.round(result.result.score * 100) : 0

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Upload Resume</h1>
        <p className="text-blue-300 mt-1">Analyze your PDF resume against a job description</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="bg-blue-900/50 border border-blue-800 rounded-2xl p-6 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-blue-200 mb-1 block">Resume PDF</label>
            <div className="border-2 border-dashed border-blue-700 rounded-xl p-6 text-center hover:border-blue-400 transition cursor-pointer">
              <input type="file" accept=".pdf" className="hidden" id="file" onChange={e => setFile(e.target.files[0])} required />
              <label htmlFor="file" className="cursor-pointer">
                <p className="text-sm font-medium text-blue-200 mb-1">Click to upload PDF</p>
                <p className="text-xs text-blue-400">{file ? file.name : 'PDF files only'}</p>
              </label>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-blue-200 mb-1 block">Job Description</label>
            <textarea className="w-full bg-blue-950 border border-blue-700 text-white placeholder-blue-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" placeholder="Paste the job description here..." rows={6} value={job} onChange={e => setJob(e.target.value)} required />
          </div>
          <button type="submit" disabled={loading} className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 rounded-xl font-medium hover:opacity-90 transition shadow-lg shadow-blue-900 disabled:opacity-50">
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        </form>

        {result && (
          <div className="bg-blue-900/50 border border-blue-800 rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-white">Analysis Result</h2>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white text-center">
              <p className="text-6xl font-bold">{score}%</p>
              <p className="text-blue-100 mt-1 text-sm">Match Score</p>
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
