# Supabase Setup Guide

## Prerequisites
1. Create a Supabase account at https://supabase.com
2. Create a new project

## Setup Steps

### 1. Get Your Supabase Credentials

From your Supabase project dashboard:
- Go to Settings → API
- Copy the following values:
  - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
  - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### 2. Get Database Connection Strings

From your Supabase project dashboard:
- Go to Settings → Database
- Copy the following:
  - Connection string (Transaction) → `DIRECT_URL`
  - Connection string (Session) → `DATABASE_URL`

### 3. Update Your .env.local File

Add these values to your `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database URLs
DATABASE_URL="postgresql://postgres.[your-project-ref]:[your-password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[your-project-ref]:[your-password]@aws-0-[region].pooler.supabase.com:5432/postgres"
```

### 4. Run Database Migrations

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Or create a migration
npx prisma migrate dev --name init
```

### 5. Configure Stripe Webhook (Production)

For production, configure your Stripe webhook endpoint:
1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-domain.com/api/stripe/webhook`
3. Select events:
   - payment_intent.succeeded
   - payment_intent.payment_failed
   - checkout.session.completed
   - customer.subscription.created
   - customer.subscription.updated
   - customer.subscription.deleted
   - invoice.payment_succeeded
4. Copy the webhook secret to `STRIPE_WEBHOOK_SECRET` in your .env

### 6. Enable Row Level Security (Optional but Recommended)

Run these SQL commands in your Supabase SQL editor:

```sql
-- Enable RLS on all tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Payment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Subscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Application" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Review" ENABLE ROW LEVEL SECURITY;

-- Example policy for User table
CREATE POLICY "Users can view own profile" ON "User"
  FOR SELECT
  USING (auth.uid()::text = id);

CREATE POLICY "Users can update own profile" ON "User"
  FOR UPDATE
  USING (auth.uid()::text = id);
```

## Testing

1. Test database connection:
```bash
npx prisma studio
```

2. Test Stripe webhooks locally:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Deployment

When deploying to Vercel:
1. Add all environment variables to your Vercel project settings
2. Ensure your database migrations are applied
3. Update Stripe webhook URL to your production domain