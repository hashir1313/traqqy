import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { ActiveProjects } from "./_components/overview/active-projects";
import { RecentActivity } from "./_components/overview/recent-activity";
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

  const [
    totalProjects,
    activeProjects,
    totalMilestones,
    completedMilestones,
    inProgressMilestones,
    activeProjectsWithProgress,
    recentActivity,
  ] = await Promise.all([
    prisma.project.count({ where: { userId } }),
    prisma.project.count({ where: { userId, status: "active" } }),
    prisma.milestone.count({ where: { project: { userId } } }),
    prisma.milestone.count({ where: { project: { userId }, status: "completed" } }),
    prisma.milestone.count({ where: { project: { userId }, status: "in_progress" } }),
    prisma.project.findMany({
      where: { userId, status: "active" },
      take: 5,
      orderBy: { updatedAt: "desc" },
      include: {
        milestones: {
          select: { status: true },
        },
      },
    }),
    prisma.activityLog.findMany({
      where: { project: { userId } },
      take: 8,
      orderBy: { createdAt: "desc" },
      include: { project: { select: { name: true } } },
    }),
  ]);

  const completionRate = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-medium text-2xl tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground text-sm">
          Welcome back, {session.user.name ?? "there"}. Here&apos;s your project overview.
        </p>
      </div>
      <StatsCards
        totalProjects={totalProjects}
        activeProjects={activeProjects}
        completionRate={completionRate}
        inProgressMilestones={inProgressMilestones}
      />
      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <ActiveProjects
            projects={activeProjectsWithProgress.map((p) => ({
              id: p.id,
              name: p.name,
              clientName: p.clientName,
              totalMilestones: p.milestones.length,
              completedMilestones: p.milestones.filter((m) => m.status === "completed").length,
              updatedAt: p.updatedAt.toISOString(),
            }))}
          />
        </div>
        <div className="lg:col-span-3">
          <RecentActivity
            activities={recentActivity.map((a) => ({
              id: a.id,
              type: a.type,
              description: a.description,
              projectName: a.project.name,
              createdAt: a.createdAt.toISOString(),
            }))}
          />
        </div>
      </div>
    </div>
  );
}
