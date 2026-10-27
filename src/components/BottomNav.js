import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme/colors';

const ITEMS = [
  { key: 'Home', icon: '⌂', label: 'Explore' },
  { key: 'Add food', icon: '+', label: 'Share food', raised: true },
  { key: 'My activity', icon: '↗', label: 'My activity' },
  { key: 'Profile', icon: '○', label: 'Profile' },
];

export default function BottomNav({ active, onChange }) {
  return (
    <View style={styles.bar}>
      {ITEMS.map((item) => {
        const selected = active === item.key || (item.key === 'Home' && active === 'Home');
        return (
          <Pressable key={item.key} onPress={() => onChange(item.key)} style={styles.item}>
            <View style={[styles.iconWrap, item.raised && styles.plusWrap, selected && !item.raised && styles.selectedWrap]}>
              <Text style={[styles.icon, item.raised && styles.plus, selected && !item.raised && styles.selectedIcon]}>{item.icon}</Text>
            </View>
            <Text style={[styles.label, selected && styles.selectedLabel]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  bar: { flexDirection: 'row', backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.line, paddingTop: 9, paddingBottom: 8, paddingHorizontal: 8, justifyContent: 'space-around' },
  item: { alignItems: 'center', justifyContent: 'center', minWidth: 65, gap: 3 },
  iconWrap: { width: 34, height: 28, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  selectedWrap: { backgroundColor: COLORS.mintSoft },
  plusWrap: { backgroundColor: COLORS.green, width: 40, height: 34, borderRadius: 13, marginTop: -14, borderWidth: 3, borderColor: COLORS.canvas },
  icon: { color: COLORS.muted, fontSize: 23, fontWeight: '600', lineHeight: 25 },
  plus: { color: COLORS.white, fontSize: 25, lineHeight: 27 },
  selectedIcon: { color: COLORS.green },
  label: { fontSize: 10, color: COLORS.muted, fontWeight: '600' },
  selectedLabel: { color: COLORS.green, fontWeight: '800' },
});
