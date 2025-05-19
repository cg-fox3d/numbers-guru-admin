import { LoginForm } from "@/components/auth/LoginForm";
import { Logo } from "@/components/Logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex items-center justify-center text-primary">
            <Logo className="h-10 w-10" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            ShopWave Admin Center
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in to manage your store
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ShopWave. All rights reserved.
      </p>
    </main>
  );
}
