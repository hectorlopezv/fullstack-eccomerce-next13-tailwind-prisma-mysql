import prismaDb from "@/lib/prismaDb";
import BillBoardClient from "./components/Client";
import { format } from "date-fns";
import { BillBoardColumn } from "./components/Columns";
type Props = {
  params: { storeId: string };
};

export default async function BillboardsPage({ params: { storeId } }: Props) {
  const billBoards = await prismaDb.billboard.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedBillBoards: BillBoardColumn[] = billBoards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <BillBoardClient data={formatedBillBoards} />
      </div>
    </div>
  );
}
