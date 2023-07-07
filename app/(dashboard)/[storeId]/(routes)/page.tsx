import prismaDb from "@/lib/prismaDb";
interface DashBoardPageProps {
  params: { storeId: string };
}

export default async function DashboardPage({ params }: DashBoardPageProps) {
  const store = await prismaDb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return <div>Active Store: {store?.name}</div>;
}
