import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { ProfileForm } from "./_components/profile-form";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await import("next/headers").then((m) => m.headers()),
  });

  if (!session) redirect("/auth/v2/login");

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="font-medium text-2xl tracking-tight">Profile</h2>
        <p className="text-muted-foreground text-sm">Update your personal information.</p>
      </div>
      <ProfileForm user={{ name: session.user.name, email: session.user.email }} />
    </div>
  );
}
