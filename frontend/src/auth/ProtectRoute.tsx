import { Navigate } from 'react-router-dom'
import { useStore } from '../store'
import { observer } from 'mobx-react-lite'
import Loading from '../components/Loading'

const ProtectedRoute = observer(({ children }: { children: React.ReactNode }) => {
    const { authStore } = useStore()

    if (authStore.isLoading) return <Loading />

    if (!authStore.isAuthenticated) {
        return <Navigate to="/" />
    }
    return children
})

export default ProtectedRoute 