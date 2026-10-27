import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { COLORS } from "./theme/colors";
import HomeScreen from "./screens/HomeScreen";
import AddFoodScreen from "./screens/AddFoodScreen";
import ActivityScreen from "./screens/ActivityScreen";
import ProfileScreen from "./screens/ProfileScreen";
import FoodDetailsScreen from "./screens/FoodDetailsScreen";
import AuthScreen from "./screens/AuthScreen";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Toast from "./components/Toast";
import { supabase } from "./lib/supabase";
import {
  getSessionUser,
  signIn,
  signUp,
  signOut,
  getListings,
  getMine,
  getRequests,
  createListing,
  createRequest,
  cancelRequest,
  markCollected,
} from "./services/backend";

export default function App() {
  const [tab, setTab] = useState("Home");
  const [listings, setListings] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const notify = (m) => {
    setToast(m);
    setTimeout(() => setToast(""), 2600);
  };
  const load = useCallback(async () => {
    try {
      const [publicItems, mineItems, reqs] = await Promise.all([
        getListings(),
        user ? getMine() : Promise.resolve([]),
        user ? getRequests() : Promise.resolve([]),
      ]);
      const byId = new Map();
      [...publicItems, ...mineItems].forEach((x) =>
        byId.set(x.id, { ...x, isMine: !!user && x.ownerId === user.id }),
      );
      setListings([...byId.values()]);
      setRequests(reqs);
    } catch (e) {
      console.log("FoodLoop load error", e.message);
      notify(`Could not load data: ${e.message}`);
    }
  }, [user]);
  useEffect(() => {
    let alive = true;

    getSessionUser()
      .then((savedUser) => {
        if (alive) setUser(savedUser);
      })
      .catch((error) => console.log("Session error:", error.message))
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);
  useEffect(() => {
    if (!loading) load();
  }, [loading, user, refresh, load]);
  const handleSignIn = async (emailOrData, passwordArg) => {
    const email =
      typeof emailOrData === "object" ? emailOrData?.email : emailOrData;

    const password =
      typeof emailOrData === "object" ? emailOrData?.password : passwordArg;

    if (!email?.trim() || !password) {
      Alert.alert("Missing details", "Enter your email and password.");
      return;
    }

    try {
      const signedInUser = await signIn(email, password);
      setUser(signedInUser);
      notify("Signed in successfully!");
    } catch (error) {
      console.error("Sign-in error:", error);
      Alert.alert("Sign-in failed", error?.message || "Please try again.");
    }
  };

  const handleSignUp = async (emailOrData, passwordArg) => {
    const email =
      typeof emailOrData === "object" ? emailOrData?.email : emailOrData;

    const password =
      typeof emailOrData === "object" ? emailOrData?.password : passwordArg;

    if (!email?.trim() || !password) {
      Alert.alert("Missing details", "Enter your email and password.");
      return;
    }

    try {
      const newUser = await signUp(email, password);
      setUser(newUser);
      notify("Account created successfully!");
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert("Registration failed", error?.message || "Please try again.");
    }
  };
  const addListing = async (form) => {
    try {
      await createListing(form);
      await load();
      setTab("My activity");
      notify("Your food listing is live!");
    } catch (e) {
      Alert.alert("Could not publish listing", e.message);
    }
  };
  const requestFoodHandler = async (item) => {
    try {
      if (item.isMine) {
        notify("You cannot request your own listing.");
        return;
      }
      await createRequest(item);
      await load();
      notify("Request sent!");
      setSelected(null);
      setTab("My activity");
    } catch (e) {
      Alert.alert("Could not request food", e.message);
    }
  };
  const cancelRequestHandler = async (id) => {
    try {
      await cancelRequest(id);
      await load();
      notify("Request cancelled.");
    } catch (e) {
      Alert.alert("Could not cancel request", e.message);
    }
  };
  const collectedHandler = async (id) => {
    try {
      await markCollected(id);
      await load();
      notify("Listing marked as collected.");
    } catch (e) {
      Alert.alert("Could not update listing", e.message);
    }
  };
  const screen = useMemo(() => {
    if (selected)
      return (
        <FoodDetailsScreen
          item={selected}
          onBack={() => setSelected(null)}
          onRequest={requestFoodHandler}
        />
      );
    if (tab === "Add food")
      return (
        <AddFoodScreen onBack={() => setTab("Home")} onSubmit={addListing} />
      );
    if (tab === "My activity")
      return (
        <ActivityScreen
          listings={listings}
          requests={requests}
          onOpen={setSelected}
          onCancel={cancelRequestHandler}
          onCollected={collectedHandler}
        />
      );
    if (tab === "Profile")
      return (
        <ProfileScreen
          onToast={notify}
          user={user}
          onSignOut={async () => {
            try {
              await signOut();
              setTab("Home");
              setSelected(null);
              notify("Signed out.");
            } catch (e) {
              Alert.alert("Sign out failed", e.message);
            }
          }}
        />
      );
    return (
      <HomeScreen
        listings={listings}
        onOpen={setSelected}
        onAdd={() => setTab("Add food")}
      />
    );
  }, [selected, tab, listings, requests, user]);
  if (loading)
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={COLORS.green} />
        </View>
      </SafeAreaView>
    );
  if (!user)
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.canvas} />
        <AuthScreen onSignIn={handleSignIn} onSignUp={handleSignUp} />
        <Toast message={toast} />
      </SafeAreaView>
    );
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.canvas} />
      <View style={styles.app}>
        {!selected && tab !== "Add food" && <Header tab={tab} />}
        <View style={styles.content}>{screen}</View>
        {!selected && tab !== "Add food" && (
          <BottomNav active={tab} onChange={setTab} />
        )}
        <Toast message={toast} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.canvas },
  app: { flex: 1, backgroundColor: COLORS.canvas },
  content: { flex: 1 },
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
});
