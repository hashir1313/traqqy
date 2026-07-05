"use client";

import { AlertCircle, CheckCircle2, Clock, FolderOpen } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardsProps {
  totalProjects: number;
  activeProjects: number;
  completedMilestones: number;
  pendingMilestones: number;
}

export function StatsCards({ totalProjects, activeProjects, completedMilestones, pendingMilestones }: StatsCardsProps) {
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
      title: "Completed Milestones",
      value: completedMilestones,
      icon: CheckCircle2,
      description: "All projects",
    },
    {
      title: "Pending Milestones",
      value: pendingMilestones,
      icon: Clock,
      description: "Awaiting work",
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
