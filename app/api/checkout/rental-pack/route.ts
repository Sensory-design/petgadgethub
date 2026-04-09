import { NextResponse } from "next/server";

import Stripe from "stripe";

/**
 * POST — creates a Stripe Checkout Session for the Premium Rental Pack (£2.99).
 * Set STRIPE_SECRET_KEY and STRIPE_PRICE_RENTAL_PACK in the environment.
 */
export async function POST() {
  const secret = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_RENTAL_PACK;
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const base = site.replace(/\/$/, "");

  if (!secret || !priceId) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured. Add STRIPE_SECRET_KEY and STRIPE_PRICE_RENTAL_PACK in Vercel (or .env.local).",
      },
      { status: 503 },
    );
  }

  const stripe = new Stripe(secret);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${base}/tools/rental-resume?checkout=success`,
    cancel_url: `${base}/tools/rental-resume?checkout=canceled`,
    billing_address_collection: "auto",
  });

  if (!session.url) {
    return NextResponse.json({ error: "No checkout URL returned" }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
