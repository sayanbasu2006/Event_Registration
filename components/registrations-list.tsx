"use client"

import useSWR from "swr"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

type Registration = {
  id: string
  name: string
  email: string
  createdAt: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function RegistrationsList() {
  const { data, error, isLoading } = useSWR<{ registrations: Registration[] }>("/api/registrations", fetcher, {
    refreshInterval: 5000,
  })

  if (isLoading) return <p className="text-muted-foreground">Loading registrations...</p>
  if (error) return <p className="text-destructive">Failed to load registrations.</p>

  const items = data?.registrations ?? []

  if (items.length === 0) {
    return <p className="text-muted-foreground">No registrations yet.</p>
  }

  return (
    <div className="grid gap-4">
      {items.map((r) => (
        <div key={r.id} className="rounded-md border border-border p-4 bg-background">
          <div className="flex items-center justify-between">
            <div className="font-medium">{r.name}</div>
            <Badge className="bg-secondary text-secondary-foreground">Registered</Badge>
          </div>
          <div className="text-sm text-muted-foreground">{r.email}</div>
          <Separator className="my-3" />
          <div className="text-xs text-muted-foreground">Submitted: {new Date(r.createdAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
}
