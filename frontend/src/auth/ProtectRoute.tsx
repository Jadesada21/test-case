import { Navigate } from 'react-router-dom'
import { useStore } from '../store'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { authStore } = useStore()

    if (!authStore.isAuthenticated) {
        return <Navigate to="/login" />
    }
    return children
}

export default ProtectedRoute