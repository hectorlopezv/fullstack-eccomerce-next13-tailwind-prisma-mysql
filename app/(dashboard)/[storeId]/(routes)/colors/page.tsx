import prismaDb from "@/lib/prismaDb";
import SizesClient from "./components/Client";
import { format } from "date-fns";
import { ColorColumn } from "./components/Columns";
type Props = {
  params: { storeId: string };
};

export default async function ColorPage({ params: { storeId } }: Props) {
  const colors = await prismaDb.color.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={formatedColors} />
      </div>
    </div>
  );
}
