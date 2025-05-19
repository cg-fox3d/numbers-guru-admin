import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Customers</h1>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Manage Customers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Customer relationship management features will be housed here.
            You'll be able to view customer details, order history, and manage customer accounts.
          </p>
          <div className="mt-8 flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20">
            <p className="text-muted-foreground">Customer data and tools will appear here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
