import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { patientExperiences } from '../../data/mockData';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { useLikes } from '../../context/LikesContext';

const categoryFilters = ['Tümü', 'İyileşme Hikayesi', 'Erken Teşhis', 'Psikolojik Destek'];

const PatientExperiencesScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Tümü');
  const { likes, toggleLike } = useLikes();

  useEffect(() => {
    const t = setTimeout(() => {
      setData(patientExperiences);
      setLoading(false);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  const filtered =
    activeFilter === 'Tümü'
      ? data
      : data.filter((item) => item.category === activeFilter);

  if (loading) return <LoadingSpinner message="Deneyimler yükleniyor..." />;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ExperienceDetail', { experience: item })}
      activeOpacity={0.85}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.avatar}>{item.avatar}</Text>
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{item.name}</Text>
          <Text style={styles.authorMeta}>
            {item.age} yaş • {item.stage}
          </Text>
        </View>
        <View style={styles.categoryTag}>
          <Text style={styles.categoryTagText}>{item.category}</Text>
        </View>
      </View>

      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardSummary} numberOfLines={2}>
        {item.summary}
      </Text>

      <View style={styles.cardFooter}>
        <View style={styles.tagsRow}>
          {item.tags.slice(0, 2).map((tag, i) => (
            <View key={i} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
          {item.tags.length > 2 && (
            <Text style={styles.moreTag}>+{item.tags.length - 2}</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.likesRow}
          onPress={() => toggleLike(item.id)}
        >
          <Text style={styles.likeIcon}>{likes[item.id]?.liked ? '❤️' : '🤍'}</Text>
          <Text style={[styles.likesCount, likes[item.id]?.liked && styles.likesCountActive]}>
            {likes[item.id]?.count ?? item.likes}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      {/* Filter */}
      <FlatList
        horizontal
        data={categoryFilters}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={styles.filterList}
        contentContainerStyle={styles.filterContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.filterChip, activeFilter === item && styles.filterChipActive]}
            onPress={() => setActiveFilter(item)}
          >
            <Text
              style={[
                styles.filterChipText,
                activeFilter === item && styles.filterChipTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="💬"
            title="Henüz deneyim yok"
            message="Bu kategoride henüz paylaşılmış deneyim bulunmuyor."
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  filterList: { maxHeight: 56 },
  filterContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginRight: 8,
  },
  filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterChipText: { fontSize: 13, color: colors.textSecondary, fontWeight: '500' },
  filterChipTextActive: { color: colors.white, fontWeight: '700' },
  list: { padding: 16, gap: 14 },
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: { fontSize: 40, marginRight: 12 },
  authorInfo: { flex: 1 },
  authorName: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  authorMeta: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  categoryTag: {
    backgroundColor: colors.secondaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryTagText: { fontSize: 11, color: colors.primary, fontWeight: '600' },
  cardTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary, marginBottom: 6 },
  cardSummary: { fontSize: 13, color: colors.textSecondary, lineHeight: 19, marginBottom: 12 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tagsRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', flex: 1 },
  tag: {
    backgroundColor: colors.grayLight,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  tagText: { fontSize: 11, color: colors.textSecondary },
  moreTag: { fontSize: 11, color: colors.textLight, alignSelf: 'center' },
  likesRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginLeft: 8 },
  likeIcon: { fontSize: 14 },
  likesCount: { fontSize: 13, fontWeight: '700', color: colors.textSecondary },
  likesCountActive: { color: colors.primary },
});

export default PatientExperiencesScreen;
