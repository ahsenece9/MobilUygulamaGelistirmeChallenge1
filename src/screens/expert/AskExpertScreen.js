import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { experts } from '../../data/mockData';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AskExpertScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setData(experts);
      setLoading(false);
    }, 800);
    return () => clearTimeout(t);
  }, []);

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
            navigation.navigate('Chat', { expert: item });
          }}
        >
          <Text style={styles.askButtonText}>
            {item.available ? '💬 Sohbet Başlat' : 'Müsait Değil'}
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
            <Text style={styles.infoIcon}>💬</Text>
            <Text style={styles.infoText}>
              Alanında uzman doktorlarımızla anlık sohbet edebilirsiniz. Yeşil nokta müsaitliği gösterir.
            </Text>
          </View>
        }
      />
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
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  askButtonDisabled: { backgroundColor: colors.grayMedium },
  askButtonText: { color: colors.white, fontSize: 13, fontWeight: '700' },
});

export default AskExpertScreen;
