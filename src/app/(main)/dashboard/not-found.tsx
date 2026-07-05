import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h2 className="font-semibold text-2xl">Page not found</h2>
      <p className="mt-2 text-muted-foreground text-sm">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Button asChild className="mt-6">
        <Link href="/dashboard">Back to Dashboard</Link>
      </Button>
    </div>
  );
}
