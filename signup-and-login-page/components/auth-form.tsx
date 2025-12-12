"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AuthFormProps {
  onAuthenticate: (username: string) => void
}

export default function AuthForm({ onAuthenticate }: AuthFormProps) {
  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [signupUsername, setSignupUsername] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600))

    if (!loginUsername || !loginPassword) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    onAuthenticate(loginUsername)
    setLoginUsername("")
    setLoginPassword("")
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600))

    if (!signupUsername || !signupPassword || !signupConfirmPassword) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (signupPassword !== signupConfirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (signupPassword.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    onAuthenticate(signupUsername)
    setSignupUsername("")
    setSignupPassword("")
    setSignupConfirmPassword("")
  }

  return (
    <div className="animate-fade-in">
      <Card className="border-0 shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold text-balance">Welcome</CardTitle>
          <CardDescription>Sign in to your account or create a new one</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-username">Username</Label>
                  <Input
                    id="login-username"
                    placeholder="Enter your username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="h-10"
                  />
                </div>

                {error && <div className="text-sm text-destructive animate-slide-up">{error}</div>}

                <Button type="submit" disabled={isLoading} className="w-full h-10 text-base font-semibold">
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-username">Username</Label>
                  <Input
                    id="signup-username"
                    placeholder="Choose a username"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">Confirm Password</Label>
                  <Input
                    id="signup-confirm"
                    type="password"
                    placeholder="Confirm your password"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    className="h-10"
                  />
                </div>

                {error && <div className="text-sm text-destructive animate-slide-up">{error}</div>}

                <Button type="submit" disabled={isLoading} className="w-full h-10 text-base font-semibold">
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
