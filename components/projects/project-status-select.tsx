"use client";

import { updateProjectStatusAction } from "@/app/actions/project.actions";
import { ProjectStatus } from "@/app/generated/prisma/client";

interface ProjectStatusProps {
  projectId: string;
  currentStatus: ProjectStatus;
}

export function ProjectStatusSelect({
  projectId,
  currentStatus,
}: ProjectStatusProps) {
  const updateStatus = updateProjectStatusAction.bind(null, projectId);

  return (
    <form action={updateStatus}>
      <span>Status:</span>
      <select
        name="status"
        value={currentStatus}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
      >
        <option value="PLANNING">Planning</option>
        <option value="ACTIVE">Active</option>
        <option value="COMPLETED">Completed</option>
        <option value="ARCHIVED">Archived</option>
      </select>
    </form>
  );
}
