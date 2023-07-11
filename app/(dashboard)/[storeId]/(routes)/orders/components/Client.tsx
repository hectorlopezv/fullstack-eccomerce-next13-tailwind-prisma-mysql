"use client";

import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/Separator";
import { OrderColumn, columns } from "./Columns";
import { DataTable } from "./data-table";
type Props = {
  data: OrderColumn[];
};

export default function BillBoardClient({ data }: Props) {
 
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />

      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
}
