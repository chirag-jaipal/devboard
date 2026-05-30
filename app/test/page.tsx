import { prisma } from "@/lib/db";

export default async function TestPage() {
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1>Database Connection Successful</h1>
      <p>Total Users: {users.length}</p>
    </div>
  );
}
