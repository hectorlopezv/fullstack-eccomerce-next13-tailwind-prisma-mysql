import prismaDb from "@/lib/prismaDb";
import React from "react";
import { ProductForm } from "./components/product-form";


type Props = {
  params: { productId: string; storeId: string };
};
export const revalidate = 0;
export default async function BillBoardPage({
  params: { productId, storeId },
}: Props) {
  const product = await prismaDb.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });
  const categories = await prismaDb.category.findMany({
    where: {
      storeId: storeId,
    },
  });

  const colors = await prismaDb.color.findMany({
    where: {
      storeId: storeId,
    },
  });

  const sizes = await prismaDb.size.findMany({
    where: {
      storeId: storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          colors={colors}
          sizes={sizes}
          categories={categories}
        />
      </div>
    </div>
  );
}
