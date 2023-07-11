import prismaDb from "@/lib/prismaDb";
import React from "react";
import BillBoardForm from "./components/billboard-form";

type Props = {
  params: { billboardId: string };
};

export default async function BilloardPage({
  params: { billboardId },
}: Props) {
  const billboard = await prismaDb.billboard.findUnique({
    where: {
      id: billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardForm initialData={billboard} />
      </div>
    </div>
  );
}
