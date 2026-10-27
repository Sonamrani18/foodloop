import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme/colors';

export default function EmptyState({ emoji = '🌱', title, subtitle }) {
  return <View style={styles.wrap}><Text style={styles.emoji}>{emoji}</Text><Text style={styles.title}>{title}</Text><Text style={styles.subtitle}>{subtitle}</Text></View>;
}
const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30, paddingVertical: 42 },
  emoji: { fontSize: 42, marginBottom: 12 },
  title: { fontSize: 17, fontWeight: '800', color: COLORS.ink, textAlign: 'center' },
  subtitle: { fontSize: 13, color: COLORS.muted, lineHeight: 20, textAlign: 'center', marginTop: 7 },
});
