import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { SignupForm } from "@/components/signup-form";

const Signup = () => {
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    // Prevent default browser form submission
    if (e && e.preventDefault) e.preventDefault();
    
    setError("");

    // Basic Validations
    if (!username || !username.trim()) {
      setError("Please enter a username");
      return;
    }
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
      // 1. Create User in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Save the Username and Email to Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
        uid: user.uid,
        createdAt: new Date(),
      });

      console.log("Success! User registered:", username);
      navigate("/homepage");
    } catch (err) {
      console.error("Signup error:", err);
      // Clean up common Firebase error messages for the user
      const friendlyError = err.code === 'auth/email-already-in-use' 
        ? "This email is already registered." 
        : err.message;
      setError(friendlyError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        {/* IMPORTANT: Verify that SignupForm.jsx is using these exact prop names.
          If SignupForm uses 'onChangeUsername' instead of 'setUsername', typing will fail.
        */}
        <SignupForm
          username={username}
          setUsername={setUsername} 
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          onSubmit={handleSignup}
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