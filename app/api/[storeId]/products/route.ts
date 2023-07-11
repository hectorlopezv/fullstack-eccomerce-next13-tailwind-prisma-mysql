import prismaDb from "@/lib/prismaDb";
import { BillBoardFormSchema } from "@/lib/validators/BillBoardFormValidator";
import { ProductoFormValidator } from "@/lib/validators/ProductFormValidator";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { z } from "zod";
export async function GET(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { searchParams } = new URL(request.url);

    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured") || undefined;

    if (!userId) {
      return new NextResponse("UNAUTHORIZED", { status: 401 });
    }
    if (!params?.storeId) {
      return new NextResponse("BAD REQUEST", { status: 400 });
    }

    const products = await prismaDb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("BAD REQUEST", { status: 400 });
    }
    console.log("[PRODUCTS_GET]", error);
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
    const {
      categoryId,
      images,
      name,
      colorId,
      price,
      sizeId,
      isArchived,
      isFeatured,
    } = ProductoFormValidator.parse(body);
    const products = await prismaDb.product.create({
      data: {
        categoryId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        name,
        colorId,
        price,
        sizeId,
        isArchived,
        isFeatured,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("BAD REQUEST", { status: 400 });
    }
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("INTERNAL SERVER ERROR", { status: 500 });
  }
}
