// create-founder.ts
// Run this script with: npx ts-node scripts/create-founder.ts
// Or add to package.json scripts: "create-founder": "ts-node scripts/create-founder.ts"

import { db } from "../server/db";
import { users } from "../server/db/schema";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

async function createFounderUser() {
  const email = "founders@tb.com";
  const password = "tbwebapp26";
  const plan = "FOUNDER";

  try {
    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, email),
    });

    if (existingUser) {
      console.log(`⚠️  User ${email} already exists.`);
      console.log(`   Current plan: ${existingUser.plan}`);

      // Optionally update to FOUNDER plan if they exist
      // Uncomment the following to update existing user:
      /*
      await db.update(users)
        .set({ plan: "FOUNDER" })
        .where(eq(users.username, email));
      console.log(`✅ Updated ${email} to FOUNDER plan`);
      */

      process.exit(0);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await db.insert(users).values({
      id: uuidv4(),
      username: email,
      password: hashedPassword,
      plan: plan,
      basePlan: plan,
      isAdmin: 0,
      subscriptionStatus: "active",
    }).returning();

    console.log("✅ Founder user created successfully!");
    console.log(`   Email: ${email}`);
    console.log(`   Plan: ${plan}`);
    console.log(`   ID: ${newUser[0]?.id}`);

  } catch (error) {
    console.error("❌ Error creating founder user:", error);
    process.exit(1);
  }

  process.exit(0);
}

createFounderUser();