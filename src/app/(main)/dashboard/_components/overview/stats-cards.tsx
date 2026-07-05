"use client";

import { AlertCircle, CheckCircle2, FolderOpen, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardsProps {
  totalProjects: number;
  activeProjects: number;
  completionRate: number;
  inProgressMilestones: number;
}

export function StatsCards({ totalProjects, activeProjects, completionRate, inProgressMilestones }: StatsCardsProps) {
  const stats = [
    {
      title: "Total Projects",
      value: totalProjects,
      icon: FolderOpen,
      description: "All time",
    },
    {
      title: "Active Projects",
      value: activeProjects,
      icon: AlertCircle,
      description: "In progress",
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: TrendingUp,
      description: "All milestones",
    },
    {
      title: "In Progress",
      value: inProgressMilestones,
      icon: CheckCircle2,
      description: "Active milestones",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">{stat.title}</CardTitle>
            <stat.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-2xl">{stat.value}</div>
            <p className="text-muted-foreground text-xs">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
