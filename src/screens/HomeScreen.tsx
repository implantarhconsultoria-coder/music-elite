import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home (mínima)</Text>
      <Text style={styles.subtitle}>Destino técnico após diagnóstico. Fase 2 não implementada.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { color: '#fff', fontSize: 24, fontWeight: '700', marginBottom: 12 },
  subtitle: { color: colors.textSecondary, textAlign: 'center' },
});
