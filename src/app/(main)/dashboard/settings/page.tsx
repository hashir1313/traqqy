import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";

import { ThemeToggleSection } from "./_components/theme-toggle-section";

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await import("next/headers").then((m) => m.headers()),
  });

  if (!session) redirect("/auth/v2/login");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-medium text-2xl tracking-tight">Settings</h2>
        <p className="text-muted-foreground text-sm">Manage your application preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ThemeToggleSection />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Email</p>
              <p className="text-muted-foreground text-sm">{session.user.email}</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Account Type</p>
              <p className="text-muted-foreground text-sm">Free plan</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
