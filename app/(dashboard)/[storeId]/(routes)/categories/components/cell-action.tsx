"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategoriesColumn } from "./Columns";
import { Button } from "@/components/ui/Button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useClipboard } from "@mantine/hooks";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import AlertModal from "@/components/ui/modals/AlertModal";

type Props = {
  data: CategoriesColumn;
};
export const revalidate = 0;
export default function CellAction({ data }: Props) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const clipboard = useClipboard();
  const router = useRouter();
  const params = useParams();

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/categories/${data.id}`);
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success("categories deleted");
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };
  const handleCopy = (id: string) => {
    clipboard.copy(id);
    toast.success("categories id copied to clipboard");
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/categories/${data.id}`)
            }
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
