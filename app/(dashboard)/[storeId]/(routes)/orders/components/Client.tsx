"use client";

import Heading from "@/components/ui/Heading";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { OrderColumn, columns } from "./Columns";
import { DataTable } from "./data-table";
import ApiList from "@/components/ui/api-list";
type Props = {
  data: OrderColumn[];
};

export default function BillBoardClient({ data }: Props) {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />

      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
    </>
  );
}
