import { Routes, Route } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import Login from './pages/Login'
import Movie from './pages/Movie'
import ProtectedRoute from './auth/ProtectRoute'
import { useStore } from './store'


const App = observer(() => {
  const { authStore } = useStore()

  useEffect(() => {
    authStore.checkAuth()
  }, [])

  return (
    <div className="min-h-screen bg-[#16171d] text-white">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/movies" element={<ProtectedRoute><Movie /></ProtectedRoute>} />
      </Routes>
    </div>

  )
})

export default App