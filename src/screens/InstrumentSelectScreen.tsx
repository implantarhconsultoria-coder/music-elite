import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'InstrumentSelect'>;

const ACOUSTIC = 'https://images.unsplash.com/photo-1588690224648-20426ab6274a?auto=format&fit=crop&w=900&q=82';
const ELECTRIC = 'https://images.unsplash.com/photo-1753427251279-c64f92a3a25b?auto=format&fit=crop&w=900&q=82';
const PIANO = 'https://images.unsplash.com/photo-1708914680421-436c72269733?auto=format&fit=crop&w=900&q=82';
const SINGER = 'https://images.unsplash.com/photo-1774488004513-66bfe1dcb92d?auto=format&fit=crop&w=900&q=82';

const INSTRUMENTS = [
  { id: 'violao', name: 'Violão', image: ACOUSTIC },
  { id: 'guitarra', name: 'Guitarra', image: ELECTRIC },
  { id: 'teclado', name: 'Teclado', image: PIANO },
  { id: 'baixo', name: 'Baixo', image: ELECTRIC },
  { id: 'cavaquinho', name: 'Cavaquinho', image: ACOUSTIC },
  { id: 'canto', name: 'Canto', image: SINGER },
];

const { width } = Dimensions.get('window');
const CARD_SIZE = Math.min((width - 54) / 2, 230);

export default function InstrumentSelectScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const onContinue = () => {
    if (selected) navigation.navigate('ExperienceAssessment', { instrument: selected });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#06111F', '#071627', '#050A14']} style={StyleSheet.absoluteFill} />
      <View style={styles.glow} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={styles.back}>‹</Text></TouchableOpacity>
        <Text style={styles.title}>ESCOLHA DO INSTRUMENTO</Text>
        <Text style={styles.step}>1/5</Text>
      </View>

      <View style={styles.intro}>
        <Text style={styles.eyebrow}>SEU PRIMEIRO CAMINHO</Text>
        <Text style={styles.question}>Qual instrumento você quer dominar primeiro?</Text>
      </View>

      <FlatList
        data={INSTRUMENTS}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const active = selected === item.name;
          return (
            <TouchableOpacity style={[styles.cardWrap, active && styles.cardWrapActive]} onPress={() => setSelected(item.name)} activeOpacity={0.88}>
              <ImageBackground source={{ uri: item.image }} style={styles.card} imageStyle={styles.cardImage}>
                <LinearGradient colors={['rgba(3,8,18,0.06)', 'rgba(3,8,18,0.26)', 'rgba(3,8,18,0.94)']} style={StyleSheet.absoluteFill} />
                {active && <View style={styles.activeRing} />}
                <View style={styles.cardBottom}>
                  <Text style={styles.cardText}>{item.name}</Text>
                  <View style={[styles.statusDot, active && styles.statusDotActive]} />
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.footer}>
        <Text style={styles.note}><Text style={styles.free}>FREE:</Text> escolha 1 instrumento   <Text style={styles.pro}>PRO:</Text> libera todos</Text>
        <TouchableOpacity style={[styles.btn, !selected && styles.btnDisabled]} onPress={onContinue} disabled={!selected} activeOpacity={0.88}>
          <LinearGradient colors={selected ? colors.gradient : ['#263247', '#182132']} style={styles.btnInner}>
            <Text style={styles.btnText}>CONTINUAR</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingTop: 50 },
  glow: { position: 'absolute', width: 240, height: 240, borderRadius: 120, backgroundColor: 'rgba(27,213,255,0.08)', top: 100, right: -120 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, marginBottom: 20 },
  backBtn: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, backgroundColor: 'rgba(255,255,255,0.03)' },
  back: { color: '#fff', fontSize: 30, lineHeight: 32, marginTop: -2 },
  title: { color: colors.text, fontSize: 12, letterSpacing: 1.15, fontWeight: '800' },
  step: { color: colors.textSecondary, fontSize: 12, fontWeight: '700' },
  intro: { paddingHorizontal: 20, marginBottom: 14 },
  eyebrow: { color: colors.accentCyan, fontSize: 10, fontWeight: '900', letterSpacing: 1.4, marginBottom: 6 },
  question: { color: colors.text, fontSize: 24, lineHeight: 30, fontWeight: '800', maxWidth: 420 },
  grid: { paddingHorizontal: 18, paddingBottom: 150 },
  row: { justifyContent: 'space-between' },
  cardWrap: { width: CARD_SIZE, height: 142, borderRadius: 18, marginBottom: 12, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  cardWrapActive: { borderColor: colors.accentBlue, shadowColor: colors.accentBlue, shadowOpacity: 0.42, shadowRadius: 14, shadowOffset: { width: 0, height: 0 }, elevation: 8 },
  card: { flex: 1, justifyContent: 'flex-end' },
  cardImage: { borderRadius: 17 },
  activeRing: { position: 'absolute', inset: 5, borderWidth: 1, borderColor: 'rgba(64,230,255,0.64)', borderRadius: 14 },
  cardBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 13, paddingBottom: 12 },
  cardText: { color: '#fff', fontSize: 15, fontWeight: '800' },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.28)' },
  statusDotActive: { backgroundColor: colors.accentCyan },
  footer: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 24, backgroundColor: 'rgba(4,10,20,0.96)', borderTopWidth: 1, borderTopColor: colors.border },
  note: { textAlign: 'center', color: colors.textSecondary, fontSize: 11, marginBottom: 11 },
  free: { color: colors.accentGold, fontWeight: '900' },
  pro: { color: colors.accentCyan, fontWeight: '900' },
  btn: { borderRadius: 28, overflow: 'hidden' },
  btnDisabled: { opacity: 0.45 },
  btnInner: { paddingVertical: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '900', fontSize: 14, letterSpacing: 0.8 },
});
