import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import FoodCard from '../components/FoodCard';
import EmptyState from '../components/EmptyState';
import ActionButton from '../components/ActionButton';
import { COLORS, RADII } from '../theme/colors';

export default function ActivityScreen({ listings, requests, onOpen, onCancel, onCollected }) {
  const [active, setActive] = useState('Shared by me');
  const mine = listings.filter((item) => item.isMine);
  const data = active === 'Shared by me' ? mine : requests;
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <View style={styles.intro}><Text style={styles.introTitle}>Your good deeds, in one place.</Text><Text style={styles.introSub}>Switch between food you share and food you request.</Text></View>
      <View style={styles.tabs}>{['Shared by me', 'Requested by me'].map((t) => <Pressable key={t} onPress={() => setActive(t)} style={[styles.tab, active === t && styles.tabActive]}><Text style={[styles.tabText, active === t && styles.tabTextActive]}>{t}</Text></Pressable>)}</View>
      {active === 'Shared by me' ? (
        mine.length ? mine.map((item) => <View key={item.id}><FoodCard item={item} onPress={() => onOpen(item)} /><View style={styles.ownerActions}><Text style={[styles.status, item.status === 'Collected' && styles.collected]}>{item.status}</Text>{item.status === 'Available' && <Pressable onPress={() => onCollected(item.id)}><Text style={styles.actionText}>Mark collected ✓</Text></Pressable>}</View></View>) :
        <EmptyState emoji="🥬" title="Nothing shared yet" subtitle="Got extra food? Create your first listing and let someone nearby collect it." />
      ) : (
        requests.length ? requests.map((r) => <View key={r.id} style={styles.requestCard}><View style={styles.requestEmoji}><Text style={{ fontSize: 28 }}>{r.emoji}</Text></View><View style={{ flex: 1 }}><Text style={styles.requestTitle}>{r.title}</Text><Text style={styles.requestMeta}>{r.quantity} · {r.location}</Text><Text style={[styles.status, r.status === 'Pending' ? styles.pending : r.status === 'Cancelled' ? styles.cancelled : styles.collected]}>{r.status}</Text>{r.status === 'Pending' && <Pressable onPress={() => onCancel(r.id)}><Text style={styles.cancelText}>Cancel request</Text></Pressable>}</View></View>) :
        <EmptyState emoji="🤝" title="No requests yet" subtitle="Explore available food and request a listing that works for you." />
      )}
      <View style={styles.tip}><Text style={styles.tipEmoji}>💚</Text><Text style={styles.tipText}>FoodLoop works both ways. Anyone can share food and anyone can request it.</Text></View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { paddingHorizontal: 18, paddingBottom: 25 },
  intro: { backgroundColor: COLORS.mintSoft, padding: 17, borderRadius: RADII.lg, marginBottom: 18 },
  introTitle: { color: COLORS.forest, fontSize: 17, fontWeight: '900' },
  introSub: { color: COLORS.muted, fontSize: 12, lineHeight: 18, marginTop: 5 },
  tabs: { flexDirection: 'row', backgroundColor: '#EAF0EB', borderRadius: 13, padding: 4, marginBottom: 18 },
  tab: { flex: 1, paddingVertical: 11, borderRadius: 10, alignItems: 'center' },
  tabActive: { backgroundColor: COLORS.white, shadowColor: COLORS.shadow, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  tabText: { fontSize: 11, color: COLORS.muted, fontWeight: '700' },
  tabTextActive: { color: COLORS.forest },
  ownerActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: -7, marginBottom: 14, paddingHorizontal: 4 },
  status: { alignSelf: 'flex-start', overflow: 'hidden', color: COLORS.green, backgroundColor: COLORS.mintSoft, borderRadius: 7, paddingHorizontal: 8, paddingVertical: 5, fontSize: 10, fontWeight: '800', marginTop: 7 },
  collected: { color: '#2F6B9D', backgroundColor: COLORS.blueSoft },
  pending: { color: '#A85A0B', backgroundColor: COLORS.orangeSoft },
  cancelled: { color: COLORS.red, backgroundColor: '#FBE8E8' },
  actionText: { color: COLORS.green, fontSize: 11, fontWeight: '800', padding: 8 },
  requestCard: { backgroundColor: COLORS.white, borderRadius: RADII.lg, borderWidth: 1, borderColor: COLORS.line, padding: 13, flexDirection: 'row', gap: 12, marginBottom: 12 },
  requestEmoji: { width: 58, height: 58, backgroundColor: COLORS.mintSoft, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  requestTitle: { color: COLORS.ink, fontSize: 14, fontWeight: '800' },
  requestMeta: { color: COLORS.muted, fontSize: 11, marginTop: 5 },
  cancelText: { color: COLORS.red, fontSize: 11, fontWeight: '700', marginTop: 8 },
  tip: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.line, padding: 13, borderRadius: RADII.md, flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 7 },
  tipEmoji: { fontSize: 22 },
  tipText: { flex: 1, color: COLORS.muted, fontSize: 11, lineHeight: 17 },
});
