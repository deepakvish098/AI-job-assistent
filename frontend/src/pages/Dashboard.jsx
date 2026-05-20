import { useEffect, useState } from 'react'
import api from '../api'

const statusColors = {
  Applied: 'from-blue-500 to-blue-600',
  Interview: 'from-yellow-500 to-orange-500',
  Offered: 'from-green-500 to-emerald-600',
  Rejected: 'from-red-500 to-rose-600',
}

export default function Dashboard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    api.get('/dashboard').then(r => setData(r.data))
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-blue-300 mt-1">Track your job application progress</p>
      </div>

      {data ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg shadow-blue-900">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100 text-sm font-medium uppercase tracking-wide">Total Jobs</p>
                  <p className="text-5xl font-bold mt-2">{data.total_jobs}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center font-bold text-sm">All</div>
              </div>
            </div>

            {data.jobs_by_status.map(s => (
              <div key={s.status} className={`bg-gradient-to-br ${statusColors[s.status] || 'from-slate-500 to-slate-600'} text-white rounded-2xl p-6 shadow-lg`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/80 text-sm font-medium uppercase tracking-wide">{s.status || 'Unknown'}</p>
                    <p className="text-5xl font-bold mt-2">{s.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-900/50 border border-blue-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Application Status Overview</h2>
            <div className="flex flex-col gap-4">
              {data.jobs_by_status.map(s => (
                <div key={s.status}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-blue-200 font-medium">{s.status}</span>
                    <span className="text-blue-400">{data.total_jobs > 0 ? Math.round((s.count / data.total_jobs) * 100) : 0}%</span>
                  </div>
                  <div className="h-2 bg-blue-950 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${statusColors[s.status] || 'from-slate-400 to-slate-500'} rounded-full transition-all duration-500`}
                      style={{ width: `${data.total_jobs > 0 ? (s.count / data.total_jobs) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full" />
        </div>
      )}
    </div>
  )
}
