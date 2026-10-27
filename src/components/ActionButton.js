import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { COLORS, RADII } from '../theme/colors';

export default function ActionButton({ title, onPress, variant = 'primary', disabled = false, loading = false, style }) {
  const secondary = variant === 'secondary';
  const subtle = variant === 'subtle';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        secondary && styles.secondary,
        subtle && styles.subtle,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      {loading ? <ActivityIndicator color={secondary || subtle ? COLORS.forest : COLORS.white} /> :
        <Text style={[styles.text, (secondary || subtle) && styles.secondaryText]}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: 50, paddingHorizontal: 18, borderRadius: RADII.md, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.green },
  secondary: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.line },
  subtle: { backgroundColor: COLORS.mintSoft },
  text: { color: COLORS.white, fontSize: 14, fontWeight: '800' },
  secondaryText: { color: COLORS.forest },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.86, transform: [{ scale: 0.99 }] },
});
