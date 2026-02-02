-- ============================================================
-- Transformation Builder — Railway PostgreSQL Schema
-- Recreates the exact Supabase schema: users, subscriptions, waitlist
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- Enumerated type: plan
-- Values: EXPLORER, TRANSFORMER, IMPLEMENTER
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'plan') THEN
    CREATE TYPE plan AS ENUM ('EXPLORER', 'TRANSFORMER', 'IMPLEMENTER');
  END IF;
END$$;

-- ============================================================
-- Table: users
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id              UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
  username        TEXT            NOT NULL UNIQUE,
  password        TEXT            NOT NULL,
  is_admin        BOOLEAN         NOT NULL DEFAULT false,
  created_at      TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- Table: subscriptions
-- ============================================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id                      UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id                 UUID            NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan                    plan            NOT NULL DEFAULT 'EXPLORER',
  status                  TEXT            NOT NULL DEFAULT 'active',
  stripe_customer_id      TEXT,
  stripe_subscription_id  TEXT,
  current_period_end      TIMESTAMP WITHOUT TIME ZONE,
  created_at              TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updated_at              TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  trial_ends_at           TIMESTAMP WITHOUT TIME ZONE,
  trial_plan              plan,
  stripe_price_id         TEXT
);

-- ============================================================
-- Table: waitlist
-- ============================================================
CREATE TABLE IF NOT EXISTS waitlist (
  id                  UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
  email               TEXT            NOT NULL UNIQUE,
  first_name          TEXT            NOT NULL,
  last_name           TEXT,
  transformation_goal TEXT,
  agree_to_updates    BOOLEAN         NOT NULL DEFAULT true,
  created_at          TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- Indexes (matching Supabase exactly)
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist (created_at);
CREATE INDEX IF NOT EXISTS idx_waitlist_email      ON waitlist (email);

-- Primary keys and unique constraints already create indexes:
--   users_pkey, users_username_unique (from UNIQUE on username)
--   subscriptions_pkey
--   waitlist_pkey, waitlist_email_key (from UNIQUE on email)

-- ============================================================
-- Done!
-- ============================================================