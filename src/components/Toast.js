import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, RADII } from '../theme/colors';

export default function Toast({ message }) {
  if (!message) return null;
  return <View pointerEvents="none" style={styles.wrap}><Text style={styles.text}>✓  {message}</Text></View>;
}
const styles = StyleSheet.create({
  wrap: { position: 'absolute', bottom: 86, alignSelf: 'center', backgroundColor: COLORS.forest, paddingHorizontal: 18, paddingVertical: 13, borderRadius: RADII.pill, maxWidth: '90%' },
  text: { color: COLORS.white, fontWeight: '700', fontSize: 12 },
});
