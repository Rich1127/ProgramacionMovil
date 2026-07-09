import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import { videos } from '../data/videos';
import { useApp } from '../context/AppContext';
import { formatCount } from '../utils/format';

// Pantalla de perfil del usuario. La pestaña "Me gusta" refleja los videos
// a los que el usuario dio like (estado persistido).
export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { likedIds, followedUsers } = useApp();
  const [tab, setTab] = useState<'videos' | 'liked'>('videos');

  const likedVideos = videos.filter((v) => likedIds.includes(v.id));
  const grid = tab === 'videos' ? videos : likedVideos;

  const totalLikes = videos.reduce((sum, v) => sum + v.likes, 0);

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topBar}>
        <Ionicons name="menu" size={26} color={colors.text} />
      </View>

      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=68' }}
          style={styles.avatar}
        />
        <Text style={styles.handle}>@tu_usuario</Text>

        <View style={styles.statsRow}>
          <Stat value={formatCount(followedUsers.length)} label="Siguiendo" />
          <Stat value="1.2M" label="Seguidores" />
          <Stat value={formatCount(totalLikes)} label="Me gusta" />
        </View>

        <View style={styles.actionRow}>
          <Pressable style={styles.editBtn}>
            <Text style={styles.editText}>Editar perfil</Text>
          </Pressable>
          <Pressable style={styles.iconBtn}>
            <Ionicons name="bookmark-outline" size={20} color={colors.text} />
          </Pressable>
        </View>

        <Text style={styles.bio}>
          📱 Clon de TikTok · React Native + Expo{'\n'}Sígueme para más videos 🎬
        </Text>
      </View>

      <View style={styles.tabs}>
        <Pressable style={styles.tab} onPress={() => setTab('videos')}>
          <Ionicons
            name="grid"
            size={22}
            color={tab === 'videos' ? colors.text : colors.textMuted}
          />
          {tab === 'videos' && <View style={styles.tabIndicator} />}
        </Pressable>
        <Pressable style={styles.tab} onPress={() => setTab('liked')}>
          <Ionicons
            name="heart"
            size={22}
            color={tab === 'liked' ? colors.text : colors.textMuted}
          />
          {tab === 'liked' && <View style={styles.tabIndicator} />}
        </Pressable>
      </View>

      {grid.length === 0 ? (
        <Text style={styles.empty}>
          {tab === 'liked'
            ? 'Aún no has dado me gusta a ningún video ❤️'
            : 'No hay videos'}
        </Text>
      ) : (
        <FlatList
          data={grid}
          keyExtractor={(item) => item.id}
          numColumns={3}
          scrollEnabled={false}
          columnWrapperStyle={{ gap: 2 }}
          contentContainerStyle={{ gap: 2 }}
          renderItem={({ item }) => (
            <View style={styles.gridItem}>
              <Image source={{ uri: item.avatar }} style={styles.gridImg} />
              <View style={styles.gridOverlay}>
                <Ionicons name="play" size={12} color={colors.white} />
                <Text style={styles.gridViews}>{formatCount(item.likes)}</Text>
              </View>
            </View>
          )}
        />
      )}
    </ScrollView>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  topBar: { alignItems: 'flex-end', paddingHorizontal: 16, paddingVertical: 8 },
  header: { alignItems: 'center', paddingHorizontal: 16 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12,
  },
  handle: { color: colors.text, fontSize: 18, fontWeight: '700', marginBottom: 16 },
  statsRow: { flexDirection: 'row', marginBottom: 16 },
  stat: { alignItems: 'center', paddingHorizontal: 22 },
  statValue: { color: colors.text, fontSize: 17, fontWeight: '800' },
  statLabel: { color: colors.textMuted, fontSize: 13, marginTop: 2 },
  actionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  editBtn: {
    backgroundColor: colors.surface,
    paddingHorizontal: 40,
    paddingVertical: 9,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.divider,
  },
  editText: { color: colors.text, fontWeight: '600' },
  iconBtn: {
    backgroundColor: colors.surface,
    padding: 9,
    borderRadius: 6,
    marginLeft: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.divider,
  },
  bio: {
    color: colors.text,
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 18,
  },
  tabs: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    width: 60,
    height: 2,
    backgroundColor: colors.white,
  },
  gridItem: { flex: 1 / 3, height: 160, backgroundColor: colors.surface },
  gridImg: { width: '100%', height: '100%' },
  gridOverlay: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridViews: { color: colors.white, fontSize: 11, marginLeft: 3, fontWeight: '600' },
  empty: { color: colors.textMuted, textAlign: 'center', marginVertical: 40 },
});
