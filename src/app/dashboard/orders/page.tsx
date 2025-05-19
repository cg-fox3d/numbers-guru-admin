import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Orders</h1>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            Manage Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This section will allow you to view and manage customer orders.
            Functionality to track order status, process refunds, and view order details will be implemented here.
          </p>
          <div className="mt-8 flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20">
            <p className="text-muted-foreground">Order list and details will appear here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
