import { redirect } from "next/navigation";
import prismaDb from "@/lib/prismaDb";
import isAuth from "@/lib/is-auth";
export default async function SetupLayout({
  children,
  params: { storeId },
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const userId = isAuth("/sign-in");
  const store = await prismaDb.store.findFirst({
    where: {
      userId,
    },
  });
  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}
