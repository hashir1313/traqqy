"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { AddMilestoneDialog } from "./add-milestone-dialog";
import { EditMilestoneDialog } from "./edit-milestone-dialog";
import { SortableMilestone } from "./sortable-milestone";

interface Milestone {
  id: string;
  title: string;
  description: string | null;
  status: string;
  position: number;
}

interface MilestoneListProps {
  projectId: string;
  milestones: Milestone[];
}

export function MilestoneList({ projectId, milestones }: MilestoneListProps) {
  const router = useRouter();
  const [addOpen, setAddOpen] = useState(false);
  const [editMilestone, setEditMilestone] = useState<Milestone | null>(null);
  const [items, setItems] = useState(milestones);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((m) => m.id === active.id);
    const newIndex = items.findIndex((m) => m.id === over.id);

    const newItems = [...items];
    const [moved] = newItems.splice(oldIndex, 1);
    newItems.splice(newIndex, 0, moved);
    setItems(newItems);

    try {
      await fetch(`/api/milestones/${active.id}/reorder`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ milestoneIds: newItems.map((m) => m.id) }),
      });
      router.refresh();
    } catch {
      toast.error("Failed to reorder milestones");
      setItems(milestones);
    }
  }

  async function handleStatusChange(id: string, status: string) {
    try {
      const response = await fetch(`/api/milestones/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      setItems((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
      toast.success("Milestone status updated");
      router.refresh();
    } catch {
      toast.error("Failed to update status");
    }
  }

  async function handleDelete(id: string) {
    try {
      const response = await fetch(`/api/milestones/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete milestone");

      setItems((prev) => prev.filter((m) => m.id !== id));
      toast.success("Milestone deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete milestone");
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm">Milestones ({items.length})</h3>
        <Button size="sm" onClick={() => setAddOpen(true)}>
          <Plus className="mr-1 size-3" />
          Add Milestone
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="py-8 text-center text-muted-foreground text-sm">No milestones yet. Add your first one.</p>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map((m) => m.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {items.map((milestone) => (
                <SortableMilestone
                  key={milestone.id}
                  milestone={milestone}
                  onStatusChange={handleStatusChange}
                  onEdit={setEditMilestone}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <AddMilestoneDialog
        projectId={projectId}
        open={addOpen}
        onOpenChange={setAddOpen}
        onCreated={(newMilestone) => {
          setItems((prev) => [...prev, newMilestone]);
          router.refresh();
        }}
      />

      {editMilestone && (
        <EditMilestoneDialog
          milestone={editMilestone}
          open={!!editMilestone}
          onOpenChange={(open) => {
            if (!open) setEditMilestone(null);
          }}
          onUpdated={(updated) => {
            setItems((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
            setEditMilestone(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
