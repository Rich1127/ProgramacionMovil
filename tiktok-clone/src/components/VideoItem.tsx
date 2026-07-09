import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';

import { VideoPost } from '../data/videos';
import { colors } from '../theme/colors';
import { formatCount } from '../utils/format';
import { useApp } from '../context/AppContext';

type Props = {
  post: VideoPost;
  height: number;
  isActive: boolean;
  onOpenComments: (videoId: string) => void;
};

// Un video a pantalla completa. El video se reproduce solo cuando es el activo
// (el que está visible en el scroll vertical), tal como en TikTok.
export default function VideoItem({ post, height, isActive, onOpenComments }: Props) {
  const { isLiked, toggleLike, isFollowing, toggleFollow, getComments } = useApp();
  const [showHeart, setShowHeart] = useState(false);
  const [paused, setPaused] = useState(false);
  const lastTap = useRef(0);

  const player = useVideoPlayer(post.uri, (p) => {
    p.loop = true;
    p.muted = false;
  });

  // Reproduce solo el video activo; pausa el resto para ahorrar recursos.
  useEffect(() => {
    if (isActive && !paused) {
      player.play();
    } else {
      player.pause();
    }
  }, [isActive, paused, player]);

  const liked = isLiked(post.id);
  const following = isFollowing(post.username);
  const commentCount = post.comments + Math.max(0, getComments(post.id).length - 2);

  // Doble tap para dar like (gesto característico de TikTok).
  const handleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (!liked) toggleLike(post.id);
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 700);
    } else {
      setPaused((prev) => !prev);
    }
    lastTap.current = now;
  };

  return (
    <View style={[styles.container, { height }]}>
      <TouchableWithoutFeedback onPress={handleTap}>
        <View style={StyleSheet.absoluteFill}>
          <VideoView
            player={player}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            nativeControls={false}
          />
          {paused && (
            <View style={styles.pauseOverlay}>
              <Ionicons name="play" size={70} color="rgba(255,255,255,0.7)" />
            </View>
          )}
          {showHeart && (
            <View style={styles.pauseOverlay}>
              <Ionicons name="heart" size={110} color={colors.primary} />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>

      {/* Columna derecha: acciones */}
      <View style={styles.actions}>
        <View style={styles.avatarWrap}>
          <Image source={{ uri: post.avatar }} style={styles.avatar} />
          <Pressable
            style={[styles.followBtn, following && styles.followingBtn]}
            onPress={() => toggleFollow(post.username)}
          >
            <Ionicons
              name={following ? 'checkmark' : 'add'}
              size={14}
              color={colors.white}
            />
          </Pressable>
        </View>

        <Pressable style={styles.actionBtn} onPress={() => toggleLike(post.id)}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={38}
            color={liked ? colors.primary : colors.white}
          />
          <Text style={styles.actionText}>
            {formatCount(post.likes + (liked ? 1 : 0))}
          </Text>
        </Pressable>

        <Pressable style={styles.actionBtn} onPress={() => onOpenComments(post.id)}>
          <Ionicons name="chatbubble-ellipses" size={35} color={colors.white} />
          <Text style={styles.actionText}>{formatCount(commentCount)}</Text>
        </Pressable>

        <Pressable style={styles.actionBtn}>
          <Ionicons name="arrow-redo" size={35} color={colors.white} />
          <Text style={styles.actionText}>{formatCount(post.shares)}</Text>
        </Pressable>

        <View style={styles.disc}>
          <Image source={{ uri: post.avatar }} style={styles.discImg} />
        </View>
      </View>

      {/* Info inferior: usuario, descripción y música */}
      <View style={styles.bottomInfo}>
        <Text style={styles.username}>@{post.username}</Text>
        <Text style={styles.description}>{post.description}</Text>
        <View style={styles.musicRow}>
          <Ionicons name="musical-notes" size={15} color={colors.white} />
          <Text style={styles.music} numberOfLines={1}>
            {post.music}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.background,
    justifyContent: 'flex-end',
  },
  pauseOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    position: 'absolute',
    right: 8,
    bottom: 90,
    alignItems: 'center',
  },
  avatarWrap: {
    marginBottom: 22,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.white,
  },
  followBtn: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: colors.primary,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followingBtn: {
    backgroundColor: colors.accent,
  },
  actionBtn: {
    alignItems: 'center',
    marginBottom: 20,
  },
  actionText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  disc: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  discImg: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  bottomInfo: {
    position: 'absolute',
    left: 12,
    bottom: 95,
    width: '72%',
  },
  username: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 17,
    marginBottom: 6,
  },
  description: {
    color: colors.white,
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 19,
  },
  musicRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  music: {
    color: colors.white,
    fontSize: 13,
    marginLeft: 6,
    flexShrink: 1,
  },
});
