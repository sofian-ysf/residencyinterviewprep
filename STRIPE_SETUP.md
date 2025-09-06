# Stripe Payment Integration Setup

## Overview
The application is now integrated with Stripe for processing payments when users select an application review package.

## Setup Instructions

### 1. Create a Stripe Account
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register)
2. Sign up for a free account
3. Complete your business profile

### 2. Get Your API Keys
1. In the Stripe Dashboard, navigate to **Developers → API keys**
2. Copy your test keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

### 3. Update Environment Variables
Replace the placeholder values in your `.env` file:

```env
# Stripe Test Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_publishable_key_here"
STRIPE_SECRET_KEY="your_secret_key_here"
```

### 4. Setup Webhook Endpoint
1. In Stripe Dashboard, go to **Developers → Webhooks**
2. Click **Add endpoint**
3. Enter your webhook URL:
   - Local development: Use [ngrok](https://ngrok.com/) to expose your local server
     ```bash
     ngrok http 3000
     # Use the HTTPS URL: https://xxx.ngrok.io/api/stripe/webhook
     ```
   - Production: `https://yourdomain.com/api/stripe/webhook`

4. Select events to listen for:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

5. Copy the **Signing secret** (starts with `whsec_`) and add to `.env`:
   ```env
   STRIPE_WEBHOOK_SECRET="your_webhook_secret_here"
   ```

### 5. Test the Integration

#### Test Cards
Use these test card numbers in Stripe Checkout:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Authentication Required**: `4000 0025 0000 3155`

Use any future date for expiry and any 3 digits for CVC.

#### Test Flow
1. Navigate to `/dashboard/new`
2. Select a package
3. Click "Proceed to Payment"
4. Complete checkout with test card
5. Verify payment in Stripe Dashboard
6. Check database for payment record

## How It Works

### Payment Flow
1. User selects a package on `/dashboard/new`
2. Clicking "Proceed to Payment" creates a Stripe Checkout Session
3. User is redirected to Stripe's hosted checkout page
4. After payment:
   - Success: Redirected to `/dashboard/applications?payment=success`
   - Cancel: Redirected to `/dashboard/new?payment=cancelled`
5. Webhook receives payment confirmation
6. Database is updated with payment and application records

### Database Updates
When payment succeeds, the webhook:
1. Updates payment status to `SUCCEEDED`
2. Creates an application record with `DRAFT` status
3. Links payment to the application

### API Endpoints

#### POST `/api/stripe/checkout`
Creates a Stripe Checkout Session
```json
{
  "packageId": "essential",
  "packageName": "Essential Review",
  "price": 149
}
```

#### POST `/api/stripe/webhook`
Handles Stripe webhook events (called by Stripe)

## Production Considerations

### 1. Use Live Keys
Replace test keys with live keys in production:
- Get live keys from Stripe Dashboard (remove test mode toggle)
- Update all environment variables with live keys

### 2. Security
- Keep `STRIPE_SECRET_KEY` secure and never expose it client-side
- Verify webhook signatures to ensure requests are from Stripe
- Use HTTPS in production

### 3. Error Handling
- Implement proper error pages for payment failures
- Log webhook errors for debugging
- Set up alerts for failed payments

### 4. Testing
- Test the full payment flow before going live
- Verify webhook handling with Stripe CLI:
  ```bash
  stripe listen --forward-to localhost:3000/api/stripe/webhook
  ```

## Troubleshooting

### Webhook Not Receiving Events
- Check webhook URL is correct
- Verify signing secret matches
- Ensure your server is accessible (use ngrok for local testing)

### Payment Not Updating Database
- Check Prisma schema has Payment model
- Verify database connection
- Check webhook logs in Stripe Dashboard

### Checkout Session Fails
- Verify API keys are correct
- Check user is authenticated
- Ensure price is in correct format (dollars, not cents)

## Support
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com/)