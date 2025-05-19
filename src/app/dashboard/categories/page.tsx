import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutGrid } from "lucide-react";

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Categories</h1>
        {/* Add button e.g. <Button>Add Category</Button> */}
      </div>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LayoutGrid className="h-6 w-6 text-primary" />
            Manage Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Category listing and management tools will be available on this page.
            You'll be able to create, organize, and manage product categories.
          </p>
           <div className="mt-8 flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20">
            <p className="text-muted-foreground">Category management interface will appear here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
