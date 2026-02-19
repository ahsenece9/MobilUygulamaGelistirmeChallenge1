import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';

const contacts = [
  { icon: '📞', label: 'Yardım Hattı', value: '182', action: () => Linking.openURL('tel:182') },
  { icon: '🌐', label: 'Sağlık Bakanlığı', value: 'saglik.gov.tr', action: () => {} },
  { icon: '📧', label: 'E-posta', value: 'destek@memekanseri.org', action: () => {} },
];

const teamMembers = [
  { name: 'Dr. Proje Ekibi', role: 'Klinik Danışman', icon: '👩‍⚕️' },
  { name: 'Yazılım Ekibi', role: 'Uygulama Geliştirme', icon: '👨‍💻' },
  { name: 'Hasta Hakları', role: 'Danışma Kurulu', icon: '🤝' },
];

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {/* App Info */}
        <View style={styles.appCard}>
          <Text style={styles.appLogo}>🎗️</Text>
          <Text style={styles.appName}>Meme Kanseri Destek</Text>
          <Text style={styles.appVersion}>Versiyon 1.0.0</Text>
          <Text style={styles.appDesc}>
            Bu uygulama, meme kanseri hastalarına ve yakınlarına bilgi, destek ve
            yönlendirme sağlamak amacıyla geliştirilmiştir.
          </Text>
        </View>

        {/* Mission */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎯 Misyonumuz</Text>
          <Text style={styles.cardText}>
            Meme kanseri tanısı alan bireyler ve yakınlarına; güvenilir bilgi,
            uzman desteği ve topluluk bağlantısı sunarak yaşam kalitelerini
            artırmak ve süreçlerini kolaylaştırmaktır.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>✨ Özellikler</Text>
          {[
            '🩺 Belirti yönetimi ve takibi',
            '👩‍⚕️ Uzmanlara soru sorma',
            '💬 Hasta deneyimlerini okuma',
            '📚 Hastalık bilgilendirmesi',
            '📊 Belirti günlüğü tutma',
          ].map((feature, i) => (
            <Text key={i} style={styles.featureItem}>{feature}</Text>
          ))}
        </View>

        {/* Team */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>👥 Ekibimiz</Text>
          {teamMembers.map((member, i) => (
            <View key={i} style={styles.teamRow}>
              <Text style={styles.teamIcon}>{member.icon}</Text>
              <View>
                <Text style={styles.teamName}>{member.name}</Text>
                <Text style={styles.teamRole}>{member.role}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Contact */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📬 İletişim</Text>
          {contacts.map((contact, i) => (
            <TouchableOpacity key={i} style={styles.contactRow} onPress={contact.action}>
              <Text style={styles.contactIcon}>{contact.icon}</Text>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>{contact.label}</Text>
                <Text style={styles.contactValue}>{contact.value}</Text>
              </View>
              <Text style={styles.contactArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerCard}>
          <Text style={styles.disclaimerIcon}>⚕️</Text>
          <Text style={styles.disclaimerTitle}>Tıbbi Feragatname</Text>
          <Text style={styles.disclaimerText}>
            Bu uygulama yalnızca bilgilendirme amaçlıdır. Tıbbi tavsiye, tanı veya
            tedavinin yerini tutmaz. Sağlık sorunlarınız için mutlaka bir sağlık
            profesyoneline başvurun.
          </Text>
        </View>

        <Text style={styles.copyright}>
          © 2026 Meme Kanseri Destek Uygulaması{'\n'}Tüm hakları saklıdır.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: 16 },
  appCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  appLogo: { fontSize: 72, marginBottom: 8 },
  appName: { fontSize: 22, fontWeight: '800', color: colors.white },
  appVersion: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4, marginBottom: 12 },
  appDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 21,
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
  cardTitle: { fontSize: 16, fontWeight: '800', color: colors.primary, marginBottom: 12 },
  cardText: { fontSize: 14, color: colors.textSecondary, lineHeight: 22 },
  featureItem: { fontSize: 14, color: colors.textSecondary, paddingVertical: 4, lineHeight: 20 },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  teamIcon: { fontSize: 32, marginRight: 14 },
  teamName: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  teamRole: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  contactIcon: { fontSize: 24, marginRight: 14 },
  contactInfo: { flex: 1 },
  contactLabel: { fontSize: 13, color: colors.textSecondary },
  contactValue: { fontSize: 14, fontWeight: '700', color: colors.primary },
  contactArrow: { fontSize: 22, color: colors.grayMedium },
  disclaimerCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.warning + '44',
  },
  disclaimerIcon: { fontSize: 32, marginBottom: 8 },
  disclaimerTitle: { fontSize: 15, fontWeight: '800', color: colors.warning, marginBottom: 8 },
  disclaimerText: { fontSize: 13, color: colors.textSecondary, textAlign: 'center', lineHeight: 20 },
  copyright: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
});

export default AboutScreen;
