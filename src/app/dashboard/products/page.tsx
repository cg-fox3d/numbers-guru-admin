import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Products</h1>
        {/* Add button e.g. <Button>Add Product</Button> */}
      </div>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            Manage Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Product listing and management features will be available here.
            You'll be able to add, edit, and remove products, manage inventory, and more.
          </p>
          <div className="mt-8 flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20">
            <p className="text-muted-foreground">Product data table or grid will appear here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
