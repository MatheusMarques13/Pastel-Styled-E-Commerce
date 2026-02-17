"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { GoogleIcon, AppleIcon, MailIcon, LockIcon, UserIcon, RocketIcon } from "@/components/ui/Icons";

export default function RegisterPage() {
  const router = useRouter();
  const { register, loginWithGoogle, loginWithApple, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    try {
      await register(name, email, password);
      router.push("/");
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      router.push("/");
    } catch {
      setError("Google sign-up failed");
    }
  };

  const handleAppleLogin = async () => {
    try {
      await loginWithApple();
      router.push("/");
    } catch {
      setError("Apple sign-up failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-blue-light via-surface to-pastel-mint-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <RocketIcon className="w-10 h-10" />
            <span className="text-2xl font-bold text-text-primary">
              Your<span className="text-primary">Shop</span>
            </span>
          </Link>
          <p className="text-text-secondary mt-2">Create your account to get started.</p>
        </div>

        <Card className="p-8">
          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              fullWidth
              icon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              Sign up with Google
            </Button>
            <Button
              variant="outline"
              fullWidth
              icon={<AppleIcon />}
              onClick={handleAppleLogin}
              disabled={isLoading}
            >
              Sign up with Apple
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-text-muted">or register with email</span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl text-center">
                {error}
              </div>
            )}

            <Input
              label="Full Name"
              type="text"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<UserIcon className="w-4 h-4" />}
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<MailIcon className="w-4 h-4" />}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<LockIcon className="w-4 h-4" />}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<LockIcon className="w-4 h-4" />}
            />

            <div className="text-sm text-text-secondary">
              <label className="flex items-start gap-2">
                <input type="checkbox" className="rounded border-border accent-primary mt-0.5" />
                <span>
                  I agree to the{" "}
                  <button type="button" className="text-primary hover:text-primary-dark font-medium">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button type="button" className="text-primary hover:text-primary-dark font-medium">
                    Privacy Policy
                  </button>
                </span>
              </label>
            </div>

            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-text-secondary mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:text-primary-dark font-medium">
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
