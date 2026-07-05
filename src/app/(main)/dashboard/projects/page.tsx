import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { ProjectsTable } from "./_components/projects-table";

export default async function ProjectsPage() {
  const session = await auth.api.getSession({
    headers: await import("next/headers").then((m) => m.headers()),
  });

  if (!session) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="font-medium text-2xl tracking-tight">Projects</h2>
          <p className="text-muted-foreground text-sm">Please log in to view your projects.</p>
        </div>
      </div>
    );
  }

  const projects = await prisma.project.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { milestones: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-medium text-2xl tracking-tight">Projects</h2>
        <p className="text-muted-foreground text-sm">Manage your projects and track milestone progress.</p>
      </div>
      <ProjectsTable
        initialProjects={projects.map((p) => ({
          ...p,
          updatedAt: p.updatedAt.toISOString(),
        }))}
      />
    </div>
  );
}
