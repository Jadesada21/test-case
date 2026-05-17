import { observer } from "mobx-react-lite"
import { useStore } from "../stores"
import Loading from "../components/loading"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const LoginPage = observer(() => {
    const { authStore } = useStore()
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        await authStore.login(username, password)
        if (authStore.isAuthenticated) {
            navigate('/movies')
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="border-2 border-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

                {authStore.error && (
                    <p className="text-red-500 mb-4">{authStore.error}</p>
                )}

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                />
                <button
                    onClick={handleLogin}
                    disabled={authStore.isLoading}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {authStore.isLoading ? <Loading /> : 'Login'}
                </button>
            </div>
        </div>
    )
})

export default LoginPage