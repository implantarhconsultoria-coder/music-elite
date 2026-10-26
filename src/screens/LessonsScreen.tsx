import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { LESSONS, Lesson } from '../data/lessons';

type Props = NativeStackScreenProps<RootStackParamList, 'Lessons'>;

const INSTRUMENT_FILTERS = ['Todos', 'Violão', 'Guitarra', 'Teclado', 'Canto'];

export default function LessonsScreen({ navigation }: Props) {
  const [filter, setFilter] = useState('Todos');

  const data = useMemo(
    () => (filter === 'Todos' ? LESSONS : LESSONS.filter((l) => l.instrument === filter)),
    [filter]
  );

  const renderItem = ({ item }: { item: Lesson }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.88}
      onPress={() => navigation.navigate('LessonDetail', { lessonId: item.id })}
    >
      <View style={styles.cardTop}>
        <View style={styles.levelPill}>
          <Text style={styles.levelText}>{item.level.toUpperCase()}</Text>
        </View>
        <Text style={styles.duration}>{item.durationMinutes} min</Text>
      </View>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardInstrument}>{item.instrument}</Text>
      <Text style={styles.cardTopics} numberOfLines={1}>
        {item.topics.join(' · ')}
      </Text>
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
        <Text style={styles.title}>AULAS</Text>
        <View style={{ width: 38 }} />
      </View>

      <View style={styles.intro}>
        <Text style={styles.eyebrow}>CONTEÚDO EM VÍDEO</Text>
        <Text style={styles.question}>Escolha uma aula pra praticar</Text>
      </View>

      <FlatList
        horizontal
        data={INSTRUMENT_FILTERS}
        keyExtractor={(i) => i}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
        renderItem={({ item }) => {
          const active = filter === item;
          return (
            <TouchableOpacity
              style={[styles.filterChip, active && styles.filterChipActive]}
              onPress={() => setFilter(item)}
              activeOpacity={0.85}
            >
              <Text style={[styles.filterText, active && styles.filterTextActive]}>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma aula ainda para esse instrumento.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingTop: 50 },
  glow: { position: 'absolute', width: 240, height: 240, borderRadius: 120, backgroundColor: 'rgba(27,213,255,0.08)', top: 80, right: -120 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, marginBottom: 18 },
  backBtn: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, backgroundColor: 'rgba(255,255,255,0.03)' },
  back: { color: '#fff', fontSize: 30, lineHeight: 32, marginTop: -2 },
  title: { color: colors.text, fontSize: 12, letterSpacing: 1.15, fontWeight: '800' },
  intro: { paddingHorizontal: 20, marginBottom: 16 },
  eyebrow: { color: colors.accentCyan, fontSize: 10, fontWeight: '900', letterSpacing: 1.4, marginBottom: 6 },
  question: { color: colors.text, fontSize: 22, lineHeight: 28, fontWeight: '800', maxWidth: 420 },
  filterRow: { paddingHorizontal: 20, gap: 8, marginBottom: 14 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 999, borderWidth: 1, borderColor: colors.border, backgroundColor: 'rgba(255,255,255,0.03)' },
  filterChipActive: { borderColor: colors.accentCyan, backgroundColor: 'rgba(63,243,221,0.12)' },
  filterText: { color: colors.textSecondary, fontSize: 11.5, fontWeight: '800' },
  filterTextActive: { color: colors.accentCyan },
  list: { paddingHorizontal: 18, paddingBottom: 60, gap: 12 },
  card: { borderRadius: 18, backgroundColor: 'rgba(10,23,40,0.94)', borderWidth: 1, borderColor: colors.border, padding: 16 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  levelPill: { paddingHorizontal: 9, paddingVertical: 4, borderRadius: 999, backgroundColor: 'rgba(124,60,255,0.14)', borderWidth: 1, borderColor: 'rgba(124,60,255,0.35)' },
  levelText: { color: '#C9B3FF', fontSize: 9, fontWeight: '900', letterSpacing: 0.6 },
  duration: { color: colors.textSecondary, fontSize: 11, fontWeight: '800' },
  cardTitle: { color: '#fff', fontSize: 17, fontWeight: '900', marginBottom: 2 },
  cardInstrument: { color: colors.accentCyan, fontSize: 11.5, fontWeight: '800', marginBottom: 8 },
  cardTopics: { color: colors.textSecondary, fontSize: 11 },
  empty: { color: colors.textSecondary, textAlign: 'center', marginTop: 40, fontSize: 12.5 },
});
