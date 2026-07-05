import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { RecentProjects } from "./_components/overview/recent-projects";
import { StatsCards } from "./_components/overview/stats-cards";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await import("next/headers").then((m) => m.headers()),
  });

  if (!session) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="font-medium text-2xl tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground text-sm">Please log in to view your dashboard.</p>
        </div>
      </div>
    );
  }

  const userId = session.user.id;

  const [totalProjects, activeProjects, completedMilestones, pendingMilestones, recentProjects] = await Promise.all([
    prisma.project.count({ where: { userId } }),
    prisma.project.count({ where: { userId, status: "active" } }),
    prisma.milestone.count({ where: { project: { userId }, status: "completed" } }),
    prisma.milestone.count({ where: { project: { userId }, status: "pending" } }),
    prisma.project.findMany({
      where: { userId },
      take: 5,
      orderBy: { updatedAt: "desc" },
      include: { _count: { select: { milestones: true } } },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-medium text-2xl tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground text-sm">Welcome back. Here&apos;s an overview of your projects.</p>
      </div>
      <StatsCards
        totalProjects={totalProjects}
        activeProjects={activeProjects}
        completedMilestones={completedMilestones}
        pendingMilestones={pendingMilestones}
      />
      <RecentProjects
        projects={recentProjects.map((p) => ({
          ...p,
          updatedAt: p.updatedAt.toISOString(),
        }))}
      />
    </div>
  );
}
