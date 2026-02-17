"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { GoogleIcon, AppleIcon, MailIcon, LockIcon } from "@/components/ui/Icons";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle, loginWithApple, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      await login(email, password);
      router.push("/");
    } catch {
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      router.push("/");
    } catch {
      setError("Google sign-in failed");
    }
  };

  const handleAppleLogin = async () => {
    try {
      await loginWithApple();
      router.push("/");
    } catch {
      setError("Apple sign-in failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-purple-light via-surface to-pastel-pink-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-3xl">🌸</span>
            <span className="text-2xl font-bold text-text-primary">
              Petal<span className="text-primary">Shop</span>
            </span>
          </Link>
          <p className="text-text-secondary mt-2">Welcome back! Sign in to continue.</p>
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
              Continue with Google
            </Button>
            <Button
              variant="outline"
              fullWidth
              icon={<AppleIcon />}
              onClick={handleAppleLogin}
              disabled={isLoading}
            >
              Continue with Apple
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-text-muted">or sign in with email</span>
            </div>
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl text-center">
                {error}
              </div>
            )}

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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-text-secondary">
                <input type="checkbox" className="rounded border-border accent-primary" />
                Remember me
              </label>
              <button type="button" className="text-primary hover:text-primary-dark font-medium">
                Forgot password?
              </button>
            </div>

            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Register Link */}
          <p className="text-center text-sm text-text-secondary mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:text-primary-dark font-medium">
              Create one
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
