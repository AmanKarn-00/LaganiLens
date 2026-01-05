import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { LoginForm } from "@/Components/login-form"

const Login = () => {
  const navigate = useNavigate()
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
        await signInWithEmailAndPassword(auth, email, password)
        navigate("/homepage")
      } catch (err) {
        setError(err.message || "Login failed")
      } finally {
        setLoading(false)
      }
    }

    form.addEventListener("submit", handleSubmit)
    return () => form.removeEventListener("submit", handleSubmit)
  }, [navigate])

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <LoginForm />

        {loading && (
          <p className="text-center text-sm text-muted-foreground">
            Signing in...
          </p>
        )}
      </div>
    </div>
  )
}

export default Login
