import { redirect } from "next/navigation";
import prismaDb from "@/lib/prismaDb";
import NavBar from "@/components/NavBar";
import isAuth from "@/lib/is-auth";
export default async function DashboardLayout({
  children,
  params: { storeId },
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const userId = isAuth("/sign-in");
  const store = await prismaDb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });
  if (!store) {
    redirect("/");
  }

  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
