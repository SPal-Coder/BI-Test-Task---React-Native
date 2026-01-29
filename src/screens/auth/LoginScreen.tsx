import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme/useTheme';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';


const LoginScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const handleEmailChange = useCallback((text: string) => {
    setEmail(text);
    setErrors(prev => ({ ...prev, email: '' }));
  }, []);

  const handlePasswordChange = useCallback((text: string) => {
    setPassword(text);
    setErrors(prev => ({ ...prev, password: '' }));
  }, []);

  const validate = useCallback(() => {
    let valid = true;
    const newErrors: any = {};

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }, [email, password]);

  const login = useCallback(async () => {
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    setTimeout(async () => {
      const user = await AsyncStorage.getItem('USER');
      setLoading(false);

      if (!user) {
        setErrors({ general: 'User not found' });
        return;
      }

      const saved = JSON.parse(user);
      if (saved.email === email && saved.password === password) {
        navigation.replace('HomeTabs');
      } else {
        setErrors({ general: 'Invalid credentials' });
      }
    }, 500);
  }, [email, password, navigation, validate]);

  const navigateToSignup = useCallback(() => {
    navigation.navigate('Signup');
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>{t('auth.welcome')}</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>{t('auth.signInSubtitle')}</Text>

        {errors.general && (
          <Text style={styles.generalError}>{errors.general}</Text>
        )}

        <CustomInput
          placeholder={t('auth.emailPlaceholder')}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
          maxLength={50}
        />
        <CustomInput
          placeholder={t('auth.passwordPlaceholder')}
          secureTextEntry
          onChangeText={handlePasswordChange}
          error={errors.password}
          maxLength={30}
        />

        <CustomButton title={t('auth.loginBtn')} onPress={login} loading={loading} />

        <View style={styles.footer}>
          <Text style={{ color: theme.text }}>{t('auth.noAccount')} </Text>
          <TouchableOpacity onPress={navigateToSignup}>
            <Text style={{ color: theme.primary, fontWeight: 'bold' }}>{t('auth.signupBtn')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    opacity: 0.7,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  generalError: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
