import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { LESSONS } from '../data/lessons';

type Props = NativeStackScreenProps<RootStackParamList, 'LessonDetail'>;

export default function LessonDetailScreen({ navigation, route }: Props) {
  const lesson = LESSONS.find((l) => l.id === route.params.lessonId);

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Aula não encontrada.</Text>
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
        <Text style={styles.headerTitle} numberOfLines={1}>{lesson.instrument}</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.videoBox}>
          {lesson.videoUrl ? (
            <Text style={styles.videoPlaceholderText}>Player de vídeo aqui</Text>
          ) : (
            <>
              <Text style={styles.videoIcon}>▶</Text>
              <Text style={styles.videoPlaceholderText}>Vídeo em breve</Text>
            </>
          )}
        </View>

        <View style={styles.metaRow}>
          <View style={styles.levelPill}>
            <Text style={styles.levelText}>{lesson.level.toUpperCase()}</Text>
          </View>
          <Text style={styles.duration}>◷ {lesson.durationMinutes} min</Text>
        </View>

        <Text style={styles.title}>{lesson.title}</Text>

        <Text style={styles.sectionLabel}>O QUE VOCÊ VAI PRATICAR</Text>
        {lesson.topics.map((topic, i) => (
          <View key={topic} style={styles.topicRow}>
            <View style={styles.topicIndex}><Text style={styles.topicIndexText}>{i + 1}</Text></View>
            <Text style={styles.topicText}>{topic}</Text>
          </View>
        ))}
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
  videoBox: { height: 190, borderRadius: 18, backgroundColor: 'rgba(10,23,40,0.94)', borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  videoIcon: { color: colors.textSecondary, fontSize: 28, marginBottom: 8 },
  videoPlaceholderText: { color: colors.textSecondary, fontSize: 12, fontWeight: '800' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  levelPill: { paddingHorizontal: 9, paddingVertical: 4, borderRadius: 999, backgroundColor: 'rgba(124,60,255,0.14)', borderWidth: 1, borderColor: 'rgba(124,60,255,0.35)' },
  levelText: { color: '#C9B3FF', fontSize: 9, fontWeight: '900', letterSpacing: 0.6 },
  duration: { color: colors.textSecondary, fontSize: 11.5, fontWeight: '800' },
  title: { color: '#fff', fontSize: 24, fontWeight: '900', marginBottom: 20 },
  sectionLabel: { color: '#7F96B1', fontSize: 10, fontWeight: '900', letterSpacing: 1.2, marginBottom: 12 },
  topicRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  topicIndex: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(63,243,221,0.1)', borderWidth: 1, borderColor: 'rgba(63,243,221,0.3)' },
  topicIndexText: { color: colors.accentCyan, fontSize: 12, fontWeight: '900' },
  topicText: { color: '#EAF2FB', fontSize: 13.5, fontWeight: '700', flex: 1 },
  notFound: { color: colors.textSecondary, textAlign: 'center', marginTop: 100 },
  backLink: { alignSelf: 'center', marginTop: 16 },
  backLinkText: { color: colors.accentCyan, fontWeight: '800' },
});
