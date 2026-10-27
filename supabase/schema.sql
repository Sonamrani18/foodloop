-- FoodLoop schema: run once in Supabase Dashboard > SQL Editor.
-- Safe to run after the earlier food_listings table was created; this upgrades it.

create extension if not exists pgcrypto;

create table if not exists public.food_listings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade,
  title text not null,
  description text not null default '',
  quantity text not null,
  category text not null default 'Other',
  location text not null,
  pickup_until timestamptz not null,
  emoji text not null default '🥗',
  status text not null default 'available' check (status in ('available', 'collected', 'expired')),
  created_at timestamptz not null default now()
);

alter table public.food_listings add column if not exists owner_id uuid references auth.users(id) on delete cascade;
alter table public.food_listings add column if not exists description text not null default '';
alter table public.food_listings add column if not exists quantity text;
alter table public.food_listings add column if not exists category text not null default 'Other';
alter table public.food_listings add column if not exists location text;
alter table public.food_listings add column if not exists pickup_until timestamptz;
alter table public.food_listings add column if not exists emoji text not null default '🥗';
alter table public.food_listings add column if not exists status text not null default 'available';
alter table public.food_listings add column if not exists created_at timestamptz not null default now();

create table if not exists public.food_requests (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.food_listings(id) on delete cascade,
  requester_id uuid not null references auth.users(id) on delete cascade,
  message text,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'cancelled', 'completed')),
  created_at timestamptz not null default now(),
  unique (listing_id, requester_id)
);

alter table public.food_listings enable row level security;
alter table public.food_requests enable row level security;

grant select on public.food_listings to anon, authenticated;
grant insert, update, delete on public.food_listings to authenticated;
grant select, insert, update on public.food_requests to authenticated;

-- Drop our policies first so this script can be rerun.
drop policy if exists "Anyone can view available food" on public.food_listings;
drop policy if exists "Owners can insert listings" on public.food_listings;
drop policy if exists "Owners can update listings" on public.food_listings;
drop policy if exists "Owners can delete listings" on public.food_listings;
drop policy if exists "Requesters can view own requests and listing owners can view requests" on public.food_requests;
drop policy if exists "Signed-in users can request available food" on public.food_requests;
drop policy if exists "Requesters can cancel own pending requests" on public.food_requests;

create policy "Anyone can view available food"
on public.food_listings for select to anon, authenticated
using (status = 'available' or (auth.uid() is not null and owner_id = (select auth.uid())));

create policy "Owners can insert listings"
on public.food_listings for insert to authenticated
with check (owner_id = (select auth.uid()));

create policy "Owners can update listings"
on public.food_listings for update to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

create policy "Owners can delete listings"
on public.food_listings for delete to authenticated
using (owner_id = (select auth.uid()));

create policy "Requesters can view own requests and listing owners can view requests"
on public.food_requests for select to authenticated
using (
  requester_id = (select auth.uid())
  or exists (
    select 1 from public.food_listings l
    where l.id = listing_id and l.owner_id = (select auth.uid())
  )
);

create policy "Signed-in users can request available food"
on public.food_requests for insert to authenticated
with check (
  requester_id = (select auth.uid())
  and exists (
    select 1 from public.food_listings l
    where l.id = listing_id
      and l.status = 'available'
      and l.owner_id is distinct from (select auth.uid())
      and l.pickup_until > now()
  )
);

create policy "Requesters can cancel own pending requests"
on public.food_requests for update to authenticated
using (requester_id = (select auth.uid()) and status = 'pending')
with check (requester_id = (select auth.uid()) and status = 'cancelled');

create index if not exists food_listings_status_created_idx on public.food_listings (status, created_at desc);
create index if not exists food_requests_requester_idx on public.food_requests (requester_id, created_at desc);
create index if not exists food_requests_listing_idx on public.food_requests (listing_id, created_at desc);

-- Demo listings so the Discover screen is not empty on first launch.
-- These are public sample posts (owner_id is NULL), not real people or offers.
insert into public.food_listings (title, description, quantity, category, location, pickup_until, emoji, status)
select 'Garden Veggie Bowl', 'A wholesome bowl with seasonal vegetables, rice, and a light herb dressing.', '4 portions', 'Meals', 'Greenwood Community Cafe', now() + interval '3 hours', '🥗', 'available'
where not exists (select 1 from public.food_listings where title = 'Garden Veggie Bowl' and owner_id is null);
insert into public.food_listings (title, description, quantity, category, location, pickup_until, emoji, status)
select 'Fresh Bakery Pack', 'A mixed pack of fresh bread rolls and buns from today’s batch.', '8 items', 'Bakery', 'Little Oven Bakery', now() + interval '4 hours', '🥐', 'available'
where not exists (select 1 from public.food_listings where title = 'Fresh Bakery Pack' and owner_id is null);
insert into public.food_listings (title, description, quantity, category, location, pickup_until, emoji, status)
select 'Seasonal Fruit Box', 'Fresh bananas, apples, and oranges. Please bring a reusable bag if possible.', '3 boxes', 'Fruits', 'Central Market', now() + interval '5 hours', '🍎', 'available'
where not exists (select 1 from public.food_listings where title = 'Seasonal Fruit Box' and owner_id is null);
insert into public.food_listings (title, description, quantity, category, location, pickup_until, emoji, status)
select 'Veg Sandwiches', 'Freshly prepared vegetable sandwiches, packed individually.', '5 sandwiches', 'Snacks', 'Campus Corner', now() + interval '2 hours', '🥪', 'available'
where not exists (select 1 from public.food_listings where title = 'Veg Sandwiches' and owner_id is null);
