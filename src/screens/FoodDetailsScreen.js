import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ActionButton from '../components/ActionButton';
import { COLORS, RADII } from '../theme/colors';

export default function FoodDetailsScreen({ item, onBack, onRequest }) {
  const unavailable = item.status !== 'Available';
  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text onPress={onBack} style={styles.back}>‹  Back to food</Text>
        <View style={[styles.art, { backgroundColor: item.color || COLORS.mintSoft }]}><Text style={styles.emoji}>{item.emoji || '🥗'}</Text><View style={styles.photoTag}><Text style={styles.photoTagText}>COMMUNITY FOOD SHARE</Text></View></View>
        <View style={styles.content}>
          <View style={styles.badges}><Text style={styles.category}>{item.category || 'Fresh food'}</Text><Text style={[styles.status, unavailable && styles.statusOff]}>{item.status || 'Available'}</Text></View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.divider}/>
          <Text style={styles.section}>Pickup details</Text>
          <View style={styles.detailRow}><View style={styles.detailIcon}><Text>⌖</Text></View><View style={{ flex: 1 }}><Text style={styles.detailLabel}>Pickup location</Text><Text style={styles.detailValue}>{item.location}</Text></View></View>
          <View style={styles.detailRow}><View style={styles.detailIcon}><Text>◷</Text></View><View style={{ flex: 1 }}><Text style={styles.detailLabel}>Collect before</Text><Text style={styles.detailValue}>{item.expires}</Text></View></View>
          <View style={styles.detailRow}><View style={styles.detailIcon}><Text>♧</Text></View><View style={{ flex: 1 }}><Text style={styles.detailLabel}>Shared by</Text><Text style={styles.detailValue}>{item.postedBy || 'FoodLoop community'}</Text></View></View>
          <View style={styles.safety}><Text style={styles.safetyIcon}>ⓘ</Text><Text style={styles.safetyText}>Please confirm ingredients and allergens with the person sharing this food. Collect promptly and use your own judgement about food safety.</Text></View>
        </View>
      </ScrollView>
      <View style={styles.bottom}><ActionButton title={unavailable ? 'No longer available' : 'Request this food'} disabled={unavailable || item.isMine} onPress={() => onRequest(item)} /><Text style={styles.bottomHint}>{item.isMine ? 'This is your listing.' : unavailable ? 'This listing is not available for requests.' : 'Requesting is free. Coordinate pickup with the donor.'}</Text></View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.canvas },
  scroll: { paddingBottom: 18 },
  back: { color: COLORS.forest, fontSize: 14, fontWeight: '800', paddingHorizontal: 20, paddingTop: 13, paddingBottom: 15 },
  art: { height: 245, marginHorizontal: 18, borderRadius: RADII.xl, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  emoji: { fontSize: 105 },
  photoTag: { position: 'absolute', bottom: 13, left: 13, backgroundColor: '#FFFFFFDD', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  photoTagText: { fontSize: 9, letterSpacing: 0.8, color: COLORS.forest, fontWeight: '900' },
  content: { paddingHorizontal: 20, paddingTop: 20 },
  badges: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  category: { color: COLORS.green, backgroundColor: COLORS.mintSoft, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, fontSize: 11, fontWeight: '800' },
  status: { color: COLORS.green, backgroundColor: COLORS.mint, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, fontSize: 11, fontWeight: '800' },
  statusOff: { color: COLORS.red, backgroundColor: '#FBE8E8' },
  title: { color: COLORS.ink, fontSize: 27, fontWeight: '900', letterSpacing: -0.7, marginTop: 13 },
  quantity: { color: COLORS.green, fontSize: 14, fontWeight: '800', marginTop: 5 },
  description: { color: COLORS.muted, fontSize: 14, lineHeight: 22, marginTop: 14 },
  divider: { height: 1, backgroundColor: COLORS.line, marginVertical: 20 },
  section: { color: COLORS.ink, fontSize: 16, fontWeight: '800', marginBottom: 13 },
  detailRow: { flexDirection: 'row', gap: 12, alignItems: 'center', marginBottom: 16 },
  detailIcon: { width: 40, height: 40, borderRadius: 13, backgroundColor: COLORS.mintSoft, alignItems: 'center', justifyContent: 'center' },
  detailLabel: { color: COLORS.muted, fontSize: 11, marginBottom: 3 },
  detailValue: { color: COLORS.ink, fontSize: 13, fontWeight: '700' },
  safety: { backgroundColor: COLORS.orangeSoft, borderRadius: RADII.md, padding: 13, flexDirection: 'row', gap: 9, marginTop: 8 },
  safetyIcon: { color: '#A85A0B', fontSize: 18, fontWeight: '800' },
  safetyText: { flex: 1, color: '#875A2A', fontSize: 11, lineHeight: 17 },
  bottom: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 12, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.line },
  bottomHint: { textAlign: 'center', color: COLORS.muted, fontSize: 10, marginTop: 8 },
});
