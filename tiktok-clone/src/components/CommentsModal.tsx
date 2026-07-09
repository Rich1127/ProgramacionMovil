import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';

type Props = {
  visible: boolean;
  videoId: string | null;
  onClose: () => void;
};

// Hoja inferior de comentarios: lista + campo para publicar (interactivo y persistente).
export default function CommentsModal({ visible, videoId, onClose }: Props) {
  const { getComments, addComment } = useApp();
  const [text, setText] = useState('');

  const comments = videoId ? getComments(videoId) : [];

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || !videoId) return;
    addComment(videoId, trimmed);
    setText('');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.sheet}
      >
        <View style={styles.handle} />
        <View style={styles.header}>
          <Text style={styles.title}>{comments.length} comentarios</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={26} color={colors.text} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 16 }}
          ListEmptyComponent={
            <Text style={styles.empty}>Sé el primero en comentar 💬</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.commentRow}>
              <Image source={{ uri: item.avatar }} style={styles.commentAvatar} />
              <View style={styles.commentBody}>
                <Text style={styles.commentUser}>{item.username}</Text>
                <Text style={styles.commentText}>{item.text}</Text>
              </View>
              <View style={styles.likeCol}>
                <Ionicons name="heart-outline" size={18} color={colors.textMuted} />
                <Text style={styles.likeCount}>{item.likes}</Text>
              </View>
            </View>
          )}
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Añade un comentario..."
            placeholderTextColor={colors.textMuted}
            value={text}
            onChangeText={setText}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <TouchableOpacity onPress={handleSend} disabled={!text.trim()}>
            <Ionicons
              name="send"
              size={24}
              color={text.trim() ? colors.primary : colors.gray}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '65%',
    backgroundColor: colors.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.divider,
    marginTop: 8,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  empty: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 30,
  },
  commentRow: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  commentAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 12,
  },
  commentBody: {
    flex: 1,
  },
  commentUser: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 3,
  },
  commentText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 20,
  },
  likeCol: {
    alignItems: 'center',
    marginLeft: 8,
  },
  likeCount: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#262626',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: colors.text,
    marginRight: 12,
  },
});
