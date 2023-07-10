"use client";

import Heading from "@/components/ui/Heading";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { ColorColumn, columns } from "./Columns";
import { DataTable } from "./data-table";
import ApiList from "@/components/ui/api-list";
type Props = {
  data: ColorColumn[];
};

export default function ColorClient({ data }: Props) {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data.length})`}
          description="Manage colors for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for colors" />
      <Separator />
      <ApiList entityIdName="colorId" entityName="colors" />
    </>
  );
}
