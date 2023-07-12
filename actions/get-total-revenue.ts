import prismaDb from "@/lib/prismaDb";
export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prismaDb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
  const totalRevenue = paidOrders.reduce((acc, order) => {
    const orderTotal = order.orderItems.reduce((acc, orderItem) => {
      return acc + orderItem.product.price.toNumber();
    }, 0);
    return acc + orderTotal;
  }, 0);

  return totalRevenue;
};
