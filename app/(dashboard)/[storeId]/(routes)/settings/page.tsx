import SettingsForm from "@/components/SettingsForm";
import isAuth from "@/lib/is-auth";
import prismaDb from "@/lib/prismaDb";
import { redirect } from "next/navigation";

type Props = {
  params: { storeId: string };
};

export default async function SettingsPage({ params }: Props) {
  const userId = isAuth("/sign-in");

  const store = await prismaDb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });
  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
}
