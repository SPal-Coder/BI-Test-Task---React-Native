import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/useTheme';

export default function SplashScreen({ navigation }: any) {
  const { theme } = useTheme();
  useEffect(() => {
    setTimeout(async () => {
      const user = await AsyncStorage.getItem('USER');
      navigation.replace(user ? 'HomeTabs' : 'Login');
    }, 1200);
  }, []);

  return (
     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.text,{color:theme.text}]}>BI Store</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: {
    fontSize: 28,
    fontWeight: '700',
  },
});
