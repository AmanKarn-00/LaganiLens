import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/firebase"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import hero2 from "@/Assets/logo.jpg"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!email) {
      setError("Please enter your email address")
      return
    }

    setLoading(true)

    try {
      await sendPasswordResetEmail(auth, email)
      setSuccess(true)
    } catch (err) {
      console.error("Password reset error:", err)
      
      if (err.code === 'auth/user-not-found') {
        setError("No account found with this email address.")
      } else if (err. code === 'auth/invalid-email') {
        setError("Please enter a valid email address.")
      } else if (err.code === 'auth/too-many-requests') {
        setError("Too many requests. Please try again later.")
      } else {
        setError(err.message || "Failed to send reset email.  Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  
                  {/* Back Button */}
                  <Button 
                    variant="ghost" 
                    className="-ml-2 w-fit"
                    onClick={() => navigate("/login")}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Login
                  </Button>

                  {/* Header */}
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-primary/10 mb-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold">Forgot Password? </h1>
                    <p className="text-balance text-muted-foreground mt-2">
                      No worries! Enter your email and we'll send you a reset link.
                    </p>
                  </div>

                  {/* Success State */}
                  {success ?  (
                    <div className="flex flex-col items-center gap-4 py-4">
                      <div className="p-3 rounded-full bg-emerald-500/10">
                        <CheckCircle className="h-8 w-8 text-emerald-500" />
                      </div>
                      <div className="text-center">
                        <h2 className="text-lg font-semibold text-emerald-600">Email Sent!</h2>
                        <p className="text-sm text-muted-foreground mt-2">
                          We've sent a password reset link to: 
                        </p>
                        <p className="text-sm font-medium mt-1">{email}</p>
                        <p className="text-xs text-muted-foreground mt-4">
                          Check your inbox and spam folder.  The link will expire in 1 hour.
                        </p>
                      </div>
                      <Button 
                        className="w-full mt-4" 
                        onClick={() => navigate("/login")}
                      >
                        Return to Login
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="text-sm"
                        onClick={() => {
                          setSuccess(false)
                          setEmail("")
                        }}
                      >
                        Try a different email
                      </Button>
                    </div>
                  ) : (
                    /* Reset Form */
                    <form onSubmit={handleResetPassword}>
                      <div className="flex flex-col gap-6">
                        
                        {/* Error Message */}
                        {error && (
                          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                            {error}
                          </div>
                        )}

                        {/* Email Field */}
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            autoFocus
                          />
                        </div>

                        {/* Submit Button */}
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={loading}
                        >
                          {loading ? "Sending..." : "Send Reset Link"}
                        </Button>

                        {/* Back to Login Link */}
                        <div className="text-center text-sm">
                          Remember your password?{" "}
                          <Link 
                            to="/login" 
                            className="text-primary underline underline-offset-4 hover:text-primary/80"
                          >
                            Sign in
                          </Link>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Right Side Image */}
              <div className="relative hidden bg-muted md:block">
                <img
                  src={hero2}
                  alt="LaganiLens"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            Need help? Contact{" "}
            <a href="mailto:support@laganilens.com">support@laganilens.com</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword