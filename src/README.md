# FoodLoop — React Native UI MVP

A lightweight Expo + React Native front-end for a community surplus-food sharing app.

## Included
- Explore available food with search and category filters
- Food detail screen with collection deadline and safety reminder
- Add food listing form with validation
- My activity tabs for food shared and food requested
- Request flow, cancel request, and mark own listing collected
- Profile screen and reusable design system
- Flexible user model: users can share and request food; there is no permanent donor/recipient role

## Important MVP limitations
This version uses in-memory sample data. Listings and requests reset when the app restarts. Authentication, persistent database storage, real photo upload, maps, notifications, and chat are not implemented yet. Profile actions are placeholders. Food photos are represented with emoji illustrations so the app runs without extra dependencies.

## Setup
Create an Expo project, then copy this `src` folder into the project root.

If your project has a root `App.js`, replace its contents with:

```js
export { default } from './src/App';
```

If you created an Expo Router template, its `app/` directory is the entry point. The simplest path is to create a blank Expo project or use a root `App.js` template. Alternatively, import `src/App` from your existing app entry route and remove/adjust the default route layout so it does not render a second navigation layer.

Install dependencies and start the app:

```bash
npm install
npx expo start
```

No third-party UI packages are required; only React Native and Expo dependencies are used.

## Suggested next steps
1. Add real navigation with Expo Router once the UI is stable.
2. Add Supabase authentication and user profiles.
3. Persist food listings and requests in PostgreSQL.
4. Configure Row Level Security so only listing owners can edit their listings and only request owners can cancel their requests.
5. Add photo uploads, real expiry handling, and pickup coordination.
6. Add tests and a project demo.

## Folder structure
```text
src/
  App.js
  components/
  data/
  screens/
  theme/
```
