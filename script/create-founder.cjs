const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

(async () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const hash = await bcrypt.hash('tbwebapp26', 10);

  const existing = await pool.query("SELECT id FROM users WHERE username = 'founders@tb.com'");

  let userId;
  if (existing.rows.length > 0) {
    userId = existing.rows[0].id;
    console.log('User exists. ID:', userId);
  } else {
    const result = await pool.query(`INSERT INTO users (username, password) VALUES ('founders@tb.com', '${hash}') RETURNING id;`);
    userId = result.rows[0].id;
    console.log('✅ User created. ID:', userId);
  }

  const existingSub = await pool.query(`SELECT id FROM subscriptions WHERE user_id = '${userId}'`);

  if (existingSub.rows.length > 0) {
    await pool.query(`UPDATE subscriptions SET plan = 'FOUNDER', status = 'active' WHERE user_id = '${userId}'`);
    console.log('✅ Updated to FOUNDER');
  } else {
    await pool.query(`INSERT INTO subscriptions (user_id, plan, status) VALUES ('${userId}', 'FOUNDER', 'active')`);
    console.log('✅ Created FOUNDER subscription');
  }

  console.log('\nLogin: founders@tb.com / tbwebapp26');
  pool.end();
})();