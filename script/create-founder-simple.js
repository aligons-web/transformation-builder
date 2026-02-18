// create-founder-simple.js
// Run this in Replit Shell with: node scripts/create-founder-simple.js

const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

// If using PostgreSQL with pg package
const { Pool } = require("pg");

async function createFounderUser() {
  const email = "founders@tb.com";
  const password = "tbwebapp26";
  const plan = "FOUNDER";

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = uuidv4();

  console.log("Creating founder user...");
  console.log("Email:", email);
  console.log("Plan:", plan);
  console.log("ID:", id);

  // Connect to database
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL || process.env.RAILWAY_DATABASE_URL,
  });

  try {
    // Check if user exists
    const checkResult = await pool.query(
      "SELECT id, plan FROM users WHERE username = $1",
      [email]
    );

    if (checkResult.rows.length > 0) {
      console.log(`\n⚠️  User ${email} already exists with plan: ${checkResult.rows[0].plan}`);

      // Update to FOUNDER plan
      await pool.query(
        "UPDATE users SET plan = $1, base_plan = $1, subscription_status = 'active' WHERE username = $2",
        [plan, email]
      );
      console.log(`✅ Updated existing user to FOUNDER plan`);
    } else {
      // Insert new user
      await pool.query(
        `INSERT INTO users (id, username, password, plan, base_plan, is_admin, subscription_status) 
         VALUES ($1, $2, $3, $4, $4, 0, 'active')`,
        [id, email, hashedPassword, plan]
      );
      console.log(`\n✅ Founder user created successfully!`);
    }

    console.log(`\nLogin credentials:`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);

  } catch (error) {
    console.error("❌ Error:", error.message);

    // If table columns are different, try alternative column names
    if (error.message.includes("column")) {
      console.log("\n📝 Trying with alternative column names...");
      try {
        await pool.query(
          `INSERT INTO users (id, username, password, plan, "basePlan", "isAdmin", "subscriptionStatus") 
           VALUES ($1, $2, $3, $4, $4, 0, 'active')`,
          [id, email, hashedPassword, plan]
        );
        console.log(`✅ Founder user created successfully!`);
      } catch (error2) {
        console.error("❌ Second attempt failed:", error2.message);
      }
    }
  } finally {
    await pool.end();
  }
}

createFounderUser();