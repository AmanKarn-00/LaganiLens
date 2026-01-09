import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase"; 
import { SignupForm } from "@/components/signup-form";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handles email/password signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", userCredential.user);
      navigate("/homepage");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handles Google Sign-In
  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      // Create a new Google Auth Provider instance
      const provider = new GoogleAuthProvider();
      
      provider.setCustomParameters({
  prompt: 'select_account' // Forces account selection every time
});
      // Sign in with popup
      const result = await signInWithPopup(auth, provider);
      
      // Get user info
      const user = result.user;
      console.log("User signed in with Google:", user);

      // Optional: Get Google Access Token
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;

      // Navigate to homepage after successful sign-in
      navigate("/homepage");
    } catch (err) {
      console.error("Google sign-in error:", err);
      
      // Handle specific error cases
      if (err.code === 'auth/popup-closed-by-user') {
        setError("Sign-in cancelled. Please try again.");
      } else if (err.code === 'auth/popup-blocked') {
        setError("Popup was blocked. Please allow popups for this site.");
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        setError("An account already exists with the same email address.");
      } else {
        setError(err.message || "Failed to sign in with Google. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          onSubmit={handleSignup}
          onGoogleSignIn={handleGoogleSignIn}
          error={error}
          loading={loading}
        />
        <div className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;