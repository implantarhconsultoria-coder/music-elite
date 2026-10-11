import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

const HERO = 'https://images.unsplash.com/photo-1588690224648-20426ab6274a?auto=format&fit=crop&w=1200&q=84';

type DiagnosisData = {
  instrument?: string;
  level?: string;
  generalIndex?: number;
  strength?: string;
  weakness?: string;
  scores?: Record<string, number>;
};

const MENU = [
  { icon: '♬', label: 'Afinar' },
  { icon: '▶', label: 'Aulas' },
  { icon: '▤', label: 'Repertório' },
  { icon: '◎', label: 'Treino' },
  { icon: '✦', label: 'Professor' },
];

export default function HomeScreen() {
  const [data, setData] = useState<DiagnosisData>({});
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('diagnosisResult');
        if (raw) setData(JSON.parse(raw));
      } catch {
        setData({});
      }
    })();
  }, []);

  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(null), 1800);
    return () => clearTimeout(id);
  }, [notice]);

  const instrument = data.instrument || 'Violão';
  const level = data.level || 'Intermediário';
  const index = data.generalIndex ?? 72;
  const strength = data.strength || 'Acordes';
  const weakness = data.weakness || 'Ritmo';
  const scoreEntries = useMemo(() => Object.entries(data.scores || {}).sort((a, b) => b[1] - a[1]).slice(0, 4), [data.scores]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#06111F', '#071525', '#040914']} style={StyleSheet.absoluteFill} />
      <View style={styles.glowTop} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}><Text style={styles.avatarText}>R</Text></View>
          <View style={styles.headerCopy}>
            <Text style={styles.greeting}>Boa noite, Rodrigo</Text>
            <Text style={styles.levelText}>{instrument} · {level}</Text>
          </View>
          <View style={styles.streak}><Text style={styles.streakIcon}>🔥</Text><Text style={styles.streakText}>12 dias</Text></View>
        </View>

        <Text style={styles.sectionEyebrow}>TREINO DE HOJE</Text>
        <TouchableOpacity activeOpacity={0.9} onPress={() => setNotice('Treino guiado entra na próxima etapa funcional.')}>
          <ImageBackground source={{ uri: HERO }} style={styles.hero} imageStyle={styles.heroImage}>
            <LinearGradient colors={['rgba(3,9,19,0.12)', 'rgba(3,9,19,0.45)', 'rgba(3,9,19,0.94)']} style={StyleSheet.absoluteFill} />
            <View style={styles.heroContent}>
              <View style={styles.livePill}><Text style={styles.liveDot}>●</Text><Text style={styles.liveText}>PLANO ADAPTATIVO</Text></View>
              <Text style={styles.heroTitle}>Troca de {strength.toLowerCase()} + {weakness.toLowerCase()}</Text>
              <Text style={styles.heroMeta}>◷ 8 minutos · recomendado para seu diagnóstico</Text>
              <LinearGradient colors={colors.gradient} style={styles.heroButton}>
                <Text style={styles.heroButtonText}>COMEÇAR AGORA</Text>
              </LinearGradient>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <View style={styles.menuRow}>
          {MENU.map((item) => (
            <TouchableOpacity key={item.label} style={styles.menuItem} onPress={() => setNotice(`${item.label}: módulo preparado para a próxima fase.`)} activeOpacity={0.8}>
              <View style={styles.menuIconBox}><Text style={styles.menuIcon}>{item.icon}</Text></View>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sua evolução</Text>
          <Text style={styles.sectionLink}>diagnóstico atual</Text>
        </View>

        <View style={styles.evolutionGrid}>
          <View style={styles.indexCard}>
            <View style={styles.ringOuter}>
              <LinearGradient colors={colors.gradientCool} style={styles.ringGradient}>
                <View style={styles.ringInner}>
                  <Text style={styles.indexValue}>{index}%</Text>
                  <Text style={styles.indexCaption}>do nível atual</Text>
                </View>
              </LinearGradient>
            </View>
          </View>

          <View style={styles.nextCard}>
            <Text style={styles.nextNumber}>3</Text>
            <Text style={styles.nextTitle}>competências próximas da certificação</Text>
            <View style={styles.miniBars}>
              {[32, 50, 64, 78, 91, 70, 55].map((h, i) => <View key={i} style={[styles.miniBar, { height: h / 2 }]} />)}
            </View>
          </View>
        </View>

        <View style={styles.competencyCard}>
          <View style={styles.competencyHeader}>
            <View>
              <Text style={styles.cardEyebrow}>MAPA ATUAL</Text>
              <Text style={styles.cardTitle}>Competências</Text>
            </View>
            <View style={styles.badge}><Text style={styles.badgeText}>REAL</Text></View>
          </View>

          {(scoreEntries.length ? scoreEntries : [[strength, 91], [weakness, 68], ['Percepção', 76], ['Teoria', 72]] as [string, number][]).map(([name, value]) => (
            <View key={name} style={styles.scoreRow}>
              <Text style={styles.scoreName}>{name}</Text>
              <View style={styles.scoreTrack}>
                <LinearGradient colors={value >= 80 ? [colors.accentCyan, colors.success] : [colors.accentBlue, colors.accentPurple]} style={[styles.scoreFill, { width: `${Math.min(100, Math.max(8, value))}%` }]} />
              </View>
              <Text style={styles.scoreValue}>{Math.round(value)}%</Text>
            </View>
          ))}
        </View>

        <View style={styles.insightCard}>
          <View style={styles.aiOrb}><Text style={styles.aiOrbText}>✦</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.insightTitle}>Seu próximo ganho rápido</Text>
            <Text style={styles.insightText}>Você está mais forte em {strength}. O maior avanço agora vem de {weakness}. A trilha vai priorizar isso sem repetir o que você já domina.</Text>
          </View>
        </View>
      </ScrollView>

      {notice && <View style={styles.notice}><Text style={styles.noticeText}>{notice}</Text></View>}

      <View style={styles.bottomNav}>
        {[['⌂', 'Início'], ['◇', 'Formação'], ['◎', 'Treinar'], ['♫', 'Repertório'], ['●', 'Perfil']].map(([icon, label], indexNav) => (
          <TouchableOpacity key={label} style={styles.navItem} onPress={() => indexNav !== 0 && setNotice(`${label}: entra na próxima fase funcional.`)}>
            <Text style={[styles.navIcon, indexNav === 0 && styles.navActive]}>{icon}</Text>
            <Text style={[styles.navLabel, indexNav === 0 && styles.navActive]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  glowTop: { position: 'absolute', width: 280, height: 280, borderRadius: 140, backgroundColor: 'rgba(22,217,255,0.06)', top: -110, right: -120 },
  scroll: { paddingTop: 54, paddingHorizontal: 16, paddingBottom: 112, width: '100%', maxWidth: 620, alignSelf: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: '#12304A', borderWidth: 1, borderColor: colors.borderStrong },
  avatarText: { color: '#fff', fontSize: 17, fontWeight: '900' },
  headerCopy: { flex: 1, paddingHorizontal: 10 },
  greeting: { color: '#fff', fontSize: 16, fontWeight: '900' },
  levelText: { color: colors.accentCyan, fontSize: 11.5, fontWeight: '800', marginTop: 3 },
  streak: { height: 34, paddingHorizontal: 10, borderRadius: 17, backgroundColor: 'rgba(255,122,61,0.1)', borderWidth: 1, borderColor: 'rgba(255,122,61,0.22)', flexDirection: 'row', alignItems: 'center', gap: 5 },
  streakIcon: { fontSize: 14 },
  streakText: { color: '#FFB28D', fontSize: 11, fontWeight: '900' },
  sectionEyebrow: { color: '#7F96B1', fontSize: 10, fontWeight: '900', letterSpacing: 1.4, marginBottom: 9 },
  hero: { height: 210, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  heroImage: { borderRadius: 20 },
  heroContent: { flex: 1, justifyContent: 'flex-end', padding: 16 },
  livePill: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 9, paddingVertical: 5, borderRadius: 99, backgroundColor: 'rgba(5,18,30,0.78)', borderWidth: 1, borderColor: 'rgba(63,243,221,0.28)', marginBottom: 8 },
  liveDot: { color: colors.accentCyan, fontSize: 9 },
  liveText: { color: '#D8FCF7', fontSize: 9, fontWeight: '900', letterSpacing: 0.8 },
  heroTitle: { color: '#fff', fontSize: 24, lineHeight: 28, fontWeight: '900', maxWidth: 400 },
  heroMeta: { color: '#C0CDDC', fontSize: 11.5, marginTop: 6, marginBottom: 12 },
  heroButton: { alignSelf: 'flex-start', minWidth: 176, borderRadius: 22, paddingHorizontal: 19, paddingVertical: 12, alignItems: 'center' },
  heroButtonText: { color: '#fff', fontSize: 11, fontWeight: '900', letterSpacing: 0.7 },
  menuRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 },
  menuItem: { alignItems: 'center', flex: 1 },
  menuIconBox: { width: 46, height: 46, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(12,27,47,0.95)', borderWidth: 1, borderColor: colors.border },
  menuIcon: { color: colors.accentCyan, fontSize: 18, fontWeight: '900' },
  menuLabel: { color: '#D8E3F0', fontSize: 9.5, fontWeight: '800', marginTop: 6 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: '900' },
  sectionLink: { color: '#6F89A8', fontSize: 10, fontWeight: '800' },
  evolutionGrid: { flexDirection: 'row', gap: 10 },
  indexCard: { flex: 1, minHeight: 160, borderRadius: 18, backgroundColor: 'rgba(10,23,40,0.94)', borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  ringOuter: { width: 116, height: 116, alignItems: 'center', justifyContent: 'center' },
  ringGradient: { width: 112, height: 112, borderRadius: 56, alignItems: 'center', justifyContent: 'center' },
  ringInner: { width: 101, height: 101, borderRadius: 51, backgroundColor: '#071321', alignItems: 'center', justifyContent: 'center' },
  indexValue: { color: '#fff', fontSize: 30, fontWeight: '900' },
  indexCaption: { color: '#8096B0', fontSize: 9.5, marginTop: 2 },
  nextCard: { flex: 1.25, minHeight: 160, borderRadius: 18, backgroundColor: 'rgba(10,23,40,0.94)', borderWidth: 1, borderColor: colors.border, padding: 15 },
  nextNumber: { color: colors.accentCyan, fontSize: 26, fontWeight: '900' },
  nextTitle: { color: '#EAF4FE', fontSize: 12, lineHeight: 17, fontWeight: '800', maxWidth: 170 },
  miniBars: { flexDirection: 'row', alignItems: 'flex-end', height: 50, gap: 5, marginTop: 10 },
  miniBar: { width: 8, borderRadius: 4, backgroundColor: colors.accentBlue },
  competencyCard: { marginTop: 12, borderRadius: 18, backgroundColor: 'rgba(10,23,40,0.94)', borderWidth: 1, borderColor: colors.border, padding: 16 },
  competencyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  cardEyebrow: { color: '#7087A2', fontSize: 9, fontWeight: '900', letterSpacing: 1.1 },
  cardTitle: { color: '#fff', fontSize: 17, fontWeight: '900', marginTop: 3 },
  badge: { paddingHorizontal: 8, paddingVertical: 5, borderRadius: 999, backgroundColor: 'rgba(63,243,221,0.1)', borderWidth: 1, borderColor: 'rgba(63,243,221,0.25)' },
  badgeText: { color: colors.accentCyan, fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 11 },
  scoreName: { color: '#EAF2FB', width: 90, fontSize: 11.5, fontWeight: '800' },
  scoreTrack: { flex: 1, height: 7, borderRadius: 99, backgroundColor: '#13243B', overflow: 'hidden', marginHorizontal: 8 },
  scoreFill: { height: 7, borderRadius: 99 },
  scoreValue: { color: '#AFC1D7', width: 34, textAlign: 'right', fontSize: 10.5, fontWeight: '900' },
  insightCard: { marginTop: 12, flexDirection: 'row', gap: 12, borderRadius: 18, padding: 15, backgroundColor: 'rgba(13,25,44,0.94)', borderWidth: 1, borderColor: 'rgba(124,60,255,0.28)' },
  aiOrb: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(124,60,255,0.14)', borderWidth: 1, borderColor: 'rgba(124,60,255,0.35)' },
  aiOrbText: { color: '#B693FF', fontSize: 20 },
  insightTitle: { color: '#fff', fontSize: 13.5, fontWeight: '900', marginBottom: 4 },
  insightText: { color: colors.textSecondary, fontSize: 11.5, lineHeight: 17 },
  notice: { position: 'absolute', left: 20, right: 20, bottom: 92, paddingHorizontal: 14, paddingVertical: 12, borderRadius: 14, backgroundColor: '#102139', borderWidth: 1, borderColor: colors.borderStrong, shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 14, elevation: 10 },
  noticeText: { color: '#DDEBFA', textAlign: 'center', fontSize: 11.5, fontWeight: '800' },
  bottomNav: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 76, paddingBottom: 12, backgroundColor: 'rgba(4,10,20,0.98)', borderTopWidth: 1, borderTopColor: colors.border, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  navItem: { alignItems: 'center', flex: 1 },
  navIcon: { color: '#637B98', fontSize: 18, fontWeight: '900' },
  navLabel: { color: '#637B98', fontSize: 9.5, marginTop: 4, fontWeight: '800' },
  navActive: { color: colors.accentCyan },
});
