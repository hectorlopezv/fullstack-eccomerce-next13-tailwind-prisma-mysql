import Stripe from "stripe";
import { headers } from "next/headers";

import { stripe } from "@/lib/stripe";
import prismaDb from "@/lib/prismaDb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = headers().get("stripe-signature") || "";
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return new NextResponse("WEBHOOK_ERROR", { status: 400 });
  }
  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter(Boolean).join(", ");
  if (event.type === "checkout.session.completed") {
    const order = await prismaDb.order.update({
      where: {
        id: session.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || "",
      },
      include: {
        orderItems: true,
      },
    });
    const productsIds = order.orderItems.map((item) => item.productId);
    await prismaDb.product.updateMany({
      where: {
        id: {
          in: productsIds,
        },
      },
      data: {
        isArchived: true,
      },
    });
  }
  return new NextResponse("WEBHOOK_RECEIVED", { status: 200 });
}
