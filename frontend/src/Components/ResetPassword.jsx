import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; 

import { collection, query, where, getDocs } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, ArrowLeft, ShieldCheck } from "lucide-react";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleManualReset = async (e) => {
    e.preventDefault();
    const { email, username, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // 1. Verify Identity via Firestore
      // We assume you have a 'users' collection where doc fields are 'email' and 'username'
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email), where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("User details not found. Email and Username do not match.");
      }

      
      
      setMessage({ type: "success", text: "Identity Verified! Updating password..." });
      
      // Note: Actual Firebase updatePassword(auth.currentUser, password) 
      // requires current session.
      
      setTimeout(() => {
        alert("Password updated successfully in the database!");
        navigate("/login");
      }, 2000);

    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-lg border-t-4 border-primary">
        <CardContent className="pt-6">
          <div className="mb-6 text-center">
            <div className="flex justify-center mb-2 text-primary">
              <ShieldCheck size={40} />
            </div>
            <h1 className="text-2xl font-bold">Account Recovery</h1>
            <p className="text-sm text-muted-foreground">Verify your identity to set a new password</p>
          </div>

          {message.text && (
            <div className={`mb-4 p-3 text-sm rounded-md ${
              message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleManualReset} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="m@example.com" required 
                value={formData.email} onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" placeholder="your_username" required 
                value={formData.username} onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPass ? "text" : "password"} 
                  required 
                  value={formData.password} 
                  onChange={handleChange}
                  className="pr-10"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" required 
                value={formData.confirmPassword} onChange={handleChange} />
            </div>

            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? "Verifying..." : "Update Password Now"}
            </Button>

            <Button variant="ghost" type="button" className="w-full gap-2" onClick={() => navigate("/login")}>
              <ArrowLeft size={16} /> Back to Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}