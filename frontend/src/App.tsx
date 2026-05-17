import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Movie from './pages/Movie'
import ProtectedRoute from './auth/ProtectRoute'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/movies" element={<ProtectedRoute><Movie /></ProtectedRoute>} />
    </Routes>
  )
}

export default App