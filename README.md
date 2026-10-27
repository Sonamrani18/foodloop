# FoodLoop — Complete Expo + Supabase app

This is a standalone project, not a merge-only patch. It includes the FoodLoop UI, Expo Router entry points, Supabase client, email/password authentication, database-backed listings, requesting food, cancelling requests, marking your own listing collected, and SQL Row Level Security policies. The original green/mint FoodLoop screen components and styling are retained.

## 1. Configure Supabase

1. Open your Supabase project → SQL Editor → New query.
2. Open `supabase/schema.sql` from this folder, copy all of it into SQL Editor, and click Run. This script upgrades the existing `food_listings` table, creates `food_requests`, sets RLS policies, and adds demo listings.
3. In Supabase → Authentication → Providers, make sure Email is enabled. For quick local testing, you can disable email confirmation in Authentication settings; for real use, keep confirmation enabled.
4. Copy `.env.example` to a file named `.env` in the project root.
5. Fill in your project URL and publishable key. Do not use a service-role or secret key in this app.

Example `.env`:

```env
EXPO_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SB_PUBLISHABLE_KEY
```

## 2. Install and run

Use Node.js LTS. In a terminal opened inside this folder, run:

```bash
npm install
npx expo start --clear
```

For the web version:

```bash
npx expo start --web
```

For mobile, scan the Expo QR code with Expo Go. If your existing machine has a different Expo SDK setup, use `npx expo install --check` and resolve any SDK version mismatch it reports.

## 3. First use

- Create an account with an email and password (minimum 6 characters).
- If email confirmation is enabled, confirm the email, then sign in.
- Explore the sample listings.
- Use Add Food to create a persistent listing.
- Use My Activity to view your own listings, mark them collected, and see/cancel your requests.
- Profile contains sign out.

## Data and security

- Every account can both share food and request food; there are no fixed donor/recipient roles.
- Listing inserts and updates require a signed-in owner; RLS enforces ownership.
- Requests are tied to the signed-in requester and can only be cancelled while pending.
- The demo listings have no owner and are intended only as examples. Replace or delete them before a public launch.
- Food photos, live location/distance, chat, push notifications, and request acceptance/fulfilment workflows are not implemented in this MVP. The current food image UI remains the same emoji placeholder, intentionally preserving your design.

## Folder map

- `app/index.tsx` — Expo Router entry, renders the FoodLoop UI
- `src/App.js` — app state and backend integration
- `src/screens/` and `src/components/` — existing UI
- `src/lib/supabase.js` — Supabase client with persistent AsyncStorage sessions
- `src/services/backend.js` — authentication, listing, and request data operations
- `supabase/schema.sql` — schema, RLS policies, indexes, demo data
