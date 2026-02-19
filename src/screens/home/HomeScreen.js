import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  {
    id: 'symptoms',
    title: 'Belirti Yönetimi',
    icon: '🩺',
    color: '#E91E63',
    bg: '#FCE4EC',
    screen: 'Symptoms',
  },
  {
    id: 'experiences',
    title: 'Hasta Deneyimleri',
    icon: '💬',
    color: '#9C27B0',
    bg: '#F3E5F5',
    screen: 'PatientExperiences',
  },
  {
    id: 'expert',
    title: 'Uzmana Sor',
    icon: '👩‍⚕️',
    color: '#0288D1',
    bg: '#E1F5FE',
    screen: 'AskExpert',
  },
  {
    id: 'tracking',
    title: 'Belirti Takibi',
    icon: '📊',
    color: '#388E3C',
    bg: '#E8F5E9',
    screen: 'SymptomTracking',
  },
  {
    id: 'info',
    title: 'Hastalık Bilgisi',
    icon: '📚',
    color: '#F57C00',
    bg: '#FFF3E0',
    screen: 'DiseaseInfo',
  },
  {
    id: 'about',
    title: 'Hakkında',
    icon: 'ℹ️',
    color: '#546E7A',
    bg: '#ECEFF1',
    screen: 'About',
  },
];

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Çıkış Yap', 'Hesabınızdan çıkmak istiyor musunuz?', [
      { text: 'İptal', style: 'cancel' },
      { text: 'Çıkış Yap', style: 'destructive', onPress: logout },
    ]);
  };

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Merhaba,</Text>
            <Text style={styles.userName}>{user?.name || 'Kullanıcı'} 👋</Text>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutIcon}>🚪</Text>
          </TouchableOpacity>
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerIcon}>🎗️</Text>
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>Meme Kanseri Destek</Text>
            <Text style={styles.bannerSubtitle}>
              Bilgi, destek ve umut için yanınızdayız
            </Text>
          </View>
        </View>

        {/* Quick Info Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.infoScroll}
          contentContainerStyle={styles.infoScrollContent}
        >
          <View style={[styles.infoCard, { backgroundColor: '#FCE4EC' }]}>
            <Text style={styles.infoCardIcon}>💊</Text>
            <Text style={styles.infoCardTitle}>Tedavi</Text>
            <Text style={styles.infoCardSub}>Bilgilerin</Text>
          </View>
          <View style={[styles.infoCard, { backgroundColor: '#E8F5E9' }]}>
            <Text style={styles.infoCardIcon}>🏥</Text>
            <Text style={styles.infoCardTitle}>Erken</Text>
            <Text style={styles.infoCardSub}>Teşhis</Text>
          </View>
          <View style={[styles.infoCard, { backgroundColor: '#E3F2FD' }]}>
            <Text style={styles.infoCardIcon}>🤝</Text>
            <Text style={styles.infoCardTitle}>Destek</Text>
            <Text style={styles.infoCardSub}>Grupları</Text>
          </View>
          <View style={[styles.infoCard, { backgroundColor: '#FFF3E0' }]}>
            <Text style={styles.infoCardIcon}>📞</Text>
            <Text style={styles.infoCardTitle}>İletişim</Text>
            <Text style={styles.infoCardSub}>Hattı</Text>
          </View>
        </ScrollView>

        {/* Menu Grid */}
        <Text style={styles.sectionTitle}>Menü</Text>
        <View style={styles.grid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.card, { backgroundColor: item.bg }]}
              onPress={() => handleNavigation(item.screen)}
              activeOpacity={0.8}
            >
              <Text style={styles.cardIcon}>{item.icon}</Text>
              <Text style={[styles.cardTitle, { color: item.color }]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer tip */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Günün Tavsiyesi</Text>
          <Text style={styles.tipText}>
            Düzenli kendi kendine meme muayenesi yapmayı unutmayın. Her ay, adet
            döneminden 7-10 gün sonra muayene yapılması önerilir.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  greeting: { fontSize: 14, color: colors.textSecondary },
  userName: { fontSize: 22, fontWeight: '800', color: colors.primary },
  logoutBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.secondaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutIcon: { fontSize: 20 },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    marginVertical: 12,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  bannerIcon: { fontSize: 48, marginRight: 14 },
  bannerText: { flex: 1 },
  bannerTitle: { fontSize: 18, fontWeight: '800', color: colors.white },
  bannerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  infoScroll: { marginBottom: 4 },
  infoScrollContent: { paddingHorizontal: 20, gap: 12, paddingVertical: 4 },
  infoCard: {
    width: 80,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCardIcon: { fontSize: 28, marginBottom: 4 },
  infoCardTitle: { fontSize: 12, fontWeight: '700', color: colors.textPrimary },
  infoCardSub: { fontSize: 11, color: colors.textSecondary },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    gap: 10,
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardIcon: { fontSize: 36, marginBottom: 8 },
  cardTitle: { fontSize: 14, fontWeight: '700', textAlign: 'center' },
  tipCard: {
    backgroundColor: colors.secondaryLight,
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 24,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  tipTitle: { fontSize: 15, fontWeight: '700', color: colors.primaryDark, marginBottom: 8 },
  tipText: { fontSize: 14, color: colors.textSecondary, lineHeight: 21 },
});

export default HomeScreen;
