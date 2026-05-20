import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../pages/AuthContext'

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/add', label: 'Add Job' },
  { to: '/match', label: 'Match Resume' },
  { to: '/upload', label: 'Upload Resume' },
  { to: '/recommend', label: 'Recommend' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const { user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setMobileOpen(false)
  }

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-40 md:hidden bg-blue-500 text-white p-2 rounded-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-60 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col shadow-2xl z-50 transition-transform duration-300 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="px-6 py-8 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center font-bold text-white text-sm">AI</div>
            <div>
              <p className="font-bold text-white text-sm">AI Job Assistant</p>
              <p className="text-slate-400 text-xs">Smart Career Tool</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                pathname === l.to
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="px-6 py-4 border-t border-slate-700 space-y-3">
          {user && (
            <>
              <p className="text-slate-300 text-sm font-medium truncate">👤 {user.username}</p>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                Logout
              </button>
            </>
          )}
          <p className="text-slate-500 text-xs">v1.0.0</p>
        </div>
      </aside>
    </>
  )
}
