import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RegistrationsList from "@/components/registrations-list"

export default function ViewRegistrationsPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-pretty">Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <RegistrationsList />
        </CardContent>
      </Card>
    </main>
  )
}
