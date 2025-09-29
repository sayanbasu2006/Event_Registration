"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type SubmitState = { status: "idle" | "submitting" | "success" | "error"; message?: string }

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function EventRegistrationForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [state, setState] = useState<SubmitState>({ status: "idle" })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // basic client validation
    if (!name.trim() || !email.trim()) {
      setState({ status: "error", message: "Name and email are required." })
      return
    }
    if (!emailRegex.test(email)) {
      setState({ status: "error", message: "Please enter a valid email address." })
      return
    }

    try {
      setState({ status: "submitting" })
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Submission failed")
      }
      setName("")
      setEmail("")
      setState({ status: "success", message: "Registration successful! See you at the event." })
    } catch (err: any) {
      setState({ status: "error", message: err?.message || "Something went wrong." })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Ada Lovelace"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-background text-foreground"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          placeholder="ada@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-background text-foreground"
          required
          aria-describedby="email-help"
        />
        <span id="email-help" className="text-xs text-muted-foreground">
          We'll only use this to confirm your registration.
        </span>
      </div>

      <Button
        type="submit"
        disabled={state.status === "submitting"}
        className="bg-primary text-primary-foreground"
        aria-busy={state.status === "submitting" ? "true" : "false"}
      >
        {state.status === "submitting" ? "Registering..." : "Register"}
      </Button>

      {state.status === "success" && (
        <Alert role="status" className="border border-ring/40">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      {state.status === "error" && (
        <Alert variant="destructive" role="alert">
          <AlertTitle>There was a problem</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
    </form>
  )
}
