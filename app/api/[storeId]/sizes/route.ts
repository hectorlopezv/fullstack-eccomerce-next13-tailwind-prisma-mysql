import prismaDb from "@/lib/prismaDb";
import { SizeFormValidator } from "@/lib/validators/SizeFormValidator";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { z } from "zod";
export async function GET(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!params?.storeId) {
      return new NextResponse("BAD REQUEST", { status: 400 });
    }

    const sizes = await prismaDb.size.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("BAD REQUEST", { status: 400 });
    }
    console.log("[SIZES_GET]", error);
    return new NextResponse("INTERNAL SERVER ERROR", { status: 500 });
  }
}
export async function POST(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!params?.storeId) {
      return new NextResponse("BAD REQUEST", { status: 400 });
    }
    const storeByuserId = await prismaDb.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId!,
      },
    });
    if (!storeByuserId) {
      return new NextResponse("UNAUTHORIZED", { status: 401 });
    }
    const body = await request.json();
    const { name, value } = SizeFormValidator.parse(body);
    const size = await prismaDb.size.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("BAD REQUEST", { status: 400 });
    }
    console.log("[SIZES_POST]", error);
    return new NextResponse("INTERNAL SERVER ERROR", { status: 500 });
  }
}
