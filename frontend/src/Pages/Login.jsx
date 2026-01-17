import { useState, useEffect } from "react"
import { useNavigate, useOutletContext } from "react-router-dom" // ✅ 1. Import Context Hook
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { LoginForm } from "@/Components/login-form"

const Login = () => {
  const navigate = useNavigate()
  
  // ✅ 2. Get the handleLogin function from Root.jsx
  const { handleLogin } = useOutletContext(); 

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const form = document.querySelector("form")

    if (!form) return

    const handleSubmit = async (e) => {
      e.preventDefault()
      setError("")
      setLoading(true)

      const email = form.querySelector("#email")?.value
      const password = form.querySelector("#password")?.value

      try {
        // 1. Authenticate with Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const firebaseUser = userCredential.user;

        // 2. Create a serializable user object (Firebase objects can be too complex for localStorage)
        const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            // Add any other fields you need
        };

        // ✅ 3. Update Global State & LocalStorage (via Root.jsx)
        handleLogin(userData);

        // 4. Redirect
        navigate("/homepage")
      } catch (err) {
        setError(err.message || "Login failed")
      } finally {
        setLoading(false)
      }
    }

    form.addEventListener("submit", handleSubmit)
    return () => form.removeEventListener("submit", handleSubmit)
  }, [navigate, handleLogin]) // Added handleLogin to dependencies

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <LoginForm />

        {loading && (
          <p className="mt-4 text-center text-sm text-muted-foreground animate-pulse">
            Signing in...
          </p>
        )}
      </div>
    </div>
  )
}

export default Login