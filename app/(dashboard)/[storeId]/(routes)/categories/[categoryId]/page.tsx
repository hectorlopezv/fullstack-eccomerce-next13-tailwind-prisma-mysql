import prismaDb from "@/lib/prismaDb";
import React from "react";
import CategoryForm from "./components/category-form";

type Props = {
  params: { categoryId: string; storeId: string };
};

export default async function CategoryPage({
  params: { categoryId, storeId },
}: Props) {
  const category = await prismaDb.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  const billboards = await prismaDb.billboard.findMany({
    where: {
      storeId: storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  );
}
