import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "../firebase"
import { LoginForm } from "@/Components/login-form"

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Handles email/password login
  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/homepage")
    } catch (err) {
      console.error("Login error:", err)
      if (err.code === 'auth/user-not-found') {
        setError("No account found with this email.")
      } else if (err. code === 'auth/wrong-password') {
        setError("Incorrect password.")
      } else if (err.code === 'auth/invalid-email') {
        setError("Invalid email address.")
      } else if (err.code === 'auth/invalid-credential') {
        setError("Invalid email or password.")
      } else {
        setError(err.message || "Login failed. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  // Handles Google Sign-In
  const handleGoogleSignIn = async () => {
    setError("")
    setLoading(true)

    try {
      const provider = new GoogleAuthProvider()
      
      provider.setCustomParameters({
        prompt: 'select_account'
      })

      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log("User signed in with Google:", user)

      // Check if user exists in backend, if not create them
      try {
        await fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firebaseUid: user.uid,
            name: user.displayName || "Google User",
            email: user. email
          }),
        })
      } catch (backendErr) {
        console.log("Backend sync:", backendErr)
      }

      navigate("/homepage")
    } catch (err) {
      console.error("Google sign-in error:", err)
      
      if (err.code === 'auth/popup-closed-by-user') {
        setError("Sign-in cancelled.  Please try again.")
      } else if (err.code === 'auth/popup-blocked') {
        setError("Popup was blocked. Please allow popups for this site.")
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        setError("An account already exists with the same email address.")
      } else {
        setError(err. message || "Failed to sign in with Google. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  // Navigate to forgot password
  const handleForgotPassword = () => {
    navigate("/forgot-password")
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleLogin}
          onGoogleSignIn={handleGoogleSignIn}
          onForgotPassword={handleForgotPassword}
          error={error}
          loading={loading}
        />

        <div className="text-center mt-4 text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary font-semibold hover:underline">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login