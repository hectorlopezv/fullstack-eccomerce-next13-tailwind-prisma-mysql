import prismaDb from "@/lib/prismaDb";
import React from "react";
import OrderForm from "./components/order-form";

type Props = {
  params: { orderId: string };
};

export default async function OrderPage({ params: { orderId } }: Props) {
  const order = await prismaDb.order.findUnique({
    where: {
      id: orderId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderForm initialData={order} />
      </div>
    </div>
  );
}
