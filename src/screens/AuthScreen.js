import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Pressable,
  ActivityIndicator,
} from "react-native";
import ActionButton from "../components/ActionButton";
import { COLORS, RADII } from "../theme/colors";
export default function AuthScreen({ onSignIn, onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signin");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true);
    try {
      if (mode === "signin") {
        await onSignIn(email.trim(), password);
      } else {
        await onSignUp(email.trim(), password);
      }
    } catch (e) {
      Alert.alert("Could not continue", e.message || "Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={s.safe}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={s.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={s.logo}>
          <Text style={{ fontSize: 44 }}>🥬</Text>
        </View>
        <Text style={s.title}>Welcome to FoodLoop</Text>
        <Text style={s.sub}>Good food should never go to waste.</Text>
        <View style={s.card}>
          <Text style={s.heading}>
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </Text>
          <Text style={s.label}>EMAIL ADDRESS</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={COLORS.muted}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
            style={s.input}
          />
          <Text style={s.label}>PASSWORD</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="At least 6 characters"
            placeholderTextColor={COLORS.muted}
            secureTextEntry
            autoComplete={
              mode === "signin" ? "current-password" : "new-password"
            }
            style={s.input}
          />
          <ActionButton
            title={
              busy
                ? "Please wait…"
                : mode === "signin"
                  ? "Sign in →"
                  : "Create account →"
            }
            onPress={submit}
            style={{ marginTop: 12 }}
          />
          <Pressable
            onPress={() => setMode(mode === "signin" ? "signup" : "signin")}
            style={{ padding: 14 }}
          >
            <Text style={s.switch}>
              {mode === "signin"
                ? "New to FoodLoop? Create an account"
                : "Already have an account? Sign in"}
            </Text>
          </Pressable>
          {busy && <ActivityIndicator color={COLORS.green} />}
        </View>
        <Text style={s.foot}>
          One community. Two ways to help: share food or request it.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.canvas },
  container: { flexGrow: 1, justifyContent: "center", padding: 22 },
  logo: {
    alignSelf: "center",
    width: 84,
    height: 84,
    borderRadius: 28,
    backgroundColor: COLORS.mintSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: "900",
    color: COLORS.forest,
    textAlign: "center",
  },
  sub: {
    fontSize: 13,
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: 20,
  },
  heading: {
    fontSize: 19,
    fontWeight: "900",
    color: COLORS.ink,
    marginBottom: 20,
  },
  label: {
    fontSize: 10,
    fontWeight: "800",
    color: COLORS.ink,
    marginBottom: 7,
    marginTop: 9,
    letterSpacing: 0.5,
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.line,
    paddingHorizontal: 13,
    color: COLORS.ink,
    backgroundColor: COLORS.white,
  },
  switch: {
    textAlign: "center",
    color: COLORS.forest,
    fontWeight: "800",
    fontSize: 12,
  },
  foot: {
    textAlign: "center",
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 20,
  },
});
