"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface WelcomeScreenProps {
  username: string
  onLogout: () => void
}

const welcomeMessages = [
  "Welcome back! Ready to get started?",
  "Great to see you again!",
  "You're all set and ready to go!",
  "Happy to have you here!",
]

export default function WelcomeScreen({ username, onLogout }: WelcomeScreenProps) {
  const [message, setMessage] = useState("")
  const [displayedName, setDisplayedName] = useState("")

  useEffect(() => {
    // Pick random welcome message
    const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]
    setMessage(randomMessage)

    // Animate username display
    let index = 0
    const interval = setInterval(() => {
      if (index <= username.length) {
        setDisplayedName(username.substring(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [username])

  return (
    <div className="animate-fade-in space-y-6">
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary via-accent to-primary/80 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" />
          </div>
        </div>

        <CardContent className="pt-0">
          <div className="space-y-6">
            {/* Main welcome section */}
            <div className="text-center space-y-2 -mt-12 relative z-10">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <div className="text-3xl font-bold text-primary-foreground">
                    {displayedName.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome back, <span className="text-primary">{displayedName}</span>!
                </h1>
              </div>

              <p className="text-lg text-muted-foreground mt-4">{message}</p>
            </div>

            {/* Quick stats/info section */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-secondary/50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-primary">0</div>
                <div className="text-xs text-muted-foreground mt-1">Tasks</div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-primary">100%</div>
                <div className="text-xs text-muted-foreground mt-1">Complete</div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-primary">🎉</div>
                <div className="text-xs text-muted-foreground mt-1">Ready</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3 pt-4">
              <Button className="w-full h-10 text-base font-semibold">Get Started</Button>
              <Button
                variant="outline"
                onClick={onLogout}
                className="w-full h-10 text-base font-semibold bg-transparent"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-32 right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}
