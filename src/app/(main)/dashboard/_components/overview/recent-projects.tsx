"use client";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Project {
  id: string;
  name: string;
  status: string;
  slug: string;
  _count: { milestones: number };
  updatedAt: string;
}

interface RecentProjectsProps {
  projects: Project[];
}

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  active: "default",
  draft: "secondary",
  completed: "outline",
  paused: "destructive",
};

export function RecentProjects({ projects }: RecentProjectsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-medium text-sm">Recent Projects</CardTitle>
        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard/projects">
            View all
            <ArrowRight className="ml-1 size-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {projects.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground text-sm">No projects yet. Create your first one.</p>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="space-y-1">
                  <p className="font-medium text-sm">{project.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {project._count.milestones} milestone{project._count.milestones !== 1 ? "s" : ""}
                  </p>
                </div>
                <Badge variant={statusVariant[project.status] ?? "secondary"}>{project.status}</Badge>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
