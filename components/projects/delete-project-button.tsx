"use client";

import { Trash2 } from "lucide-react";
import { deleteProjectAction } from "@/app/actions/project.actions";

interface DeleteProjectButtonProps {
  projectId: string;
}

export function DeleteProjectButton({ projectId }: DeleteProjectButtonProps) {
  async function handleDelete() {
    const confirmed = window.confirm("Delete this project and all its tasks?");
    if (!confirmed) return;

    await deleteProjectAction(projectId);
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="
        w-7 h-7
        rounded-lg
        bg-red-50
        border border-red-100
        flex items-center justify-center
        hover:bg-red-100
        transition-colors
      "
    >
      <Trash2 size={13} className="text-red-500" />
    </button>
  );
}
