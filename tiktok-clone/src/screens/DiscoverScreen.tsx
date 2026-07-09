import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import { videos } from '../data/videos';
import { formatCount } from '../utils/format';

const TRENDING_TAGS = ['#viral', '#fyp', '#humor', '#cine', '#viajes', '#tech', '#animacion'];

// Pantalla "Descubrir": buscador interactivo + cuadrícula de videos en tendencia.
export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  // Filtra los videos por descripción o usuario según lo que se escribe.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return videos;
    return videos.filter(
      (v) =>
        v.description.toLowerCase().includes(q) ||
        v.username.toLowerCase().includes(q) ||
        v.music.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar videos, usuarios o sonidos"
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={18} color={colors.textMuted} />
          </Pressable>
        )}
      </View>

      <FlatList
        horizontal
        data={TRENDING_TAGS}
        keyExtractor={(t) => t}
        showsHorizontalScrollIndicator={false}
        style={styles.tagsRow}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.tag}
            onPress={() => setQuery(item.replace('#', ''))}
          >
            <Text style={styles.tagText}>{item}</Text>
          </Pressable>
        )}
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 3 }}
        contentContainerStyle={{ gap: 3, paddingHorizontal: 3, paddingBottom: 20 }}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>
            {query ? `Resultados para "${query}"` : 'En tendencia'}
          </Text>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>Sin resultados 🔍</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.avatar }} style={styles.cardImg} />
            <View style={styles.cardOverlay}>
              <Ionicons name="play" size={13} color={colors.white} />
              <Text style={styles.cardViews}>{formatCount(item.likes)}</Text>
            </View>
            <Text style={styles.cardDesc} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: 12,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 42,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    marginLeft: 8,
    fontSize: 15,
  },
  tagsRow: {
    marginTop: 14,
    maxHeight: 40,
  },
  tag: {
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  tagText: {
    color: colors.accent,
    fontWeight: '600',
    fontSize: 13,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    paddingHorizontal: 6,
    paddingVertical: 12,
  },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 6,
    overflow: 'hidden',
  },
  cardImg: {
    width: '100%',
    height: 220,
  },
  cardOverlay: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  cardViews: {
    color: colors.white,
    fontSize: 11,
    marginLeft: 3,
    fontWeight: '600',
  },
  cardDesc: {
    color: colors.text,
    fontSize: 12,
    padding: 8,
  },
  empty: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 40,
  },
});
