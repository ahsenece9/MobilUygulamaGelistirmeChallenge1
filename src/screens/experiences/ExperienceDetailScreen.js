import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { useLikes } from '../../context/LikesContext';

const ExperienceDetailScreen = ({ route }) => {
  const { experience } = route.params;
  const { likes, toggleLike } = useLikes();
  const likeData = likes[experience.id];
  const liked = likeData?.liked ?? false;
  const likeCount = likeData?.count ?? experience.likes;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Author Hero */}
        <View style={styles.hero}>
          <Text style={styles.avatar}>{experience.avatar}</Text>
          <Text style={styles.heroTitle}>{experience.title}</Text>
          <Text style={styles.heroMeta}>
            {experience.name} • {experience.age} yaş • {experience.stage}
          </Text>
          <View style={styles.heroCat}>
            <Text style={styles.heroCatText}>{experience.category}</Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Tags */}
          <View style={styles.tagsRow}>
            {experience.tags.map((tag, i) => (
              <View key={i} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* Story */}
          <View style={styles.storyCard}>
            <Text style={styles.storyQuote}>"</Text>
            <Text style={styles.storyText}>{experience.content}</Text>
            <Text style={styles.storyQuoteEnd}>"</Text>
          </View>

          {/* Date */}
          <Text style={styles.date}>
            📅 {new Date(experience.date).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>

          {/* Like Button */}
          <TouchableOpacity style={styles.likeButton} onPress={() => toggleLike(experience.id)}>
            <Text style={styles.likeIcon}>{liked ? '❤️' : '🤍'}</Text>
            <Text style={[styles.likeText, liked && styles.likeTextActive]}>
              {liked ? 'Beğenildi' : 'Beğen'} ({likeCount})
            </Text>
          </TouchableOpacity>

          {/* Support Card */}
          <View style={styles.supportCard}>
            <Text style={styles.supportTitle}>🤝 Siz de Paylaşın</Text>
            <Text style={styles.supportText}>
              Deneyimlerinizi paylaşarak diğer hastalara umut ve güç verebilirsiniz.
              Her hikaye, yeni bir umut kaynağıdır.
            </Text>
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
  avatar: { fontSize: 72, marginBottom: 10 },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  heroMeta: { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 12 },
  heroCat: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  heroCatText: { color: colors.white, fontSize: 13, fontWeight: '700' },
  content: { padding: 20 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  tag: {
    backgroundColor: colors.secondaryLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  tagText: { fontSize: 12, color: colors.primary, fontWeight: '600' },
  storyCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  storyQuote: {
    fontSize: 60,
    color: colors.secondary,
    fontFamily: 'serif',
    lineHeight: 50,
    marginBottom: 4,
  },
  storyText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 25,
  },
  storyQuoteEnd: {
    fontSize: 60,
    color: colors.secondary,
    fontFamily: 'serif',
    textAlign: 'right',
    lineHeight: 30,
  },
  date: { fontSize: 13, color: colors.textLight, marginBottom: 16 },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    gap: 8,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  likeIcon: { fontSize: 22 },
  likeText: { fontSize: 16, color: colors.textSecondary, fontWeight: '600' },
  likeTextActive: { color: colors.primary },
  supportCard: {
    backgroundColor: colors.secondaryLight,
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  supportTitle: { fontSize: 16, fontWeight: '800', color: colors.primary, marginBottom: 8 },
  supportText: { fontSize: 14, color: colors.textSecondary, lineHeight: 21 },
});

export default ExperienceDetailScreen;
