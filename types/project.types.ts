import { CreateProjectSchemaType } from "@/schemas/project.schema";

export type CreateProjectInput = CreateProjectSchemaType & {
  userId: string;
};
