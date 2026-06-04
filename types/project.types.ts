import { CreateProjectSchemaType } from "@/schemas/project.schema";

export type CreateProjectInput = CreateProjectSchemaType & {
  userId: string;
};

export interface RecentProject {
  id: string;
  title: string;
  status: string;
  createdAt: Date;
}
