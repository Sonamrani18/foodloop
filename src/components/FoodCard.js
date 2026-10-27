import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, RADII } from '../theme/colors';

export default function FoodCard({ item, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}>
      <View style={[styles.art, { backgroundColor: item.color || COLORS.mintSoft }]}>
        <Text style={styles.emoji}>{item.emoji || '🥗'}</Text>
        <View style={styles.freshBadge}><View style={styles.dot}/><Text style={styles.freshText}>Fresh</Text></View>
      </View>
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
          <Text style={styles.arrow}>›</Text>
        </View>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.pin}>⌖</Text>
          <Text numberOfLines={1} style={styles.location}>{item.distance} · {item.location}</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.expiryPill}><Text style={styles.expiry}>◷  {item.expires}</Text></View>
          <Text style={styles.time}>{item.createdAt}</Text>
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.white, borderRadius: RADII.lg, borderWidth: 1, borderColor: COLORS.line, padding: 10, flexDirection: 'row', gap: 12, marginBottom: 12, shadowColor: COLORS.shadow, shadowOpacity: 0.035, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 1 },
  art: { width: 104, minHeight: 116, borderRadius: RADII.md, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  emoji: { fontSize: 42 },
  freshBadge: { position: 'absolute', bottom: 7, alignSelf: 'center', backgroundColor: '#FFFFFFE8', borderRadius: 30, paddingHorizontal: 8, paddingVertical: 4, flexDirection: 'row', alignItems: 'center', gap: 4 },
  dot: { width: 5, height: 5, borderRadius: 5, backgroundColor: COLORS.greenBright },
  freshText: { color: COLORS.forest, fontSize: 10, fontWeight: '800' },
  info: { flex: 1, justifyContent: 'center', minWidth: 0 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  title: { flex: 1, color: COLORS.ink, fontWeight: '800', fontSize: 14 },
  arrow: { color: COLORS.muted, fontSize: 23, lineHeight: 24 },
  quantity: { color: COLORS.green, fontSize: 12, fontWeight: '700', marginTop: 5, marginBottom: 8 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  pin: { color: COLORS.green, fontSize: 16 },
  location: { flex: 1, color: COLORS.muted, fontSize: 11 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, gap: 5 },
  expiryPill: { backgroundColor: COLORS.orangeSoft, borderRadius: 7, paddingHorizontal: 6, paddingVertical: 4, flexShrink: 1 },
  expiry: { color: '#A85A0B', fontSize: 10, fontWeight: '700' },
  time: { color: COLORS.muted, fontSize: 10 },
});
