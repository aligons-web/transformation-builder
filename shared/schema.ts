import { pgTable, text, uuid, pgEnum, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/* =========================
   USERS
========================= */
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),

  // ✅ Admin flag
  isAdmin: boolean("is_admin").notNull().default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

/* =========================
   PLANS / SUBSCRIPTIONS
========================= */
export const planEnum = pgEnum("plan", ["EXPLORER", "TRANSFORMER", "IMPLEMENTER"]);

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => users.id),

  plan: planEnum("plan").notNull().default("EXPLORER"),
  status: text("status").notNull().default("active"),

  // Stripe fields (for later use)
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  currentPeriodEnd: timestamp("current_period_end"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* =========================
   EXPLORER CONTENT TABLES
========================= */
export const reflections = pgTable("reflections", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),

  topicKey: text("topic_key").notNull(),
  content: text("content").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const summaries = pgTable("summaries", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),

  topicKey: text("topic_key").notNull(),
  summaryText: text("summary_text").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const purposeInterpretations = pgTable("purpose_interpretations", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),

  interpretationText: text("interpretation_text").notNull(),
  isInitial: boolean("is_initial").notNull().default(true),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
