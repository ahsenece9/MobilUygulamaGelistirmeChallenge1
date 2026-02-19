import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../theme/colors';

const STORAGE_KEY = '@symptom_entries';

const symptomOptions = [
  { id: 'pain', label: 'Ağrı', icon: '🔴' },
  { id: 'fatigue', label: 'Yorgunluk', icon: '😴' },
  { id: 'nausea', label: 'Bulantı', icon: '🤢' },
  { id: 'swelling', label: 'Şişlik', icon: '💧' },
  { id: 'mood', label: 'Ruh Hali', icon: '😔' },
  { id: 'appetite', label: 'İştah Kaybı', icon: '🍽️' },
];

const SymptomTrackingScreen = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [severity, setSeverity] = useState(5);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) setEntries(JSON.parse(data));
    });
  }, []);

  const toggleSymptom = (id, label) => {
    setSelectedSymptoms((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const handleSave = () => {
    if (selectedSymptoms.length === 0) {
      Alert.alert('Uyarı', 'Lütfen en az bir belirti seçin.');
      return;
    }
    const today = new Date().toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const newEntry = { date: today, symptoms: selectedSymptoms, severity, note };
    setEntries((prev) => {
      const updated = [newEntry, ...prev];
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    setSelectedSymptoms([]);
    setSeverity(5);
    setNote('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    Alert.alert('Kaydedildi!', 'Belirtileriniz başarıyla kaydedildi.');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {/* Today's Entry */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Bugünkü Belirtiler</Text>
          <View style={styles.symptomGrid}>
            {symptomOptions.map((s) => {
              const selected = selectedSymptoms.includes(s.label);
              return (
                <TouchableOpacity
                  key={s.id}
                  style={[styles.symptomChip, selected && styles.symptomChipActive]}
                  onPress={() => toggleSymptom(s.id, s.label)}
                >
                  <Text style={styles.symptomChipIcon}>{s.icon}</Text>
                  <Text style={[styles.symptomChipText, selected && styles.symptomChipTextActive]}>
                    {s.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Severity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ Şiddet Seviyesi: {severity}/10</Text>
          <View style={styles.severityRow}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <TouchableOpacity
                key={n}
                style={[
                  styles.severityDot,
                  n <= severity && {
                    backgroundColor: n <= 3 ? colors.success : n <= 6 ? colors.warning : colors.error,
                  },
                ]}
                onPress={() => setSeverity(n)}
              >
                <Text style={styles.severityDotText}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Note */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🗒️ Notlar</Text>
          <TextInput
            style={styles.noteInput}
            multiline
            numberOfLines={3}
            placeholder="Ek notlarınızı buraya yazın..."
            placeholderTextColor={colors.grayMedium}
            value={note}
            onChangeText={setNote}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>{saved ? '✓ Kaydedildi!' : '💾 Kaydet'}</Text>
        </TouchableOpacity>

        {/* History */}
        <Text style={styles.historyTitle}>📅 Geçmiş Kayıtlar</Text>
        {entries.map((entry, index) => (
          <View key={index} style={styles.entryCard}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryDate}>{entry.date}</Text>
              <View
                style={[
                  styles.entryBadge,
                  {
                    backgroundColor:
                      entry.severity <= 3 ? colors.success + '22' :
                      entry.severity <= 6 ? colors.warning + '22' : colors.error + '22',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.entryBadgeText,
                    {
                      color:
                        entry.severity <= 3 ? colors.success :
                        entry.severity <= 6 ? colors.warning : colors.error,
                    },
                  ]}
                >
                  Şiddet: {entry.severity}/10
                </Text>
              </View>
            </View>
            <View style={styles.entrySymptoms}>
              {entry.symptoms.map((s, i) => (
                <View key={i} style={styles.entryTag}>
                  <Text style={styles.entryTagText}>{s}</Text>
                </View>
              ))}
            </View>
            {entry.note ? <Text style={styles.entryNote}>💬 {entry.note}</Text> : null}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: 16 },
  section: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: colors.primary, marginBottom: 14 },
  symptomGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  symptomChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grayLight,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 6,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  symptomChipActive: { backgroundColor: colors.secondaryLight, borderColor: colors.primary },
  symptomChipIcon: { fontSize: 16 },
  symptomChipText: { fontSize: 13, color: colors.textSecondary, fontWeight: '500' },
  symptomChipTextActive: { color: colors.primary, fontWeight: '700' },
  severityRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  severityDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  severityDotText: { fontSize: 12, fontWeight: '700', color: colors.white },
  noteInput: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: colors.textPrimary,
    minHeight: 80,
    backgroundColor: colors.background,
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  historyTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary, marginBottom: 12 },
  entryCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  entryDate: { fontSize: 13, fontWeight: '700', color: colors.textPrimary },
  entryBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10 },
  entryBadgeText: { fontSize: 11, fontWeight: '700' },
  entrySymptoms: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 6 },
  entryTag: {
    backgroundColor: colors.secondaryLight,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  entryTagText: { fontSize: 11, color: colors.primary, fontWeight: '600' },
  entryNote: { fontSize: 12, color: colors.textSecondary, fontStyle: 'italic', marginTop: 4 },
});

export default SymptomTrackingScreen;
