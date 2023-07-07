"use client";
import { Store } from "@prisma/client";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Trash } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { useForm } from "react-hook-form";
import {
  SettingsFormSchema,
  SettingsFormSchemaTypes,
} from "@/lib/validators/SettingsFormValidator";
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
import ApiAlert from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

type Props = {
  initialData: Store;
};

export default function SettingsForm({ initialData }: Props) {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();
  const [loading, setLoading] = useState(false);
  const form = useForm<SettingsFormSchemaTypes>({
    defaultValues: initialData,
    resolver: zodResolver(SettingsFormSchema),
  });
  const onSubmit = async (data: SettingsFormSchemaTypes) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      toast.success("Store updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.push("/");
      router.refresh();
      toast.success("Store updated deleted");
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
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          variant="destructive"
          onClick={() => setOpen(true)}
          size="icon"
          disabled={loading}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />

      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
}
