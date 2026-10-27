import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme/colors';

export default function Header({ tab }) {
  if (tab === 'Profile') {
    return <View style={styles.header}><Text style={styles.pageTitle}>Your profile</Text><Text style={styles.sub}>Your FoodLoop account</Text></View>;
  }
  if (tab === 'My activity') {
    return <View style={styles.header}><Text style={styles.pageTitle}>My activity</Text><Text style={styles.sub}>Everything you share and request</Text></View>;
  }
  return (
    <View style={styles.header}>
      <View style={styles.brandRow}><View style={styles.logo}><Text style={styles.logoText}>f</Text></View><Text style={styles.brand}>Food<Text style={styles.brandAccent}>Loop</Text></Text><View style={{ flex: 1 }}/><View style={styles.avatar}><Text style={styles.avatarText}>S</Text></View></View>
      <Text style={styles.greeting}>Good food, <Text style={{ color: COLORS.green }}>good things.</Text></Text>
      <Text style={styles.sub}>Find food nearby or share a little kindness.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 16, backgroundColor: COLORS.canvas },
  brandRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 22 },
  logo: { width: 32, height: 32, borderRadius: 11, backgroundColor: COLORS.green, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  logoText: { color: COLORS.white, fontWeight: '900', fontSize: 22, fontStyle: 'italic' },
  brand: { color: COLORS.forest, fontSize: 22, fontWeight: '900', letterSpacing: -0.7 },
  brandAccent: { color: COLORS.greenBright },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.mint, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: COLORS.forest, fontWeight: '800' },
  greeting: { color: COLORS.ink, fontSize: 24, fontWeight: '900', letterSpacing: -0.7 },
  pageTitle: { color: COLORS.ink, fontSize: 25, fontWeight: '900', letterSpacing: -0.6 },
  sub: { color: COLORS.muted, fontSize: 13, marginTop: 5, lineHeight: 19 },
});
