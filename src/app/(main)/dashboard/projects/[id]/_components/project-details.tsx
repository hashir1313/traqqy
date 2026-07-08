"use client";

import { useRouter } from "next/navigation";

import { ArrowLeft, ClipboardCopy, Pencil } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { MilestoneList } from "./milestones/milestone-list";

interface Milestone {
  id: string;
  title: string;
  description: string | null;
  status: string;
  position: number;
}

interface ActivityLog {
  id: string;
  type: string;
  description: string;
  createdAt: Date;
}

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  slug: string;
  clientName: string | null;
  clientEmail: string | null;
  createdAt: Date;
  updatedAt: Date;
  milestones: Milestone[];
  activityLog: ActivityLog[];
}

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  active: "default",
  draft: "secondary",
  completed: "outline",
  paused: "destructive",
};

export function ProjectDetails({ project }: { project: Project }) {
  const router = useRouter();

  const totalMilestones = project.milestones.length;
  const completedMilestones = project.milestones.filter((m) => m.status === "completed").length;
  const progress = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard/projects")}>
            <ArrowLeft className="size-4" />
          </Button>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="font-medium text-2xl tracking-tight">{project.name}</h2>
              <Badge variant={statusVariant[project.status] ?? "secondary"}>{project.status}</Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              {project.clientName && <span>Client: {project.clientName}</span>}
            </div>
          </div>
        </div>
        <Button onClick={() => router.push(`/dashboard/projects/${project.id}/edit`)}>
          <Pencil className="mr-2 size-4" />
          Edit
        </Button>
      </div>

      {project.description && (
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent className="">
            <p className="text-sm">{project.description}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm">Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-2xl">{progress}%</div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm">Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-2xl">
              {completedMilestones}/{totalMilestones}
            </div>
            <p className="text-muted-foreground text-xs">completed</p>
          </CardContent>
        </Card>
        <Card className="justify-between">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm">Public URL</CardTitle>
            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/p/${project.slug}`);
                toast.success("Public URL copied to clipboard");
              }}
            >
              <ClipboardCopy className="size-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <a
              href={`/p/${project.slug}`}
              target="_blank"
              rel="noreferrer"
              className="text-primary text-sm hover:underline self-end"
            >
              /p/{project.slug}
            </a>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <MilestoneList projectId={project.id} milestones={project.milestones} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {project.activityLog.length === 0 ? (
            <p className="py-4 text-center text-muted-foreground text-sm">No activity yet.</p>
          ) : (
            <div className="space-y-3">
              {project.activityLog.map((log) => (
                <div key={log.id} className="flex items-start gap-3">
                  <div className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm">{log.description}</p>
                    <p className="text-muted-foreground text-xs">
                      {new Date(log.createdAt).toLocaleDateString()} {new Date(log.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
