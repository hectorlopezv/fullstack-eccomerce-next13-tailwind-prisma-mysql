import { NextResponse } from "next/server";
import prismaDb from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs";
import { formSchema } from "@/lib/validators/storeModalValidator";
import { z } from "zod";
export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const { name } = formSchema.parse(body);

    const store = await prismaDb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Bad Request", { status: 400 });
    }
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
