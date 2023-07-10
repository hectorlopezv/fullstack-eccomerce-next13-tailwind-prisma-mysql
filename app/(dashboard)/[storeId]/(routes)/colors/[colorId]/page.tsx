import prismaDb from "@/lib/prismaDb";
import ColorForm from "./components/color-form";

type Props = {
  params: { colorId: string };
};

export default async function ColorPage({ params: { colorId } }: Props) {
  const colors = await prismaDb.color.findUnique({
    where: {
      id: colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={colors} />
      </div>
    </div>
  );
}
