import type { NextRequest } from "next/server"
import { addRegistration, getRegistrations } from "@/lib/registrations-store"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    const name = String(body?.name || "").trim()
    const email = String(body?.email || "").trim()

    if (!name || !email) {
      return Response.json({ error: "Name and email are required." }, { status: 400 })
    }
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Invalid email format." }, { status: 400 })
    }

    const entry = addRegistration(name, email)

    // Log to backend console to satisfy "log submitted data"
    console.log("[registration] new entry:", entry)

    // If you want to write to a JSON file, note: most serverless environments are ephemeral.
    // Persisting to a DB or blob store is recommended; JSON file writes are not guaranteed to persist.

    return Response.json({ ok: true, entry }, { status: 201 })
  } catch (err) {
    return Response.json({ error: "Unexpected server error." }, { status: 500 })
  }
}

export async function GET() {
  const registrations = getRegistrations()
  return Response.json({ registrations })
}
