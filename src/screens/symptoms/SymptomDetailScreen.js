import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';

const severityColor = {
  Yüksek: colors.error,
  Orta: colors.warning,
  Düşük: colors.success,
};

const SymptomDetailScreen = ({ route }) => {
  const { symptom } = route.params;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroIcon}>{symptom.icon}</Text>
          <Text style={styles.heroTitle}>{symptom.title}</Text>
          <View style={styles.heroBadges}>
            <View
              style={[
                styles.badge,
                { backgroundColor: severityColor[symptom.severity] + '22' },
              ]}
            >
              <Text style={[styles.badgeText, { color: severityColor[symptom.severity] }]}>
                ⚡ {symptom.severity} Risk
              </Text>
            </View>
            <View style={styles.catBadge}>
              <Text style={styles.catBadgeText}>🏷️ {symptom.category}</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Genel Açıklama</Text>
            <Text style={styles.sectionText}>{symptom.description}</Text>
          </View>

          {/* Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Detaylı Bilgi</Text>
            <Text style={styles.sectionText}>{symptom.details}</Text>
          </View>

          {/* Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Yapılması Gerekenler</Text>
            {symptom.actions.map((action, index) => (
              <View key={index} style={styles.actionRow}>
                <View style={styles.actionBullet}>
                  <Text style={styles.actionBulletText}>{index + 1}</Text>
                </View>
                <Text style={styles.actionText}>{action}</Text>
              </View>
            ))}
          </View>

          {/* Warning */}
          <View style={styles.warningCard}>
            <Text style={styles.warningIcon}>⚠️</Text>
            <View style={styles.warningContent}>
              <Text style={styles.warningTitle}>Önemli Uyarı</Text>
              <Text style={styles.warningText}>
                Bu bilgiler genel bilgilendirme amaçlıdır. Herhangi bir belirti
                yaşıyorsanız lütfen bir sağlık uzmanına başvurun. Kendi kendinize
                teşhis koymaktan kaçının.
              </Text>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  hero: {
    backgroundColor: colors.primary,
    padding: 28,
    alignItems: 'center',
  },
  heroIcon: { fontSize: 72, marginBottom: 12 },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 16,
  },
  heroBadges: { flexDirection: 'row', gap: 10 },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: { fontSize: 13, fontWeight: '700' },
  catBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  catBadgeText: { fontSize: 13, fontWeight: '700', color: colors.white },
  content: { padding: 20 },
  section: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 23,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  actionBullet: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  actionBulletText: { fontSize: 13, fontWeight: '800', color: colors.white },
  actionText: { flex: 1, fontSize: 14, color: colors.textSecondary, lineHeight: 22 },
  warningCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  warningIcon: { fontSize: 28, marginRight: 14, marginTop: 2 },
  warningContent: { flex: 1 },
  warningTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.warning,
    marginBottom: 6,
  },
  warningText: { fontSize: 13, color: colors.textSecondary, lineHeight: 20 },
  expertButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  expertButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default SymptomDetailScreen;
