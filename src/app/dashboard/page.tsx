import { KeyMetricCard } from "@/components/dashboard/KeyMetricsCard";
import { Archive, Users, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// In a real application, these values would come from a backend or state management.
const metrics = [
  {
    title: "Total Products",
    value: "1,234",
    icon: Archive,
    description: "+20.1% from last month",
  },
  {
    title: "Active Users",
    value: "567",
    icon: Users,
    description: "+150 this week",
  },
  {
    title: "Current Orders",
    value: "89",
    icon: ShoppingCart,
    description: "12 pending shipment",
  },
  {
    title: "Average Order Value",
    value: "$120.50",
    icon: DollarSign,
    description: "Increased by 5% ",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back, Admin! Here's what's happening.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <KeyMetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            description={metric.description}
          />
        ))}
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Recent Activity</h2>
          {/* Placeholder for recent activity feed or chart */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <p className="text-muted-foreground">Recent activity will be displayed here.</p>
            <div className="mt-4 h-64 w-full flex items-center justify-center bg-muted/50 rounded-md">
              <TrendingUp className="h-16 w-16 text-muted-foreground/50" />
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Quick Links</h2>
          {/* Placeholder for quick links */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <ul className="space-y-2">
              <li><a href="/dashboard/products/new" className="text-primary hover:underline">Add New Product</a></li>
              <li><a href="/dashboard/orders" className="text-primary hover:underline">View Pending Orders</a></li>
              <li><a href="/dashboard/customers" className="text-primary hover:underline">Manage Customers</a></li>
              <li><a href="#" className="text-primary hover:underline">Generate Report</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
