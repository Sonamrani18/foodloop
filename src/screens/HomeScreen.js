import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import FoodCard from '../components/FoodCard';
import SectionTitle from '../components/SectionTitle';
import ActionButton from '../components/ActionButton';
import EmptyState from '../components/EmptyState';
import { COLORS, RADII } from '../theme/colors';

const CATEGORIES = ['All', 'Meals', 'Bakery', 'Fruits', 'Snacks'];

export default function HomeScreen({ listings, onOpen, onAdd }) {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const available = useMemo(() => listings.filter((item) => item.status === 'Available' && (category === 'All' || item.category === category) && `${item.title} ${item.location}`.toLowerCase().includes(search.toLowerCase())), [listings, category, search]);
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <View style={styles.searchWrap}><Text style={styles.searchIcon}>⌕</Text><TextInput value={search} onChangeText={setSearch} placeholder="Search food or location" placeholderTextColor={COLORS.muted} style={styles.search} /></View>
      <View style={styles.hero}>
        <View style={styles.heroText}><Text style={styles.eyebrow}>SMALL ACTS. BIG IMPACT.</Text><Text style={styles.heroTitle}>Good food{'\n'}shouldn't go{'\n'}to waste.</Text><Text style={styles.heroSub}>Share extra. Help someone. Repeat.</Text><ActionButton title="Share surplus food  →" onPress={onAdd} style={styles.heroButton}/></View>
        <View style={styles.heroArt}><Text style={styles.heroEmoji}>🥬</Text><Text style={styles.heroEmoji2}>🍅</Text><Text style={styles.heroEmoji3}>🥕</Text><View style={styles.artCircle}/></View>
      </View>
      <View style={styles.stats}><View><Text style={styles.statNumber}>{listings.length}</Text><Text style={styles.statLabel}>Food posts</Text></View><View style={styles.statDivider}/><View><Text style={styles.statNumber}>Near you</Text><Text style={styles.statLabel}>Community sharing</Text></View><View style={styles.statDivider}/><View><Text style={styles.statNumber}>Free</Text><Text style={styles.statLabel}>Always</Text></View></View>
      <SectionTitle title="Discover food" action="Clear filters" onAction={() => { setCategory('All'); setSearch(''); }} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
        {CATEGORIES.map((item) => <Pressable key={item} onPress={() => setCategory(item)} style={[styles.chip, category === item && styles.chipActive]}><Text style={[styles.chipText, category === item && styles.chipTextActive]}>{item}</Text></Pressable>)}
      </ScrollView>
      <View style={styles.sectionHeader}><Text style={styles.results}>{available.length} listings available</Text><Text style={styles.sort}>Ending soon ◌</Text></View>
      {available.length ? available.map((item) => <FoodCard key={item.id} item={item} onPress={() => onOpen(item)} />) : <EmptyState emoji="🥣" title="No food found" subtitle="Try another search or category. You can also share surplus food with your community." />}
      <View style={styles.bottomNote}><Text style={styles.bottomNoteEmoji}>💚</Text><View style={{ flex: 1 }}><Text style={styles.bottomNoteTitle}>Every meal matters</Text><Text style={styles.bottomNoteSub}>Take only what you need and collect it on time.</Text></View></View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { paddingHorizontal: 18, paddingBottom: 22 },
  searchWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.line, borderRadius: 14, paddingHorizontal: 13, height: 48, marginBottom: 16 },
  searchIcon: { fontSize: 26, color: COLORS.green, marginRight: 8 },
  search: { flex: 1, fontSize: 13, color: COLORS.ink, paddingVertical: 0 },
  hero: { backgroundColor: COLORS.forest, borderRadius: RADII.xl, padding: 20, minHeight: 230, flexDirection: 'row', overflow: 'hidden', marginBottom: 15 },
  heroText: { flex: 1.2, zIndex: 2 },
  eyebrow: { color: '#A9E8C8', fontSize: 9, letterSpacing: 1.3, fontWeight: '900', marginBottom: 10 },
  heroTitle: { color: COLORS.white, fontSize: 27, lineHeight: 30, fontWeight: '900', letterSpacing: -0.6 },
  heroSub: { color: '#D0E9DD', fontSize: 11, marginTop: 9, marginBottom: 15 },
  heroButton: { backgroundColor: '#25A36B', alignSelf: 'flex-start', minHeight: 39, paddingHorizontal: 13, borderRadius: 11 },
  heroArt: { flex: 0.8, justifyContent: 'center', alignItems: 'center', marginRight: -25 },
  artCircle: { width: 145, height: 145, borderRadius: 80, backgroundColor: '#2A7659', position: 'absolute' },
  heroEmoji: { fontSize: 69, zIndex: 1, transform: [{ rotate: '-14deg' }] },
  heroEmoji2: { fontSize: 35, position: 'absolute', right: 8, top: 35, zIndex: 2 },
  heroEmoji3: { fontSize: 31, position: 'absolute', left: 3, bottom: 34, zIndex: 2, transform: [{ rotate: '24deg' }] },
  stats: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.line, borderRadius: RADII.md, paddingVertical: 13, marginBottom: 23 },
  statNumber: { color: COLORS.forest, fontSize: 14, fontWeight: '900', textAlign: 'center' },
  statLabel: { color: COLORS.muted, fontSize: 9, marginTop: 3, textAlign: 'center' },
  statDivider: { height: 30, width: 1, backgroundColor: COLORS.line },
  categories: { gap: 8, paddingBottom: 14 },
  chip: { paddingHorizontal: 15, paddingVertical: 9, borderRadius: 30, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.line },
  chipActive: { backgroundColor: COLORS.forest, borderColor: COLORS.forest },
  chipText: { color: COLORS.muted, fontSize: 12, fontWeight: '700' },
  chipTextActive: { color: COLORS.white },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  results: { fontSize: 12, color: COLORS.ink, fontWeight: '800' },
  sort: { color: COLORS.muted, fontSize: 11 },
  bottomNote: { backgroundColor: COLORS.mintSoft, borderRadius: RADII.md, padding: 14, flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 6 },
  bottomNoteEmoji: { fontSize: 25 },
  bottomNoteTitle: { color: COLORS.forest, fontWeight: '800', fontSize: 13 },
  bottomNoteSub: { color: COLORS.muted, fontSize: 11, marginTop: 3, lineHeight: 16 },
});
