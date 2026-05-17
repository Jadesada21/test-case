import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Movie from './pages/Movie'
import ProtectedRoute from './auth/ProtectRoute'

function App() {
  return (
    <div className="min-h-screen bg-[#16171d] text-white">
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/movies" element={<ProtectedRoute><Movie /></ProtectedRoute>} /> */}
        <Route path="/movies" element={<Movie />}></Route>
      </Routes>
    </div>

  )
}

export default App