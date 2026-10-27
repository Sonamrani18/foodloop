import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme/colors';

export default function SectionTitle({ title, action, onAction }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {!!action && <Text onPress={onAction} style={styles.action}>{action}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13 },
  title: { fontSize: 17, fontWeight: '800', color: COLORS.ink },
  action: { fontSize: 12, fontWeight: '700', color: COLORS.green },
});
