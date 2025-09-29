import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import EventRegistrationForm from "@/components/event-registration-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function EventPage() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-pretty">Event Registration</CardTitle>
          <CardDescription className="text-muted-foreground">
            Please enter your name and email to register.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EventRegistrationForm />
          <div className="mt-4 flex justify-end">
            <Button asChild>
              <Link href="/event/registrations" aria-label="View submitted registrations">
                View Registrations
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
