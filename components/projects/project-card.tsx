interface ProjectCardProps {
  title: string;
  status: string;
  taskCount: number;
  createdAt: Date;
}

export function ProjectCard({
  title,
  status,
  taskCount,
  createdAt,
}: ProjectCardProps) {
  return (
    <div>
      <p>{title}</p>
      <p>{status}</p>
      <p>{taskCount}</p>
      <p>{createdAt.toLocaleString()}</p>
    </div>
  );
}
