"use client";

import { CheckCircle2, Circle, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StatusToggleProps {
  status: string;
  onChange: (status: string) => void;
}

const statusConfig: Record<
  string,
  { label: string; variant: "default" | "secondary" | "outline"; icon: typeof Clock }
> = {
  completed: { label: "Completed", variant: "default", icon: CheckCircle2 },
  in_progress: { label: "In Progress", variant: "secondary", icon: Clock },
  pending: { label: "Pending", variant: "outline", icon: Circle },
};

export function StatusToggle({ status, onChange }: StatusToggleProps) {
  const current = statusConfig[status] ?? statusConfig.pending;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 gap-1.5 px-2">
          <current.icon className="size-3" />
          <Badge variant={current.variant} className="text-xs">
            {current.label}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onChange("pending")}>
          <Circle className="mr-2 size-3" />
          Pending
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("in_progress")}>
          <Clock className="mr-2 size-3" />
          In Progress
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("completed")}>
          <CheckCircle2 className="mr-2 size-3" />
          Completed
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
