import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  SafeAreaView as RNSafeAreaView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { id: 'symptoms', title: 'Belirti Yönetimi', icon: '🩺', color: '#E91E63', bg: '#FCE4EC', screen: 'Symptoms' },
  { id: 'experiences', title: 'Hasta Deneyimleri', icon: '💬', color: '#9C27B0', bg: '#F3E5F5', screen: 'PatientExperiences' },
  { id: 'expert', title: 'Uzmana Sor', icon: '👩‍⚕️', color: '#0288D1', bg: '#E1F5FE', screen: 'AskExpert' },
  { id: 'tracking', title: 'Belirti Takibi', icon: '📊', color: '#388E3C', bg: '#E8F5E9', screen: 'SymptomTracking' },
  { id: 'info', title: 'Hastalık Bilgisi', icon: '📚', color: '#F57C00', bg: '#FFF3E0', screen: 'DiseaseInfo' },
  { id: 'about', title: 'Hakkında', icon: 'ℹ️', color: '#546E7A', bg: '#ECEFF1', screen: 'About' },
];

const infoCards = [
  {
    id: 'tedavi',
    icon: '💊',
    title: 'Tedavi',
    sub: 'Bilgileri',
    bg: '#FCE4EC',
    modalTitle: '💊 Tedavi Yöntemleri',
    content: [
      { emoji: '🔬', baslik: 'Kemoterapi', aciklama: 'Kanser hücrelerini yok eden ilaçların damar veya ağız yoluyla verilmesidir. Genellikle 4–8 kür uygulanır.' },
      { emoji: '☢️', baslik: 'Radyoterapi', aciklama: 'Yüksek enerjili ışınlarla kanser hücrelerinin yok edilmesidir. Cerrahi sonrası lokal kontrolü sağlar.' },
      { emoji: '🔪', baslik: 'Cerrahi', aciklama: 'Tümörün alınmasıdır. Lumpektomi (koruyucu) veya mastektomi (tüm meme) şeklinde uygulanabilir.' },
      { emoji: '🧬', baslik: 'Hedefe Yönelik Tedavi', aciklama: 'HER2+ tümörlerde trastuzumab gibi ilaçlar kanser hücrelerini seçici olarak hedefler.' },
      { emoji: '⚗️', baslik: 'Hormon Tedavisi', aciklama: 'ER/PR+ kanserlerde tamoksifen veya aromataz inhibitörleri kullanılır. 5–10 yıl sürebilir.' },
    ],
  },
  {
    id: 'erken',
    icon: '🏥',
    title: 'Erken',
    sub: 'Teşhis',
    bg: '#E8F5E9',
    modalTitle: '🏥 Erken Teşhis Rehberi',
    content: [
      { emoji: '📅', baslik: 'Mamografi Taraması', aciklama: '40–49 yaş: 1–2 yılda bir\n50+ yaş: Her yıl\nYüksek riskli: 30 yaşından itibaren yıllık MR + mamografi' },
      { emoji: '🤲', baslik: 'Kendi Kendine Muayene', aciklama: 'Her ay, adet bitiminden 7–10 gün sonra yapın.\n• Aynada bakarak şekil değişikliği kontrol edin\n• Yatarak her iki elinizle dairesel hareketlerle muayene edin\n• Meme başı akıntısına dikkat edin' },
      { emoji: '👩‍⚕️', baslik: 'Klinik Muayene', aciklama: '20–39 yaş: 3 yılda bir\n40+ yaş: Yılda bir kez doktor muayenesi yaptırın.' },
      { emoji: '⚠️', baslik: 'Uyarı İşaretleri', aciklama: '• Memede kitle veya sertlik\n• Meme derisinde değişiklik\n• Meme başı içe çökmesi\n• Kanlı akıntı\n• Koltuk altında şişlik' },
    ],
  },
  {
    id: 'destek',
    icon: '🤝',
    title: 'Destek',
    sub: 'Grupları',
    bg: '#E3F2FD',
    modalTitle: '🤝 Destek Grupları',
    content: [
      { emoji: '🎗️', baslik: 'KAÇUV', aciklama: 'Kanserli Çocuklara Umut Vakfı. Hasta ve ailelerine psikososyal destek sağlar.\n📞 0212 221 00 58' },
      { emoji: '🌸', baslik: 'Meme Sağlığı Derneği', aciklama: 'Meme kanseri farkındalığı ve hasta destek programları düzenler.\n🌐 memesagligi.org' },
      { emoji: '💜', baslik: 'Lösev', aciklama: 'Kanser hastalarına maddi ve manevi destek sağlayan vakıf.\n📞 0312 435 45 55' },
      { emoji: '🏥', baslik: 'Hastane Psikoonkoloji', aciklama: 'Büyük şehir hastanelerinde psikoonkoloji birimleri ücretsiz psikolojik destek sunar. Onkologunuzdan randevu talep edin.' },
      { emoji: '💻', baslik: 'Çevrimiçi Gruplar', aciklama: 'Kanser hastalarının buluştuğu destek forumları ve sosyal medya grupları duygusal paylaşım ortamı sunar.' },
    ],
  },
  {
    id: 'iletisim',
    icon: '📞',
    title: 'İletişim',
    sub: 'Hattı',
    bg: '#FFF3E0',
    modalTitle: '📞 İletişim & Yardım Hatları',
    content: [
      { emoji: '🆘', baslik: 'ALO 182 — Sağlık Hattı', aciklama: 'Sağlık Bakanlığı 7/24 ücretsiz danışma hattı. Genel sağlık sorularınız için arayabilirsiniz.' },
      { emoji: '🎗️', baslik: 'Kanser Danışma Hattı', aciklama: 'Türkiye Kanser Enstitüsü\n📞 0312 305 00 00\nHafta içi 08:00–17:00' },
      { emoji: '🏥', baslik: 'Onkoloji Randevu', aciklama: 'MHRS (Merkezi Hekim Randevu Sistemi)\n📞 182\n🌐 mhrs.gov.tr\nEn yakın onkoloji uzmanına randevu alın.' },
      { emoji: '🚑', baslik: 'Acil Servis', aciklama: 'Ani ağrı, yüksek ateş (38°C+) veya ciddi yan etki durumunda en yakın acil servise başvurun veya 112\'yi arayın.' },
      { emoji: '💜', baslik: 'Psikolojik Destek', aciklama: 'ALO 182 üzerinden psikolojik danışmanlık hizmetine ulaşabilirsiniz. Ayrıca ÇÖZÜM MERKEZİ: 444 0 632' },
    ],
  },
];

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [activeModal, setActiveModal] = useState(null);

  const handleLogout = () => {
    Alert.alert('Çıkış Yap', 'Hesabınızdan çıkmak istiyor musunuz?', [
      { text: 'İptal', style: 'cancel' },
      { text: 'Çıkış Yap', style: 'destructive', onPress: logout },
    ]);
  };

  const selectedCard = infoCards.find((c) => c.id === activeModal);

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
            <Text style={styles.bannerSubtitle}>Bilgi, destek ve umut için yanınızdayız</Text>
          </View>
        </View>

        {/* Quick Info Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.infoScroll}
          contentContainerStyle={styles.infoScrollContent}
        >
          {infoCards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[styles.infoCard, { backgroundColor: card.bg }]}
              onPress={() => setActiveModal(card.id)}
              activeOpacity={0.75}
            >
              <Text style={styles.infoCardIcon}>{card.icon}</Text>
              <Text style={styles.infoCardTitle}>{card.title}</Text>
              <Text style={styles.infoCardSub}>{card.sub}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Menu Grid */}
        <Text style={styles.sectionTitle}>Menü</Text>
        <View style={styles.grid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.card, { backgroundColor: item.bg }]}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.8}
            >
              <Text style={styles.cardIcon}>{item.icon}</Text>
              <Text style={[styles.cardTitle, { color: item.color }]}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer tip */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Günün Tavsiyesi</Text>
          <Text style={styles.tipText}>
            Düzenli kendi kendine meme muayenesi yapmayı unutmayın. Her ay, adet döneminden 7-10 gün sonra muayene yapılması önerilir.
          </Text>
        </View>
      </ScrollView>

      {/* Info Modal */}
      <Modal
        visible={!!activeModal}
        animationType="slide"
        transparent
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>{selectedCard?.modalTitle}</Text>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScroll}>
              {selectedCard?.content.map((item, i) => (
                <View key={i} style={styles.modalItem}>
                  <Text style={styles.modalItemEmoji}>{item.emoji}</Text>
                  <View style={styles.modalItemBody}>
                    <Text style={styles.modalItemTitle}>{item.baslik}</Text>
                    <Text style={styles.modalItemText}>{item.aciklama}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setActiveModal(null)}>
              <Text style={styles.closeBtnText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: colors.secondaryLight,
    justifyContent: 'center', alignItems: 'center',
  },
  logoutIcon: { fontSize: 20 },
  banner: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.primary,
    marginHorizontal: 20, marginVertical: 12,
    borderRadius: 16, padding: 16,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  bannerIcon: { fontSize: 48, marginRight: 14 },
  bannerText: { flex: 1 },
  bannerTitle: { fontSize: 18, fontWeight: '800', color: colors.white },
  bannerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  infoScroll: { marginBottom: 4 },
  infoScrollContent: { paddingHorizontal: 20, gap: 12, paddingVertical: 4 },
  infoCard: {
    width: 80, borderRadius: 14, padding: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  infoCardIcon: { fontSize: 28, marginBottom: 4 },
  infoCardTitle: { fontSize: 12, fontWeight: '700', color: colors.textPrimary },
  infoCardSub: { fontSize: 11, color: colors.textSecondary },
  sectionTitle: {
    fontSize: 18, fontWeight: '800', color: colors.textPrimary,
    paddingHorizontal: 20, marginTop: 16, marginBottom: 12,
  },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 14, gap: 10, justifyContent: 'space-between',
  },
  card: {
    width: '47%', borderRadius: 16, padding: 18,
    alignItems: 'center', justifyContent: 'center', minHeight: 110,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  cardIcon: { fontSize: 36, marginBottom: 8 },
  cardTitle: { fontSize: 14, fontWeight: '700', textAlign: 'center' },
  tipCard: {
    backgroundColor: colors.secondaryLight,
    borderRadius: 16, marginHorizontal: 20,
    marginTop: 16, marginBottom: 24, padding: 16,
    borderLeftWidth: 4, borderLeftColor: colors.primary,
  },
  tipTitle: { fontSize: 15, fontWeight: '700', color: colors.primaryDark, marginBottom: 8 },
  tipText: { fontSize: 14, color: colors.textSecondary, lineHeight: 21 },
  // Modal
  modalOverlay: {
    flex: 1, justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 36, maxHeight: '85%',
  },
  modalHandle: {
    width: 40, height: 4, backgroundColor: colors.grayMedium,
    borderRadius: 2, alignSelf: 'center', marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20, fontWeight: '800', color: colors.primary,
    marginBottom: 16,
  },
  modalScroll: { marginBottom: 16 },
  modalItem: {
    flexDirection: 'row', marginBottom: 16,
    backgroundColor: colors.background,
    borderRadius: 14, padding: 14, gap: 12,
  },
  modalItemEmoji: { fontSize: 28, marginTop: 2 },
  modalItemBody: { flex: 1 },
  modalItemTitle: {
    fontSize: 15, fontWeight: '800',
    color: colors.textPrimary, marginBottom: 4,
  },
  modalItemText: {
    fontSize: 13, color: colors.textSecondary, lineHeight: 20,
  },
  closeBtn: {
    backgroundColor: colors.primary, padding: 14,
    borderRadius: 14, alignItems: 'center',
  },
  closeBtnText: { color: colors.white, fontSize: 16, fontWeight: '700' },
});

export default HomeScreen;
