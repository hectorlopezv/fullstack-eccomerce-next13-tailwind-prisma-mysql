import prismaDb from "@/lib/prismaDb";
import ProductsClient from "./components/Client";
import { format } from "date-fns";
import { ProductColumn } from "./components/Columns";
import { priceFormatter } from "@/lib/utils";
type Props = {
  params: { storeId: string };
};

export default async function ProductsPage({ params: { storeId } }: Props) {
  const products = await prismaDb.product.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: priceFormatter(Number(item.price)),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formatedProducts} />
      </div>
    </div>
  );
}
