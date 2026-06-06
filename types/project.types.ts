import { CreateProjectSchemaType } from "@/schemas/project.schema";
import { ProjectStatus, TaskStatus } from "@prisma/client";

export type CreateProjectInput = CreateProjectSchemaType & {
  userId: string;
};

export interface RecentProject {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: Date;
}

export interface GetProjects {
  id: string;
  title: string;
  status: ProjectStatus;
  createdAt: Date;
  taskCount: number;
}
