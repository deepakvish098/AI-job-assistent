import { useState } from 'react'
import api from '../api'

export default function AddJob() {
  const [form, setForm] = useState({ company: '', role: '', description: '' })
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/jobs', form)
      setStatus({ type: 'success', msg: 'Job added successfully!' })
      setForm({ company: '', role: '', description: '' })
    } catch {
      setStatus({ type: 'error', msg: 'Failed to add job.' })
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Add Job</h1>
        <p className="text-blue-300 mt-1">Track a new job application</p>
      </div>

      <div className="max-w-lg">
        {status && (
          <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
            {status.msg}
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-blue-900/50 border border-blue-800 rounded-2xl p-6 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-blue-200 mb-1 block">Company</label>
            <input className="w-full bg-blue-950 border border-blue-700 text-white placeholder-blue-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="e.g. Google" value={form.company} onChange={e => setForm({...form, company: e.target.value})} required />
          </div>
          <div>
            <label className="text-sm font-medium text-blue-200 mb-1 block">Role</label>
            <input className="w-full bg-blue-950 border border-blue-700 text-white placeholder-blue-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="e.g. Software Engineer" value={form.role} onChange={e => setForm({...form, role: e.target.value})} required />
          </div>
          <div>
            <label className="text-sm font-medium text-blue-200 mb-1 block">Description <span className="text-blue-400 font-normal">(optional)</span></label>
            <textarea className="w-full bg-blue-950 border border-blue-700 text-white placeholder-blue-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" placeholder="Job description or required skills..." rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>
          <button type="submit" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 rounded-xl font-medium hover:opacity-90 transition shadow-lg shadow-blue-900">
            Add Job
          </button>
        </form>
      </div>
    </div>
  )
}
