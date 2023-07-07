import prismaDb from "@/lib/prismaDb";
import { BillBoardFormSchema } from "@/lib/validators/BillBoardFormValidator";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { z } from "zod";
export async function GET(
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

    const billboardS = await prismaDb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboardS);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("BAD REQUEST", { status: 400 });
    }
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("INTERNAL SERVER ERROR", { status: 500 });
  }
}
export async function POST(
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
    const storeByuserId = await prismaDb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!storeByuserId) {
      return new NextResponse("UNAUTHORIZED", { status: 401 });
    }
    const body = await request.json();
    const { imageUrl, label } = BillBoardFormSchema.parse(body);
    const billboard = await prismaDb.billboard.create({
      data: {
        label,
        imageUrl: imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("BAD REQUEST", { status: 400 });
    }
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("INTERNAL SERVER ERROR", { status: 500 });
  }
}
