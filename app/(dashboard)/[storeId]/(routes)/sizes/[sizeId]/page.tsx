import prismaDb from "@/lib/prismaDb";
import React from "react";

import SizeForm from "./components/size-form";

type Props = {
  params: { sizeId: string };
};

export default async function BillBoardPage({ params: { sizeId } }: Props) {
  const sizes = await prismaDb.size.findUnique({
    where: {
      id: sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={sizes} />
      </div>
    </div>
  );
}
