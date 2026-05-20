import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import AddJob from './pages/AddJob'
import MatchResume from './pages/MatchResume'
import UploadResume from './pages/UploadResume'
import Recommend from './pages/Recommend'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider, useAuth } from './pages/AuthContext'

function ProtectedLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-blue-950">
      <Navbar />
      <main className="md:ml-60 flex-1 p-4 md:p-8 pt-16 md:pt-8">
        {children}
      </main>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  
  return <ProtectedLayout>{children}</ProtectedLayout>;
}

function AppRoutes() {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
      <Route path="/add" element={<ProtectedRoute><AddJob /></ProtectedRoute>} />
      <Route path="/match" element={<ProtectedRoute><MatchResume /></ProtectedRoute>} />
      <Route path="/upload" element={<ProtectedRoute><UploadResume /></ProtectedRoute>} />
      <Route path="/recommend" element={<ProtectedRoute><Recommend /></ProtectedRoute>} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
