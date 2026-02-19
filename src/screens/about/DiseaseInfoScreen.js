import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { faqData } from '../../data/mockData';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';

const sections = [
  {
    id: 'what',
    icon: '🎗️',
    title: 'Meme Kanseri Nedir?',
    content:
      'Meme kanseri, meme dokusundaki hücrelerin kontrolsüz büyümesiyle oluşan bir hastalıktır. Hem kadınlarda hem de erkeklerde görülebilmekle birlikte kadınlarda çok daha yaygındır. Dünya genelinde kadınlarda en sık görülen kanser türleri arasında yer almaktadır.',
  },
  {
    id: 'causes',
    icon: '🔬',
    title: 'Risk Faktörleri',
    content:
      'Yaş (40 yaş üstü), ailede meme kanseri öyküsü, BRCA1/BRCA2 gen mutasyonları, hormonal faktörler, obezite, alkol tüketimi ve radyasyona maruz kalma başlıca risk faktörleri arasındadır.',
  },
  {
    id: 'diagnosis',
    icon: '🏥',
    title: 'Tanı Yöntemleri',
    content:
      'Mamografi, ultrasonografi, MRI, biyopsi ve kendi kendine meme muayenesi başlıca tanı yöntemleridir. Erken teşhis, tedavi başarısını önemli ölçüde artırmaktadır.',
  },
  {
    id: 'treatment',
    icon: '💊',
    title: 'Tedavi Seçenekleri',
    content:
      'Cerrahi (lumpektomi veya mastektomi), radyoterapi, kemoterapi, hormon tedavisi ve hedefe yönelik tedavi en yaygın tedavi yöntemleridir. Tedavi planı, kanser evresine ve hastanın durumuna göre belirlenir.',
  },
];

const DiseaseInfoScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => {
      // Simulate successful fetch
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <LoadingSpinner message="Bilgiler yükleniyor..." />;
  if (error) return <ErrorState message={error} onRetry={() => { setError(null); setLoading(true); }} />;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerIcon}>🎗️</Text>
          <Text style={styles.headerTitle}>Meme Kanseri Hakkında</Text>
          <Text style={styles.headerSubtitle}>
            Bilinçli olmak en güçlü silahınızdır
          </Text>
        </View>

        {/* Sections */}
        {sections.map((section) => (
          <View key={section.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>{section.icon}</Text>
              <Text style={styles.cardTitle}>{section.title}</Text>
            </View>
            <Text style={styles.cardText}>{section.content}</Text>
          </View>
        ))}

        {/* Stats */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>📊 İstatistikler</Text>
          <View style={styles.statsGrid}>
            {[
              { value: '1/8', label: 'Kadında Görülme' },
              { value: '%90+', label: 'Erken Evre İyileşme' },
              { value: '2.3M', label: 'Yıllık Yeni Vaka' },
              { value: '40+', label: 'Risk Başlangıç Yaşı' },
            ].map((stat, i) => (
              <View key={i} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* FAQ */}
        <Text style={styles.faqTitle}>❓ Sık Sorulan Sorular</Text>
        {faqData.map((faq) => (
          <TouchableOpacity
            key={faq.id}
            style={styles.faqItem}
            onPress={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
            activeOpacity={0.85}
          >
            <View style={styles.faqHeader}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Text style={styles.faqArrow}>{openFaq === faq.id ? '▲' : '▼'}</Text>
            </View>
            {openFaq === faq.id && (
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: 16 },
  header: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  headerIcon: { fontSize: 56, marginBottom: 8 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: colors.white, textAlign: 'center' },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 6,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  cardIcon: { fontSize: 24, marginRight: 10 },
  cardTitle: { fontSize: 16, fontWeight: '800', color: colors.primary, flex: 1 },
  cardText: { fontSize: 14, color: colors.textSecondary, lineHeight: 22 },
  statsCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  statsTitle: { fontSize: 16, fontWeight: '800', color: colors.white, marginBottom: 16 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statItem: {
    width: '47%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  statValue: { fontSize: 24, fontWeight: '800', color: colors.white },
  statLabel: { fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 4, textAlign: 'center' },
  faqTitle: { fontSize: 18, fontWeight: '800', color: colors.textPrimary, marginBottom: 12 },
  faqItem: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors.border,
  },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQuestion: { flex: 1, fontSize: 14, fontWeight: '700', color: colors.textPrimary, paddingRight: 8 },
  faqArrow: { fontSize: 12, color: colors.primary },
  faqAnswer: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
  },
});

export default DiseaseInfoScreen;
