import prismaDb from "@/lib/prismaDb";
import { SettingsFormSchema } from "@/lib/validators/SettingsFormValidator";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { z } from "zod";
export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("UNAUTHORIZED", { status: 401 });
    }
    const body = await request.json();
    const { name } = SettingsFormSchema.parse(body);
    if (!params?.storeId) {
      return new NextResponse("BAD REQUEST", { status: 400 });
    }

    const store = await prismaDb.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("BAD REQUEST", { status: 400 });
    }
    console.log("[STORE_PATCH]", error);
    return new NextResponse("INTERNAL SERVER ERROR", { status: 500 });
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("UNAUTHORIZED", { status: 401 });
    }
    if (!params?.storeId) {
      return new NextResponse("BAD REQUEST", { status: 400 });
    }

    const store = await prismaDb.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("BAD REQUEST", { status: 400 });
    }
    console.log("[STORE_PATCH]", error);
    return new NextResponse("INTERNAL SERVER ERROR", { status: 500 });
  }
}
