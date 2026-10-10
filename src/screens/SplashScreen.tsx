import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0B0C10', '#1A0A2E']} style={StyleSheet.absoluteFill} />
      <View style={styles.content}>
        <Text style={styles.logo}>MUSIC</Text>
        <Text style={styles.logoAccent}>ELITE</Text>
        <Text style={styles.tagline}>APRENDA. PRATIQUE.{\n}DOMINE. COMPROVE.</Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('InstrumentSelect')} activeOpacity={0.85}>
          <LinearGradient colors={colors.gradient} style={styles.btnGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <Text style={styles.btnText}>COMEÇAR</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.link}>Já tenho uma conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { alignItems: 'center', paddingHorizontal: 32 },
  logo: { fontSize: 56, fontWeight: '800', color: colors.text, letterSpacing: -1 },
  logoAccent: { fontSize: 56, fontWeight: '800', color: colors.accentPurple, marginBottom: 24 },
  tagline: { fontSize: 16, color: colors.textSecondary, textAlign: 'center', letterSpacing: 1.5, lineHeight: 24, marginBottom: 48 },
  btn: { width: width * 0.8, borderRadius: 28, overflow: 'hidden', marginBottom: 20 },
  btnGradient: { paddingVertical: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  link: { color: colors.textSecondary, fontSize: 14 },
});
