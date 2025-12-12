"use client"

import { useState } from "react"
import AuthForm from "@/components/auth-form"
import WelcomeScreen from "@/components/welcome-screen"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")

  const handleAuth = (user: string) => {
    setUsername(user)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUsername("")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isAuthenticated ? (
          <WelcomeScreen username={username} onLogout={handleLogout} />
        ) : (
          <AuthForm onAuthenticate={handleAuth} />
        )}
      </div>
    </main>
  )
}
