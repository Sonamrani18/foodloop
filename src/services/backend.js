import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../lib/supabase";

const SESSION_KEY = "foodloop_demo_user";

export async function getSessionUser() {
  const value = await AsyncStorage.getItem(SESSION_KEY);
  return value ? JSON.parse(value) : null;
}

async function saveUser(user) {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
}

export async function signUp(email, password) {
  const { data, error } = await supabase.rpc("demo_signup", {
    p_email: email.trim().toLowerCase(),
    p_password: password,
  });

  if (error) throw error;
  return saveUser(data);
}

export async function signIn(email, password) {
  const { data, error } = await supabase.rpc("demo_signin", {
    p_email: email.trim().toLowerCase(),
    p_password: password,
  });

  if (error) throw error;
  return saveUser(data);
}

export async function signOut() {
  await AsyncStorage.removeItem(SESSION_KEY);
}

export async function getListings() {
  const { data, error } = await supabase
    .from("food_listings")
    .select("*")
    .eq("status", "available")
    .gt("pickup_until", new Date().toISOString())
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []).map(mapListing);
}

export async function getMine() {
  const user = await getSessionUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("food_listings")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []).map(mapListing);
}

export async function createListing(form) {
  const user = await getSessionUser();
  if (!user) throw new Error("Please sign in before sharing food.");

  const { data, error } = await supabase
    .from("food_listings")
    .insert({
      owner_id: user.id,
      title: form.title.trim(),
      description:
        form.description?.trim() || "Fresh surplus food, available for pickup.",
      quantity: form.quantity.trim(),
      category: form.category,
      location: form.location.trim(),
      pickup_until: parseUntil(form.expires),
      emoji: form.emoji || "🥗",
    })
    .select("*")
    .single();

  if (error) throw error;
  return mapListing(data);
}

export async function markCollected(id) {
  const { data, error } = await supabase
    .from("food_listings")
    .update({ status: "collected" })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return mapListing(data);
}

export async function createRequest(listing) {
  const user = await getSessionUser();
  if (!user) throw new Error("Please sign in to request food.");

  const { data, error } = await supabase
    .from("food_requests")
    .insert({ listing_id: listing.id, requester_id: user.id })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function getRequests() {
  const user = await getSessionUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("food_requests")
    .select("*, food_listings(*)")
    .eq("requester_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).map((r) => ({
    id: r.id,
    listingId: r.listing_id,
    title: r.food_listings?.title || "Food listing",
    emoji: r.food_listings?.emoji || "🥗",
    location: r.food_listings?.location || "",
    quantity: r.food_listings?.quantity || "",
    status: r.status[0].toUpperCase() + r.status.slice(1),
    createdAt: r.created_at,
  }));
}

export async function cancelRequest(id) {
  const user = await getSessionUser();
  if (!user) throw new Error("Please sign in first.");

  const { error } = await supabase
    .from("food_requests")
    .update({ status: "cancelled" })
    .eq("id", id)
    .eq("requester_id", user.id)
    .eq("status", "pending");

  if (error) throw error;
}

function parseUntil(value) {
  const now = new Date();
  const match = String(value || "").match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);

  if (match) {
    let hour = Number(match[1]) % 12;
    if (match[3].toUpperCase() === "PM") hour += 12;

    now.setHours(hour, Number(match[2] || 0), 0, 0);
    if (now <= new Date()) now.setDate(now.getDate() + 1);
    return now.toISOString();
  }

  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) return date.toISOString();

  now.setHours(23, 0, 0, 0);
  return now.toISOString();
}

function mapListing(r) {
  const color =
    {
      Meals: "#E3F2D9",
      Bakery: "#FFF0D8",
      Fruits: "#FFE7E1",
      Snacks: "#E6EEFF",
    }[r.category] || "#E3F2D9";

  return {
    id: r.id,
    title: r.title,
    description: r.description,
    quantity: r.quantity,
    category: r.category,
    location: r.location,
    distance: "Nearby",
    expires: new Date(r.pickup_until).toLocaleString([], {
      hour: "numeric",
      minute: "2-digit",
    }),
    postedBy: "Community member",
    emoji: r.emoji || "🥗",
    color,
    status: r.status === "collected" ? "Collected" : "Available",
    createdAt: new Date(r.created_at).toLocaleDateString(),
    isMine: false,
    ownerId: r.owner_id,
  };
}
