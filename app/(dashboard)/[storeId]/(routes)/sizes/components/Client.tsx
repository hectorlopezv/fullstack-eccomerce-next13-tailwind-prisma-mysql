"use client";

import Heading from "@/components/ui/Heading";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { SizeColumn, columns } from "./Columns";
import { DataTable } from "./data-table";
import ApiList from "@/components/ui/api-list";
type Props = {
  data: SizeColumn[];
};

export default function SizeClient({ data }: Props) {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for sizes" />
      <Separator />
      <ApiList entityIdName="sizeId" entityName="sizes" />
    </>
  );
}
