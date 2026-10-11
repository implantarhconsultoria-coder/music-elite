import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const { width } = Dimensions.get('window');
const HERO = 'https://images.unsplash.com/photo-1753427251279-c64f92a3a25b?auto=format&fit=crop&w=1200&q=85';

export default function SplashScreen({ navigation }: Props) {
  return (
    <ImageBackground source={{ uri: HERO }} style={styles.container} resizeMode="cover">
      <LinearGradient
        colors={['rgba(2,7,16,0.18)', 'rgba(4,11,24,0.54)', 'rgba(3,8,18,0.98)']}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.glowBlue} />
      <View style={styles.glowPurple} />

      <View style={styles.topBadge}>
        <View style={styles.dot} />
        <Text style={styles.topBadgeText}>FORMAÇÃO MUSICAL ADAPTATIVA</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.brandRow}>
          <Text style={styles.logo}>MUSIC</Text>
          <Text style={styles.logoAccent}>ELITE</Text>
        </View>
        <Text style={styles.tagline}>APRENDA. PRATIQUE.{`\n`}DOMINE. COMPROVE.</Text>
        <Text style={styles.subline}>Seu nível define o começo. Seu desempenho define o próximo passo.</Text>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('InstrumentSelect')} activeOpacity={0.88}>
          <LinearGradient colors={colors.gradient} style={styles.btnGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <Text style={styles.btnText}>COMEÇAR</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Home')} activeOpacity={0.75}>
          <Text style={styles.link}>Já tenho uma conta</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgDeep },
  glowBlue: { position: 'absolute', width: 220, height: 220, borderRadius: 110, backgroundColor: 'rgba(0,212,255,0.12)', top: 44, right: -70 },
  glowPurple: { position: 'absolute', width: 260, height: 260, borderRadius: 130, backgroundColor: 'rgba(124,60,255,0.16)', bottom: 140, left: -110 },
  topBadge: { position: 'absolute', top: 62, left: 24, flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(3,10,22,0.55)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.accentCyan },
  topBadgeText: { color: '#D9E7F7', fontSize: 10, letterSpacing: 1.3, fontWeight: '700' },
  content: { flex: 1, justifyContent: 'flex-end', paddingHorizontal: 24, paddingBottom: 44 },
  brandRow: { marginBottom: 14 },
  logo: { fontSize: 50, lineHeight: 48, fontWeight: '900', color: '#FFFFFF', letterSpacing: -2 },
  logoAccent: { fontSize: 50, lineHeight: 50, fontWeight: '900', color: colors.accentPurple, letterSpacing: -2 },
  tagline: { fontSize: 15, color: '#D7E5F5', letterSpacing: 1.5, lineHeight: 23, fontWeight: '700', marginBottom: 10 },
  subline: { color: '#9CB0C8', fontSize: 13, lineHeight: 19, width: '88%', marginBottom: 28 },
  btn: { width: Math.min(width - 48, 430), borderRadius: 28, overflow: 'hidden', marginBottom: 18, shadowColor: '#7C3CFF', shadowOpacity: 0.42, shadowRadius: 22, shadowOffset: { width: 0, height: 8 }, elevation: 10 },
  btnGradient: { paddingVertical: 17, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '900', letterSpacing: 0.8 },
  link: { color: '#B8C7DB', fontSize: 13, textAlign: 'center', textDecorationLine: 'underline' },
});
