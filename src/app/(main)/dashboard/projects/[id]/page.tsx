import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { ProjectDetails } from "./_components/project-details";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      milestones: { orderBy: { position: "asc" } },
      activityLog: { orderBy: { createdAt: "desc" }, take: 20 },
    },
  });

  if (!project) notFound();

  return <ProjectDetails project={project} />;
}
