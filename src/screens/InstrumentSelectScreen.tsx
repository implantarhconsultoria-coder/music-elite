import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'InstrumentSelect'>;

const INSTRUMENTS = [
  { id: 'violao', name: 'Violão', emoji: '🎸' },
  { id: 'guitarra', name: 'Guitarra', emoji: '🎸' },
  { id: 'teclado', name: 'Teclado', emoji: '🎹' },
  { id: 'cavaquinho', name: 'Cavaquinho', emoji: '🪕' },
  { id: 'baixo', name: 'Baixo', emoji: '🎸' },
  { id: 'canto', name: 'Canto', emoji: '🎤' },
];

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 48) / 2;

export default function InstrumentSelectScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const onContinue = () => {
    if (selected) {
      navigation.navigate('ExperienceAssessment', { instrument: selected });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>←</Text></TouchableOpacity>
        <Text style={styles.title}>ESCOLHA DO INSTRUMENTO</Text>
        <Text style={styles.step}>1/5</Text>
      </View>
      <Text style={styles.question}>Qual instrumento você quer dominar primeiro?</Text>
      <FlatList
        data={INSTRUMENTS}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, selected === item.name && styles.cardSelected]}
            onPress={() => setSelected(item.name)}
            activeOpacity={0.8}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.note}>FREE: escolha 1 instrumento{\n}PRO libera todos os instrumentos</Text>
      <TouchableOpacity style={[styles.btn, !selected && styles.btnDisabled]} onPress={onContinue} disabled={!selected}>
        <LinearGradient colors={selected ? colors.gradient : ['#333', '#222']} style={styles.btnInner}>
          <Text style={styles.btnText}>CONTINUAR</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  back: { color: colors.text, fontSize: 28 },
  title: { color: colors.text, fontSize: 13, letterSpacing: 1, fontWeight: '600' },
  step: { color: colors.textSecondary, fontSize: 13 },
  question: { color: colors.text, fontSize: 22, fontWeight: '600', paddingHorizontal: 20, marginBottom: 16 },
  grid: { paddingHorizontal: 16 },
  card: { width: CARD_SIZE, height: 120, backgroundColor: colors.bgCard, borderRadius: 16, margin: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  cardSelected: { borderColor: colors.accentPurple, backgroundColor: 'rgba(107,70,255,0.15)' },
  emoji: { fontSize: 36, marginBottom: 8 },
  cardText: { color: colors.text, fontSize: 14, fontWeight: '500' },
  note: { textAlign: 'center', color: colors.textSecondary, fontSize: 12, marginVertical: 12 },
  btn: { marginHorizontal: 20, marginBottom: 30, borderRadius: 28, overflow: 'hidden' },
  btnDisabled: { opacity: 0.5 },
  btnInner: { paddingVertical: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
