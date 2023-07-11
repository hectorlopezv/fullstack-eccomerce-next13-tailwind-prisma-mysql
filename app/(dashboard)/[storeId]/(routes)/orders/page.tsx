import prismaDb from "@/lib/prismaDb";
import BillBoardClient from "./components/Client";
import { format } from "date-fns";
import { OrderColumn } from "./components/Columns";
import { priceFormatter } from "@/lib/utils";
type Props = {
  params: { storeId: string };
};

export default async function OrdersPage({ params: { storeId } }: Props) {
  const orders = await prismaDb.order.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createadAt: "desc",
    },
  });

  const formatedOrders: OrderColumn[] = orders.map((item) => {
    const price = item.orderItems.reduce((acc, item) => {
      return acc + Number(item.product.price);
    }, 0);
    return {
      id: item.id,
      phone: item.phone,
      address: item.address,
      products: item.orderItems.map((item) => item.product.name).join(", "),
      totalPrice: priceFormatter(price),
      createdAt: format(item.createadAt, "MMMM do, yyyy"),
      isPaid: item.isPaid,
    };
  });

  return (
    <div className="flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <BillBoardClient data={formatedOrders} />
      </div>
    </div>
  );
}
