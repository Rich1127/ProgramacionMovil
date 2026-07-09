import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';

type Notif = {
  id: string;
  type: 'like' | 'follow' | 'comment';
  username: string;
  avatar: string;
  text: string;
  time: string;
};

const NOTIFICATIONS: Notif[] = [
  { id: 'n1', type: 'like', username: 'maria_lop', avatar: 'https://i.pravatar.cc/150?img=1', text: 'le dio me gusta a tu video', time: '2h' },
  { id: 'n2', type: 'follow', username: 'juanito99', avatar: 'https://i.pravatar.cc/150?img=3', text: 'empezó a seguirte', time: '5h' },
  { id: 'n3', type: 'comment', username: 'ana.dev', avatar: 'https://i.pravatar.cc/150?img=9', text: 'comentó: ¡Increíble! 🔥', time: '1d' },
  { id: 'n4', type: 'like', username: 'pedro_g', avatar: 'https://i.pravatar.cc/150?img=15', text: 'y 24 personas más les gustó tu comentario', time: '2d' },
  { id: 'n5', type: 'follow', username: 'lucia.m', avatar: 'https://i.pravatar.cc/150?img=25', text: 'empezó a seguirte', time: '3d' },
];

const ICON = {
  like: { name: 'heart' as const, color: colors.primary },
  follow: { name: 'person-add' as const, color: colors.accent },
  comment: { name: 'chatbubble' as const, color: '#9b59b6' },
};

// Pantalla "Bandeja de entrada": lista de notificaciones/actividad.
export default function InboxScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <Text style={styles.title}>Bandeja de entrada</Text>
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.avatarWrap}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={[styles.badge, { backgroundColor: ICON[item.type].color }]}>
                <Ionicons name={ICON[item.type].name} size={11} color={colors.white} />
              </View>
            </View>
            <Text style={styles.text}>
              <Text style={styles.user}>{item.username} </Text>
              {item.text}
              <Text style={styles.time}>  {item.time}</Text>
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatarWrap: { marginRight: 14 },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  badge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  text: { flex: 1, color: colors.text, fontSize: 14, lineHeight: 20 },
  user: { fontWeight: '700' },
  time: { color: colors.textMuted, fontSize: 12 },
});
