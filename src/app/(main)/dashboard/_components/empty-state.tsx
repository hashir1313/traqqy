import Link from "next/link";

import { FolderOpen, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: { label: string; href: string };
}

export function EmptyState({
  title = "No items yet",
  description = "Get started by creating your first item.",
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
      <FolderOpen className="mb-4 size-10 text-muted-foreground" />
      <h3 className="font-medium text-lg">{title}</h3>
      <p className="mb-6 max-w-sm text-muted-foreground text-sm">{description}</p>
      {action && (
        <Button asChild>
          <Link href={action.href}>
            <Plus className="mr-2 size-4" />
            {action.label}
          </Link>
        </Button>
      )}
    </div>
  );
}
