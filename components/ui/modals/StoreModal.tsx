"use client";
import { useStoreModal } from "@/hooks/use-store-modal";
import Modal from "@/components/ui/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formSchema, formValues } from "@/lib/validators/storeModalValidator";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

type Props = {};

export default function StoreModal({}: Props) {
  const router = useRouter();
  const storeModal = useStoreModal();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: formValues) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/stores", values);
      toast.success("Store created successfully");
    } catch (error) {
      toast.error("Something went wrong, please try again or contact support");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
      title="Create Store"
      description="Add a new store to manage products and categories"
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ecommerce"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button
                  variant="outline"
                  onClick={storeModal.onClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
