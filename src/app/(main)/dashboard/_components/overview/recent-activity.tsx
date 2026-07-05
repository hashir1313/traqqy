"use client";

import { AlertCircle, CheckCircle2, Edit, Plus } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Activity {
  id: string;
  type: string;
  description: string;
  projectName: string;
  createdAt: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const activityIcons: Record<string, typeof Plus> = {
  milestone_created: Plus,
  milestone_completed: CheckCircle2,
  milestone_updated: Edit,
  default: AlertCircle,
};

function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-medium text-sm">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground text-sm">No activity yet.</p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activityIcons[activity.type] ?? activityIcons.default;

              return (
                <div key={activity.id} className="flex gap-3">
                  <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border">
                    <Icon className="size-3.5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-sm leading-snug">
                      <span className="font-medium">{activity.projectName}</span>
                      <span className="text-muted-foreground"> — {activity.description}</span>
                    </p>
                    <p className="text-muted-foreground text-xs">{timeAgo(activity.createdAt)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
