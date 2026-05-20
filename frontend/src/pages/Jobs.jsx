import { useEffect, useState } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'

const statusStyle = {
  Applied: 'bg-blue-500/20 text-blue-300',
  Interview: 'bg-yellow-500/20 text-yellow-300',
  Offered: 'bg-green-500/20 text-green-300',
  Rejected: 'bg-red-500/20 text-red-300',
}

function EditModal({ job, onClose, onSave }) {
  const [form, setForm] = useState({ company: job.company, role: job.role, status: job.status })

  const handleSave = async () => {
    await api.put(`/jobs/${job.id}`, form)
    onSave()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-blue-900 border border-blue-700 rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <h2 className="text-lg font-bold text-white mb-4">Edit Job</h2>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-sm font-medium text-blue-200 mb-1 block">Company</label>
            <input className="w-full bg-blue-950 border border-blue-700 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium text-blue-200 mb-1 block">Role</label>
            <input className="w-full bg-blue-950 border border-blue-700 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" value={form.role} onChange={e => setForm({...form, role: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium text-blue-200 mb-1 block">Status</label>
            <select className="w-full bg-blue-950 border border-blue-700 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offered</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={handleSave} className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-xl text-sm font-medium hover:opacity-90 transition">Save</button>
          <button onClick={onClose} className="flex-1 bg-blue-800 text-blue-200 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default function Jobs() {
  const [jobs, setJobs] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState('')
  const [editJob, setEditJob] = useState(null)

  const fetchJobs = async (q = query) => {
    setLoading(true)
    const url = q ? `/search?query=${q}` : '/jobs'
    const r = await api.get(url)
    setJobs(r.data)
    setLoading(false)
  }

  useEffect(() => { fetchJobs() }, [])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const deleteJob = async (id) => {
    if (!confirm('Are you sure?')) return
    await api.delete(`/jobs/${id}`)
    showToast('Job deleted!')
    fetchJobs()
  }

  const handleScrape = async () => {
    setLoading(true)
    const r = await api.get('/scrape')
    showToast(r.data.message)
    fetchJobs()
  }

  return (
    <div className="w-full">
      {toast && (
        <div className="fixed top-6 right-6 bg-blue-500 text-white px-5 py-3 rounded-xl shadow-xl z-50 text-sm font-medium">
          {toast}
        </div>
      )}
      {editJob && <EditModal job={editJob} onClose={() => setEditJob(null)} onSave={() => { fetchJobs(); showToast('Job updated!') }} />}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Jobs</h1>
          <p className="text-blue-300 mt-1 text-sm md:text-base">{jobs.length} applications tracked</p>
        </div>
        <div className="flex gap-2 md:gap-3 w-full md:w-auto">
          <button onClick={handleScrape} className="flex-1 md:flex-none bg-green-500 hover:bg-green-600 text-white px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition">Scrape</button>
          <Link to="/add" className="flex-1 md:flex-none bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition text-center">Add Job</Link>
        </div>
      </div>

      <div className="bg-blue-900/50 border border-blue-800 rounded-2xl mb-6 p-3 md:p-4 flex flex-col sm:flex-row gap-2 md:gap-3">
        <input
          className="flex-1 bg-blue-950 border border-blue-700 text-white placeholder-blue-400 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search by company or role..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && fetchJobs()}
        />
        <div className="flex gap-2">
          <button onClick={() => fetchJobs()} className="bg-blue-500 text-white px-4 md:px-5 py-2 rounded-xl text-sm font-medium hover:bg-blue-600 transition">Search</button>
          <button onClick={() => { setQuery(''); fetchJobs('') }} className="bg-blue-800 text-blue-200 px-3 md:px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition">Clear</button>
        </div>
      </div>

      <div className="bg-blue-900/50 border border-blue-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-blue-900 border-b border-blue-800">
                  <tr>
                    {['#', 'Company', 'Role', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-800/50">
                  {jobs.map(job => (
                    <tr key={job.id} className="hover:bg-blue-800/30 transition">
                      <td className="px-4 lg:px-6 py-4 text-blue-400 font-mono text-xs">{job.id}</td>
                      <td className="px-4 lg:px-6 py-4 font-semibold text-white text-sm">{job.company}</td>
                      <td className="px-4 lg:px-6 py-4 text-blue-200 text-sm">{job.role}</td>
                      <td className="px-4 lg:px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle[job.status] || 'bg-blue-500/20 text-blue-300'}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-4 flex gap-2">
                        <button onClick={() => setEditJob(job)} className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 px-3 py-1 rounded-lg text-xs font-medium transition">Edit</button>
                        <button onClick={() => deleteJob(job.id)} className="bg-red-500/20 text-red-300 hover:bg-red-500/30 px-3 py-1 rounded-lg text-xs font-medium transition">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3 p-4">
              {jobs.map(job => (
                <div key={job.id} className="bg-blue-800/30 border border-blue-700 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="text-xs text-blue-400 font-mono mb-1">ID: {job.id}</p>
                      <p className="font-semibold text-white text-sm">{job.company}</p>
                      <p className="text-blue-200 text-sm">{job.role}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusStyle[job.status] || 'bg-blue-500/20 text-blue-300'}`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditJob(job)} className="flex-1 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 py-2 rounded-lg text-xs font-medium transition">Edit</button>
                    <button onClick={() => deleteJob(job.id)} className="flex-1 bg-red-500/20 text-red-300 hover:bg-red-500/30 py-2 rounded-lg text-xs font-medium transition">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {!loading && jobs.length === 0 && (
          <div className="text-center py-16 px-4">
            <p className="text-blue-200 font-medium">No jobs found</p>
            <p className="text-blue-400 text-sm mt-1">Add a job or scrape to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}
