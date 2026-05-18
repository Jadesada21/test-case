import { observer } from "mobx-react-lite"
import { useStore } from "../store"
import Loading from "../components/Loading"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { handleKeyDown } from "../components/KeyDown"


const LoginPage = observer(() => {
    const { authStore } = useStore()
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [errorUsername, setErrorUsername] = useState("")
    const [errorPassword, setErrorPassword] = useState("")

    const handleLogin = async () => {
        await authStore.login(username, password)
        if (authStore.isAuthenticated) {
            navigate('/movies')
        }
    }

    if (authStore.isLoading) return <Loading />

    return (
        <div className="min-h-screen flex justify-center items-center">
            <form
                onSubmit={e => { e.preventDefault(); handleLogin() }}
                className="border-2 border-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

                {authStore.error && (
                    <p className="text-red-500 mb-4 text-center">{authStore.error}</p>
                )}

                {/* username */}
                <div className={`relative flex items-center bg-surface-white transition-colors duration-200
                                         ${errorUsername ? "border-red-500" : "border-gray-200 focus-within:border-gray-600"}
                                        `}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                            if (errorUsername) setErrorUsername("")
                        }}
                        className="mb-4 w-full border p-2 rounded "
                        onBlur={() => {
                            if (!username.trim()) {
                                setErrorUsername("Please enter your username")
                            }
                        }}
                    />
                </div>
                {errorUsername && (
                    <p className="mb-4 text-[12px] font-bold text-red-500 ">{errorUsername}</p>
                )}

                {/* password */}
                <div className={`relative flex items-center bg-surface-white transition-colors duration-200
                  ${errorPassword ? "border-red-500" : "border-gray-200 focus-within:border-gray-600"}
                                        `}
                >
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            if (errorPassword) setErrorPassword("")
                        }}
                        className="w-full border p-2 rounded mb-4"
                        onBlur={() => {
                            if (!password.trim()) {
                                setErrorPassword("Please enter your password")
                            }
                        }}
                    />
                </div>
                {errorPassword && (
                    <p className="mb-4 text-[12px] font-bold text-red-500">{errorPassword}</p>
                )}


                <button
                    type="submit"
                    onClick={handleLogin}
                    disabled={authStore.isLoading}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    Login
                </button>
            </form>
        </div >
    )
})

export default LoginPage