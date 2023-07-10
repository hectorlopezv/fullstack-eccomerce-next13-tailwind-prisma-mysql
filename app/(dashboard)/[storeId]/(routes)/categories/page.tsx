import prismaDb from "@/lib/prismaDb";
import CategoryClient from "./components/Client";
import { format } from "date-fns";
import { CategoriesColumn } from "./components/Columns";
type Props = {
  params: { storeId: string };
};

export default async function CategoriesPage({ params: { storeId } }: Props) {
  const categories = await prismaDb.category.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      billboard: true,
    },
  });

  const categoriesFormated: CategoriesColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={categoriesFormated} />
      </div>
    </div>
  );
}
