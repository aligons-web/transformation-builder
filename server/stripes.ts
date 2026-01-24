import Stripe from "stripe";

const stripeKey = process.env.STRIPE_TEST_SECRET_KEY;
if (!stripeKey) throw new Error("Missing STRIPE_TEST_SECRET_KEY");

export const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
