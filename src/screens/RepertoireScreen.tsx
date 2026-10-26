import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { SONGS, Song } from '../data/songs';

type Props = NativeStackScreenProps<RootStackParamList, 'Repertoire'>;

export default function RepertoireScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SONGS;
    return SONGS.filter(
      (s) => s.title.toLowerCase().includes(q) || s.composer.toLowerCase().includes(q)
    );
  }, [query]);

  const renderItem = ({ item }: { item: Song }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.88}
      onPress={() => navigation.navigate('SongDetail', { songId: item.id })}
    >
      <View style={styles.cardTop}>
        <View style={styles.levelPill}>
          <Text style={styles.levelText}>{item.difficulty.toUpperCase()}</Text>
        </View>
        <Text style={styles.key}>Tom {item.key}</Text>
      </View>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardComposer}>{item.composer}</Text>
      <Text style={styles.cardChords} numberOfLines={1}>{item.chordsUsed.join(' · ')}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#06111F', '#071627', '#050A14']} style={StyleSheet.absoluteFill} />
      <View style={styles.glow} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>REPERTÓRIO</Text>
        <View style={{ width: 38 }} />
      </View>

      <View style={styles.intro}>
        <Text style={styles.eyebrow}>ACORDES E LETRAS</Text>
        <Text style={styles.question}>Escolha uma música pra tocar</Text>
      </View>

      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar música ou autor"
          placeholderTextColor={colors.textSecondary}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma música encontrada.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingTop: 50 },
  glow: { position: 'absolute', width: 240, height: 240, borderRadius: 120, backgroundColor: 'rgba(124,60,255,0.08)', top: 80, right: -120 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, marginBottom: 18 },
  backBtn: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, backgroundColor: 'rgba(255,255,255,0.03)' },
  back: { color: '#fff', fontSize: 30, lineHeight: 32, marginTop: -2 },
  title: { color: colors.text, fontSize: 12, letterSpacing: 1.15, fontWeight: '800' },
  intro: { paddingHorizontal: 20, marginBottom: 16 },
  eyebrow: { color: colors.accentCyan, fontSize: 10, fontWeight: '900', letterSpacing: 1.4, marginBottom: 6 },
  question: { color: colors.text, fontSize: 22, lineHeight: 28, fontWeight: '800', maxWidth: 420 },
  searchBox: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 16, paddingHorizontal: 14, height: 46, borderRadius: 14, backgroundColor: 'rgba(10,23,40,0.94)', borderWidth: 1, borderColor: colors.border },
  searchIcon: { color: colors.textSecondary, fontSize: 15, marginRight: 8 },
  searchInput: { flex: 1, color: colors.text, fontSize: 13.5 },
  list: { paddingHorizontal: 18, paddingBottom: 60, gap: 12 },
  card: { borderRadius: 18, backgroundColor: 'rgba(10,23,40,0.94)', borderWidth: 1, borderColor: colors.border, padding: 16 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  levelPill: { paddingHorizontal: 9, paddingVertical: 4, borderRadius: 999, backgroundColor: 'rgba(124,60,255,0.14)', borderWidth: 1, borderColor: 'rgba(124,60,255,0.35)' },
  levelText: { color: '#C9B3FF', fontSize: 9, fontWeight: '900', letterSpacing: 0.6 },
  key: { color: colors.textSecondary, fontSize: 11, fontWeight: '800' },
  cardTitle: { color: '#fff', fontSize: 17, fontWeight: '900', marginBottom: 2 },
  cardComposer: { color: colors.accentCyan, fontSize: 11.5, fontWeight: '800', marginBottom: 8 },
  cardChords: { color: colors.textSecondary, fontSize: 11 },
  empty: { color: colors.textSecondary, textAlign: 'center', marginTop: 40, fontSize: 12.5 },
});
