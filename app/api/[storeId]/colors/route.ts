import prismaDb from "@/lib/prismaDb";
import { ColorFormValidator } from "@/lib/validators/ColorFormValidator";
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

    const colors = await prismaDb.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("BAD REQUEST", { status: 400 });
    }
    console.log("[COLORS_GET]", error);
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
    const { name, value } = ColorFormValidator.parse(body);
    const colors = await prismaDb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("BAD REQUEST", { status: 400 });
    }
    console.log("[COLORS_POST]", error);
    return new NextResponse("INTERNAL SERVER ERROR", { status: 500 });
  }
}
