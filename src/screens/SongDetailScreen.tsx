import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { SONGS } from '../data/songs';

type Props = NativeStackScreenProps<RootStackParamList, 'SongDetail'>;

export default function SongDetailScreen({ navigation, route }: Props) {
  const song = SONGS.find((s) => s.id === route.params.songId);

  if (!song) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Música não encontrada.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backLink}>
          <Text style={styles.backLinkText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#06111F', '#071627', '#050A14']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{song.instrument} · Tom {song.key}</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.composer}>{song.composer}</Text>

        <View style={styles.chordsRow}>
          {song.chordsUsed.map((c) => (
            <View key={c} style={styles.chordChip}>
              <Text style={styles.chordChipText}>{c}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sheet}>
          {song.lines.map((line, i) => (
            <View key={i} style={styles.lineBlock}>
              {line.chordLine ? <Text style={styles.chordLine}>{line.chordLine}</Text> : null}
              <Text style={styles.lyricLine}>{line.lyricLine}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, marginBottom: 16 },
  backBtn: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, backgroundColor: 'rgba(255,255,255,0.03)' },
  back: { color: '#fff', fontSize: 30, lineHeight: 32, marginTop: -2 },
  headerTitle: { color: colors.accentCyan, fontSize: 12, letterSpacing: 1.15, fontWeight: '800', maxWidth: 220 },
  scroll: { paddingHorizontal: 18, paddingBottom: 60 },
  title: { color: '#fff', fontSize: 24, fontWeight: '900' },
  composer: { color: colors.textSecondary, fontSize: 12.5, fontWeight: '700', marginTop: 4, marginBottom: 16 },
  chordsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  chordChip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, backgroundColor: 'rgba(63,243,221,0.1)', borderWidth: 1, borderColor: 'rgba(63,243,221,0.3)' },
  chordChipText: { color: colors.accentCyan, fontSize: 13, fontWeight: '900' },
  sheet: { borderRadius: 18, backgroundColor: 'rgba(10,23,40,0.94)', borderWidth: 1, borderColor: colors.border, padding: 18 },
  lineBlock: { marginBottom: 14 },
  chordLine: { color: colors.accentOrange, fontSize: 13, fontWeight: '900', fontFamily: 'monospace' },
  lyricLine: { color: '#EAF2FB', fontSize: 14.5, fontWeight: '600', fontFamily: 'monospace' },
  notFound: { color: colors.textSecondary, textAlign: 'center', marginTop: 100 },
  backLink: { alignSelf: 'center', marginTop: 16 },
  backLinkText: { color: colors.accentCyan, fontWeight: '800' },
});
