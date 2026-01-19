// server/stripe-webhook.ts
import type { Express, Request, Response } from "express";
import express from "express";
import Stripe from "stripe";
import { db } from "./db";
import { subscriptions, users } from "@shared/schema";
import { eq } from "drizzle-orm";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

// Webhook secret from Stripe Dashboard
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// ✅ Map Stripe Price IDs to your plan keys
// TEST MODE Price IDs - Replace with LIVE Price IDs when ready for production
const PRICE_TO_PLAN_MAP: Record<string, "TRANSFORMER" | "IMPLEMENTER"> = {
  // Test Mode Price IDs
  "price_1SrMCMEdLQjM86qTkh7bSRTv": "TRANSFORMER",   // $29.99/month
  "price_1SrMDFEdLQjM86qTyNO9tRgL": "IMPLEMENTER",   // $49.99/month

  // TODO: Add Live Mode Price IDs here when ready for production
  // "price_live_transformer_xxx": "TRANSFORMER",
  // "price_live_implementer_xxx": "IMPLEMENTER",
};

export function registerStripeWebhook(app: Express) {
  /**
   * POST /api/stripe/webhook
   * Handles Stripe webhook events
   * 
   * IMPORTANT: This endpoint MUST use raw body, not JSON parsing
   */
  app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    async (req: Request, res: Response) => {
      const sig = req.headers["stripe-signature"];

      if (!sig) {
        console.error("⚠️ No Stripe signature found");
        return res.status(400).send("No signature");
      }

      let event: Stripe.Event;

      try {
        // Verify webhook signature
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          webhookSecret
        );
      } catch (err) {
        console.error("⚠️ Webhook signature verification failed:", err);
        return res.status(400).send(`Webhook Error: ${err}`);
      }

      console.log(`✅ Received Stripe event: ${event.type}`);

      try {
        // Handle different event types
        switch (event.type) {
          case "customer.subscription.created":
          case "customer.subscription.updated":
            await handleSubscriptionChange(event);
            break;

          case "customer.subscription.deleted":
            await handleSubscriptionDeleted(event);
            break;

          case "invoice.payment_failed":
            await handlePaymentFailed(event);
            break;

          case "checkout.session.completed":
            await handleCheckoutCompleted(event);
            break;

          default:
            console.log(`ℹ️ Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });
      } catch (error) {
        console.error("❌ Error processing webhook:", error);
        res.status(500).send("Webhook processing failed");
      }
    }
  );
}

/**
 * Handle subscription created or updated
 */
async function handleSubscriptionChange(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;

  console.log("📝 Processing subscription change:", subscription.id);

  // Get the price ID from the subscription
  const priceId = subscription.items.data[0]?.price.id;

  if (!priceId) {
    console.error("⚠️ No price ID found in subscription");
    return;
  }

  // Map price ID to plan
  const plan = PRICE_TO_PLAN_MAP[priceId];

  if (!plan) {
    console.error(`⚠️ Unknown price ID: ${priceId}`);
    return;
  }

  // Get customer email from Stripe
  const customerId = subscription.customer as string;
  const customer = await stripe.customers.retrieve(customerId);

  if (customer.deleted) {
    console.error("⚠️ Customer was deleted");
    return;
  }

  const email = customer.email;

  if (!email) {
    console.error("⚠️ No email found for customer");
    return;
  }

  // Find user by email (you might need to add email field to users table)
  // For now, we'll use customer metadata to store userId
  const userId = customer.metadata?.userId;

  if (!userId) {
    console.error("⚠️ No userId in customer metadata. Customer needs to be linked.");
    return;
  }

  // Determine subscription status
  const status = subscription.status === "active" || subscription.status === "trialing"
    ? "active"
    : "inactive";

  // Update or create subscription in database
  const existingSub = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);

  if (existingSub.length > 0) {
    // Update existing subscription
    await db
      .update(subscriptions)
      .set({
        plan,
        status,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: customerId,
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.userId, userId));

    console.log(`✅ Updated subscription for user ${userId} to ${plan}`);
  } else {
    // Create new subscription
    await db.insert(subscriptions).values({
      userId,
      plan,
      status,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: customerId,
    });

    console.log(`✅ Created subscription for user ${userId} with plan ${plan}`);
  }
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionDeleted(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;

  console.log("🗑️ Processing subscription deletion:", subscription.id);

  // Find subscription by Stripe subscription ID
  const existingSub = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.stripeSubscriptionId, subscription.id))
    .limit(1);

  if (existingSub.length === 0) {
    console.error("⚠️ Subscription not found in database");
    return;
  }

  // Downgrade to EXPLORER (free plan - no paid features)
  await db
    .update(subscriptions)
    .set({
      plan: "EXPLORER",
      status: "cancelled",
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.stripeSubscriptionId, subscription.id));

  console.log(`✅ Downgraded user to EXPLORER plan (subscription cancelled)`);
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(event: Stripe.Event) {
  const invoice = event.data.object as Stripe.Invoice;

  console.log("⚠️ Payment failed for invoice:", invoice.id);

  // You might want to:
  // 1. Send email to user about failed payment
  // 2. Temporarily suspend access (grace period)
  // 3. Log the event for monitoring

  // For now, just log it
  console.log(`Customer ${invoice.customer} payment failed`);
}

/**
 * Handle successful checkout completion
 */
async function handleCheckoutCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;

  console.log("✅ Checkout completed:", session.id);

  // Get subscription from session
  if (session.subscription) {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    // Just call handleSubscriptionChange directly with the subscription data
    // We create a minimal event structure that TypeScript will accept
    await handleSubscriptionChange({
      ...event,
      data: {
        object: subscription as any,
      },
    } as Stripe.Event);
  }
}