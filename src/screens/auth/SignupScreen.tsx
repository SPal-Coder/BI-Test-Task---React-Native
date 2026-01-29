import React, { useState, useCallback } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { isValidEmail, isValidPassword } from '../../utils/validators';
import { useTheme } from '../../theme/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignupScreen = ({ navigation }: any) => {
  const { theme } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleEmailChange = useCallback((text: string) => {
    setEmail(text);
    setErrors(prev => ({ ...prev, email: '' }));
  }, []);

  const handlePasswordChange = useCallback((text: string) => {
    setPassword(text);
    setErrors(prev => ({ ...prev, password: '' }));
  }, []);

  const signup = useCallback(async () => {
    let valid = true;
    const newErrors: any = {};

    if (!isValidEmail(email)) {
      newErrors.email = 'Invalid Email Address';
      valid = false;
    }
    if (!isValidPassword(password)) {
      newErrors.password = 'Password must be 8+ chars with letter, number & special char';
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    setLoading(true);
    setTimeout(async () => {
      await AsyncStorage.setItem('USER', JSON.stringify({ email, password }));
      setLoading(false);
      Alert.alert('Success', 'Account created successfully', [
        { text: 'OK', onPress: () => navigation.replace('Login') }
      ]);
    }, 500);
  }, [email, password, navigation]);

  const navigateToLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Create Account</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>Sign up to get started</Text>

        <CustomInput
          placeholder="Email"
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
          maxLength={50}
        />
        <CustomInput
          placeholder="Password"
          secureTextEntry
          onChangeText={handlePasswordChange}
          error={errors.password}
          maxLength={30}
        />

        <CustomButton title="Sign Up" onPress={signup} loading={loading} />

        <View style={styles.footer}>
          <Text style={{ color: theme.text }}>Already have an account? </Text>
          <TouchableOpacity onPress={navigateToLogin}>
            <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(SignupScreen);

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
});
