export type Registration = {
  id: string
  name: string
  email: string
  createdAt: string
}

let REGISTRATIONS: Registration[] = []

export function getRegistrations(): Registration[] {
  return REGISTRATIONS
}

export function addRegistration(name: string, email: string): Registration {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`
  const entry: Registration = {
    id,
    name,
    email,
    createdAt: new Date().toISOString(),
  }
  REGISTRATIONS = [entry, ...REGISTRATIONS]
  return entry
}
