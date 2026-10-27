import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, RADII } from '../theme/colors';

const ROWS = [
  ['♙', 'Personal information', 'Edit your name and contact details'],
  ['♧', 'Food safety guidelines', 'Share and collect responsibly'],
  ['⚙', 'Preferences', 'Notifications and app settings'],
  ['?', 'Help & feedback', 'Tell us how we can improve'],
];

export default function ProfileScreen({ onToast, user, onSignOut }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}><Text style={styles.avatarText}>S</Text></View>
        <Text style={styles.name}>{user?.email?.split("@")[0] || "FoodLoop Member"}</Text>
        <Text style={styles.email}>{user?.email || "Welcome to your local food-sharing community"}</Text>
        <View style={styles.memberTag}><Text style={styles.memberTagText}>🌱  Community member</Text></View>
      </View>
      <View style={styles.impact}>
        <Text style={styles.impactEyebrow}>YOUR COMMUNITY IMPACT</Text>
        <View style={styles.impactRow}><View><Text style={styles.impactNumber}>—</Text><Text style={styles.impactLabel}>Meals shared</Text></View><View><Text style={styles.impactNumber}>—</Text><Text style={styles.impactLabel}>Meals collected</Text></View><View><Text style={styles.impactNumber}>—</Text><Text style={styles.impactLabel}>Waste reduced</Text></View></View>
        <Text style={styles.impactNote}>Impact statistics will appear when real activity is connected to your account.</Text>
      </View>
      <Text style={styles.section}>Account & support</Text>
      <View style={styles.menu}>
        {ROWS.map(([icon, title, subtitle]) => <Pressable key={title} onPress={() => onToast(`${title} will be available in a later version.`)} style={styles.menuRow}><View style={styles.menuIcon}><Text style={styles.menuIconText}>{icon}</Text></View><View style={{ flex: 1 }}><Text style={styles.menuTitle}>{title}</Text><Text style={styles.menuSubtitle}>{subtitle}</Text></View><Text style={styles.chevron}>›</Text></Pressable>)}
      </View>
      <Pressable onPress={onSignOut} style={{ marginTop: 18, padding: 14, backgroundColor: COLORS.white, borderRadius: RADII.md, borderWidth: 1, borderColor: COLORS.line }}><Text style={{ textAlign: "center", color: COLORS.red, fontSize: 12, fontWeight: "800" }}>Sign out</Text></Pressable>
      <Text style={styles.version}>FoodLoop · MVP preview · Made for a kinder community</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { paddingHorizontal: 18, paddingBottom: 30 },
  profileCard: { alignItems: 'center', backgroundColor: COLORS.white, borderRadius: RADII.xl, padding: 24, borderWidth: 1, borderColor: COLORS.line },
  avatar: { width: 76, height: 76, borderRadius: 27, backgroundColor: COLORS.mint, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: COLORS.mintSoft },
  avatarText: { color: COLORS.forest, fontSize: 32, fontWeight: '900' },
  name: { color: COLORS.ink, fontSize: 19, fontWeight: '900', marginTop: 13 },
  email: { color: COLORS.muted, fontSize: 11, marginTop: 5, textAlign: 'center' },
  memberTag: { backgroundColor: COLORS.mintSoft, borderRadius: 30, paddingHorizontal: 12, paddingVertical: 7, marginTop: 13 },
  memberTagText: { color: COLORS.forest, fontSize: 11, fontWeight: '800' },
  impact: { backgroundColor: COLORS.forest, borderRadius: RADII.lg, padding: 17, marginTop: 16 },
  impactEyebrow: { color: '#A9E8C8', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  impactRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, marginBottom: 12 },
  impactNumber: { color: COLORS.white, fontSize: 22, fontWeight: '900', textAlign: 'center' },
  impactLabel: { color: '#D0E9DD', fontSize: 10, marginTop: 5 },
  impactNote: { color: '#B5D4C5', fontSize: 10, lineHeight: 15 },
  section: { color: COLORS.ink, fontSize: 16, fontWeight: '900', marginTop: 24, marginBottom: 12 },
  menu: { backgroundColor: COLORS.white, borderRadius: RADII.lg, borderWidth: 1, borderColor: COLORS.line, paddingHorizontal: 13 },
  menuRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.line },
  menuIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: COLORS.mintSoft, alignItems: 'center', justifyContent: 'center' },
  menuIconText: { color: COLORS.green, fontSize: 18, fontWeight: '800' },
  menuTitle: { color: COLORS.ink, fontSize: 13, fontWeight: '800' },
  menuSubtitle: { color: COLORS.muted, fontSize: 10, marginTop: 3 },
  chevron: { color: COLORS.muted, fontSize: 24 },
  version: { color: COLORS.muted, fontSize: 10, textAlign: 'center', marginTop: 22 },
});
