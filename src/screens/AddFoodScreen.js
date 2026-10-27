import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import ActionButton from '../components/ActionButton';
import { COLORS, RADII } from '../theme/colors';

const CATEGORIES = ['Meals', 'Bakery', 'Fruits', 'Snacks'];
const EMOJIS = ['🥗', '🍱', '🥐', '🍎', '🥪', '🍲'];

function Field({ label, value, onChangeText, placeholder, multiline, keyboardType }) {
  return <View style={styles.field}><Text style={styles.label}>{label}</Text><TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="#9AA9A1" multiline={multiline} keyboardType={keyboardType || 'default'} style={[styles.input, multiline && styles.multiline]} textAlignVertical={multiline ? 'top' : 'center'} /></View>;
}

export default function AddFoodScreen({ onBack, onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [expires, setExpires] = useState('Today, 7:30 PM');
  const [category, setCategory] = useState('Meals');
  const [emoji, setEmoji] = useState('🥗');

  const submit = () => {
    if (!title.trim() || !quantity.trim() || !location.trim() || !expires.trim()) {
      Alert.alert('Missing details', 'Please add a food name, quantity, pickup location, and collection deadline.');
      return;
    }
    onSubmit({ title, description, quantity, location, expires, category, emoji });
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text onPress={onBack} style={styles.back}>‹  Cancel</Text>
        <Text style={styles.title}>Share good food.</Text>
        <Text style={styles.subtitle}>A little extra can mean a lot to someone.</Text>
        <View style={styles.upload}>
          <View style={styles.uploadIcon}><Text style={{ fontSize: 24 }}>📷</Text></View>
          <Text style={styles.uploadTitle}>Add a food photo</Text>
          <Text style={styles.uploadSub}>Photo upload will be added in a later version</Text>
        </View>
        <Text style={styles.label}>CHOOSE A FOOD ICON</Text>
        <View style={styles.emojiRow}>{EMOJIS.map((e) => <Pressable key={e} onPress={() => setEmoji(e)} style={[styles.emojiChoice, emoji === e && styles.emojiSelected]}><Text style={{ fontSize: 23 }}>{e}</Text></Pressable>)}</View>
        <Field label="Food name *" value={title} onChangeText={setTitle} placeholder="e.g. Vegetable rice bowl" />
        <Field label="Description" value={description} onChangeText={setDescription} placeholder="Ingredients, packaging, or useful details" multiline />
        <View style={styles.twoCols}>
          <View style={{ flex: 1 }}><Field label="Quantity *" value={quantity} onChangeText={setQuantity} placeholder="e.g. 4 portions" /></View>
          <View style={{ flex: 1 }}><Field label="Available until *" value={expires} onChangeText={setExpires} placeholder="Today, 7 PM" /></View>
        </View>
        <Text style={styles.label}>CATEGORY</Text>
        <View style={styles.categoryRow}>{CATEGORIES.map((c) => <Pressable key={c} onPress={() => setCategory(c)} style={[styles.category, category === c && styles.categoryActive]}><Text style={[styles.categoryText, category === c && styles.categoryTextActive]}>{c}</Text></Pressable>)}</View>
        <Field label="Pickup location *" value={location} onChangeText={setLocation} placeholder="Street, landmark, or venue" />
        <View style={styles.reminder}><Text style={styles.reminderIcon}>ⓘ</Text><Text style={styles.reminderText}>Only list food you believe is suitable to share. Mention known allergens and storage requirements in the description.</Text></View>
        <ActionButton title="Publish food listing  →" onPress={submit} style={{ marginTop: 18 }} />
        <Text style={styles.footnote}>By posting, you agree to coordinate a safe and timely pickup.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.canvas },
  container: { paddingHorizontal: 20, paddingBottom: 28 },
  back: { color: COLORS.forest, fontSize: 14, fontWeight: '800', paddingTop: 12, paddingBottom: 18 },
  title: { color: COLORS.ink, fontSize: 28, fontWeight: '900', letterSpacing: -0.8 },
  subtitle: { color: COLORS.muted, fontSize: 13, marginTop: 6, marginBottom: 20 },
  upload: { height: 115, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.line, borderStyle: 'dashed', borderRadius: RADII.lg, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  uploadIcon: { width: 38, height: 38, borderRadius: 13, backgroundColor: COLORS.mintSoft, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  uploadTitle: { color: COLORS.ink, fontSize: 12, fontWeight: '800' },
  uploadSub: { color: COLORS.muted, fontSize: 10, marginTop: 3 },
  label: { color: COLORS.ink, fontSize: 11, fontWeight: '800', letterSpacing: 0.5, marginBottom: 8 },
  emojiRow: { flexDirection: 'row', gap: 8, marginBottom: 19 },
  emojiChoice: { width: 45, height: 43, borderRadius: 12, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.line, alignItems: 'center', justifyContent: 'center' },
  emojiSelected: { borderColor: COLORS.green, backgroundColor: COLORS.mintSoft, borderWidth: 2 },
  field: { marginBottom: 15 },
  input: { minHeight: 48, borderRadius: 12, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.line, paddingHorizontal: 13, color: COLORS.ink, fontSize: 13 },
  multiline: { minHeight: 85, paddingTop: 12 },
  twoCols: { flexDirection: 'row', gap: 10 },
  categoryRow: { flexDirection: 'row', gap: 7, marginBottom: 17, flexWrap: 'wrap' },
  category: { paddingHorizontal: 12, paddingVertical: 9, borderRadius: 10, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.line },
  categoryActive: { backgroundColor: COLORS.mint, borderColor: COLORS.green },
  categoryText: { color: COLORS.muted, fontSize: 11, fontWeight: '700' },
  categoryTextActive: { color: COLORS.forest },
  reminder: { backgroundColor: COLORS.orangeSoft, borderRadius: RADII.md, padding: 12, flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  reminderIcon: { color: '#A85A0B', fontSize: 17 },
  reminderText: { color: '#875A2A', fontSize: 11, lineHeight: 17, flex: 1 },
  footnote: { textAlign: 'center', color: COLORS.muted, fontSize: 10, marginTop: 10 },
});
