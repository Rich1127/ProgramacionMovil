import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';

// Pantalla de subida (placeholder de cámara/galería).
export default function UploadScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.preview}>
        <Ionicons name="camera" size={64} color={colors.textMuted} />
        <Text style={styles.previewText}>Vista previa de la cámara</Text>
      </View>
      <View style={styles.controls}>
        <Pressable style={styles.sideBtn}>
          <Ionicons name="images" size={26} color={colors.text} />
          <Text style={styles.sideLabel}>Galería</Text>
        </Pressable>
        <View style={styles.recordOuter}>
          <View style={styles.recordInner} />
        </View>
        <Pressable style={styles.sideBtn}>
          <Ionicons name="camera-reverse" size={26} color={colors.text} />
          <Text style={styles.sideLabel}>Girar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  preview: {
    flex: 1,
    margin: 12,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewText: { color: colors.textMuted, marginTop: 12 },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 40,
    paddingTop: 10,
  },
  sideBtn: { alignItems: 'center' },
  sideLabel: { color: colors.text, fontSize: 12, marginTop: 4 },
  recordOuter: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.primary,
  },
});
