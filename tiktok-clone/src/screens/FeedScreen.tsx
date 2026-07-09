import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ViewToken,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { videos } from '../data/videos';
import VideoItem from '../components/VideoItem';
import CommentsModal from '../components/CommentsModal';
import { colors } from '../theme/colors';

// Pantalla principal: scroll vertical de videos a pantalla completa (feed "Para ti").
export default function FeedScreen() {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = Dimensions.get('window');
  // Alto disponible restando la barra de pestañas inferior.
  const itemHeight = windowHeight - 49 - insets.bottom;

  const [activeIndex, setActiveIndex] = useState(0);
  const [commentsFor, setCommentsFor] = useState<string | null>(null);

  // Detecta qué video está visible para reproducirlo y pausar los demás.
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 80 }).current;

  const renderItem = useCallback(
    ({ item, index }: { item: (typeof videos)[0]; index: number }) => (
      <VideoItem
        post={item}
        height={itemHeight}
        isActive={index === activeIndex}
        onOpenComments={setCommentsFor}
      />
    ),
    [activeIndex, itemHeight]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        windowSize={3}
        maxToRenderPerBatch={2}
        initialNumToRender={1}
      />

      {/* Encabezado superior estilo TikTok */}
      <View style={[styles.header, { top: insets.top + 6 }]}>
        <Text style={styles.headerTab}>Siguiendo</Text>
        <Text style={styles.headerDivider}>|</Text>
        <Text style={[styles.headerTab, styles.headerActive]}>Para ti</Text>
      </View>

      <CommentsModal
        visible={commentsFor !== null}
        videoId={commentsFor}
        onClose={() => setCommentsFor(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTab: {
    color: colors.textMuted,
    fontSize: 17,
    fontWeight: '600',
    marginHorizontal: 10,
  },
  headerActive: {
    color: colors.white,
    fontWeight: '800',
  },
  headerDivider: {
    color: colors.textMuted,
    fontSize: 14,
  },
});
