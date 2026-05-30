import Image from "next/image";
import { prisma } from "@/lib/db";

export default async function Home() {
  const users = await prisma.user.findMany();

  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
