"use client";
import { Billboard, Order } from "@prisma/client";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  BillBoardFormSchema,
  BillBoardFormSchemaTypes,
} from "@/lib/validators/BillBoardFormValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import AlertModal from "@/components/ui/modals/AlertModal";
import { Separator } from "@/components/ui/Separator";
import ImageUpload from "@/components/ui/ImageUpload";

type Props = {
  initialData: Order | null;
};

export default function OrderForm({ initialData }: Props) {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit Order" : "New Order";
  const description = initialData
    ? "Edit Order details"
    : "Add Order details";
  const toastMessage = initialData
    ? "Order updated successfully"
    : "Order created successfully";
  const action = initialData ? "Update" : "Create";
  const form = useForm<BillBoardFormSchemaTypes>({
    defaultValues: initialData || {
      imageUrl: "",
      label: "",
    },
    resolver: zodResolver(BillBoardFormSchema),
  });
  const onSubmit = async (data: BillBoardFormSchemaTypes) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/orders/${params.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/orders`, data);
      }

      router.refresh();
      router.push(`/${params.storeId}/orders`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/orders/${params.billboardId}`
      );

      router.refresh();
      router.push(`/${params.storeId}/orders`);
      toast.success("Orders deleted");
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData ? (
          <Button
            variant="destructive"
            onClick={() => setOpen(true)}
            size="icon"
            disabled={loading}
          >
            <Trash className="h-4 w-4" />
          </Button>
        ) : null}
      </div>
      <Separator />

      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    onChange={(url) => {
                      field.onChange(url);
                    }}
                    onRemove={() => {
                      field.onChange("");
                    }}
                    disabled={loading}
                    value={field.value ? [field.value] : []}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
