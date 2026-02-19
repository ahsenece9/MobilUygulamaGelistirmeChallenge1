import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { experts } from '../../data/mockData';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AskExpertScreen = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [question, setQuestion] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setData(experts);
      setLoading(false);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const handleAsk = () => {
    if (!question.trim()) {
      Alert.alert('Uyarı', 'Lütfen sorunuzu yazın.');
      return;
    }
    setSent(true);
    setQuestion('');
    setTimeout(() => {
      setModalVisible(false);
      setSent(false);
      Alert.alert(
        'Sorunuz İletildi!',
        `${selectedExpert?.name} sorunuzu aldı. En kısa sürede size geri dönecektir.`
      );
    }, 1500);
  };

  if (loading) return <LoadingSpinner message="Uzmanlar yükleniyor..." />;

  const renderExpert = ({ item }) => (
    <View style={[styles.card, !item.available && styles.cardUnavailable]}>
      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>{item.avatar}</Text>
          <View style={[styles.dot, { backgroundColor: item.available ? colors.success : colors.grayMedium }]} />
        </View>
        <View style={styles.expertInfo}>
          <Text style={styles.expertName}>{item.name}</Text>
          <Text style={styles.expertSpecialty}>{item.specialty}</Text>
          <Text style={styles.expertHospital}>{item.hospital}</Text>
        </View>
      </View>
      <Text style={styles.expertBio}>{item.bio}</Text>
      <View style={styles.cardFooter}>
        <View style={styles.ratingRow}>
          <Text style={styles.star}>⭐</Text>
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.experience}>• {item.experience} deneyim</Text>
        </View>
        <TouchableOpacity
          style={[styles.askButton, !item.available && styles.askButtonDisabled]}
          onPress={() => {
            if (!item.available) {
              Alert.alert('Müsait Değil', 'Bu uzman şu anda müsait değil. Lütfen daha sonra tekrar deneyin.');
              return;
            }
            setSelectedExpert(item);
            setModalVisible(true);
          }}
        >
          <Text style={styles.askButtonText}>
            {item.available ? 'Soru Sor' : 'Müsait Değil'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderExpert}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💡</Text>
            <Text style={styles.infoText}>
              Alanında uzman doktorlarımıza sorularınızı iletebilirsiniz. Yeşil nokta müsaitliği gösterir.
            </Text>
          </View>
        }
      />

      {/* Question Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>
              {selectedExpert?.name}'e Soru Sor
            </Text>
            <Text style={styles.modalSubtitle}>{selectedExpert?.specialty}</Text>

            <TextInput
              style={styles.questionInput}
              multiline
              numberOfLines={5}
              placeholder="Sorunuzu buraya yazın..."
              placeholderTextColor={colors.grayMedium}
              value={question}
              onChangeText={setQuestion}
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={[styles.sendButton, sent && styles.sendButtonSent]}
              onPress={handleAsk}
              disabled={sent}
            >
              <Text style={styles.sendButtonText}>
                {sent ? '✓ Gönderildi!' : '📤 Gönder'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setModalVisible(false);
                setQuestion('');
              }}
            >
              <Text style={styles.cancelButtonText}>İptal</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  list: { padding: 16, gap: 14 },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.secondaryLight,
    borderRadius: 14,
    padding: 14,
    marginBottom: 6,
    alignItems: 'flex-start',
  },
  infoIcon: { fontSize: 22, marginRight: 10, marginTop: 2 },
  infoText: { flex: 1, fontSize: 13, color: colors.primaryDark, lineHeight: 20 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardUnavailable: { opacity: 0.7 },
  cardHeader: { flexDirection: 'row', marginBottom: 10 },
  avatarContainer: { position: 'relative', marginRight: 14 },
  avatar: { fontSize: 48 },
  dot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.white,
  },
  expertInfo: { flex: 1 },
  expertName: { fontSize: 16, fontWeight: '800', color: colors.textPrimary },
  expertSpecialty: { fontSize: 13, color: colors.primary, fontWeight: '600', marginTop: 2 },
  expertHospital: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  expertBio: { fontSize: 13, color: colors.textSecondary, marginBottom: 12, fontStyle: 'italic' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  star: { fontSize: 14 },
  rating: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  experience: { fontSize: 12, color: colors.textSecondary },
  askButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  askButtonDisabled: { backgroundColor: colors.grayMedium },
  askButtonText: { color: colors.white, fontSize: 13, fontWeight: '700' },
  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 36,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.grayMedium,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalTitle: { fontSize: 20, fontWeight: '800', color: colors.primary, marginBottom: 4 },
  modalSubtitle: { fontSize: 14, color: colors.textSecondary, marginBottom: 16 },
  questionInput: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: colors.textPrimary,
    minHeight: 120,
    marginBottom: 16,
    backgroundColor: colors.background,
  },
  sendButton: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  sendButtonSent: { backgroundColor: colors.success },
  sendButtonText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  cancelButton: { padding: 12, alignItems: 'center' },
  cancelButtonText: { color: colors.textSecondary, fontSize: 15 },
});

export default AskExpertScreen;
