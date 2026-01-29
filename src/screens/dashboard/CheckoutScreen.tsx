import React, { useState, useRef, useCallback } from 'react';
import { View, Text, Animated, StyleSheet, Alert, ScrollView } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/cartSlice';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { useTheme } from '../../theme/useTheme';

const CheckoutScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const placeOrder = useCallback(() => {
    const { name, address, city, zip, phone } = formData;
    if (!name || !address || !city || !zip || !phone) {
      Alert.alert(t('checkout.errorTitle'), t('checkout.errorMsg'));
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      dispatch(clearCart());

      Animated.parallel([
        Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
      ]).start();
    }, 1000);
  }, [formData, dispatch, scale, opacity, t]);

  const continueShopping = useCallback(() => {
    navigation.navigate('HomeTabs');
  }, [navigation]);

  if (step === 'form') {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView contentContainerStyle={styles.formContent}>
          <Text style={[styles.title, { color: theme.text, marginBottom: 20 }]}>
            {t('checkout.title')}
          </Text>

          <CustomInput
            placeholder={t('checkout.fullName')}
            value={formData.name}
            onChangeText={text => handleInputChange('name', text)}
          />
          <CustomInput
            placeholder={t('checkout.address')}
            value={formData.address}
            onChangeText={text => handleInputChange('address', text)}
          />
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <CustomInput
                placeholder={t('checkout.city')}
                value={formData.city}
                onChangeText={text => handleInputChange('city', text)}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <CustomInput
                placeholder={t('checkout.zip')}
                value={formData.zip}
                onChangeText={text => handleInputChange('zip', text)}
                keyboardType="numeric"
                maxLength={6}
              />
            </View>
          </View>
          <CustomInput
            placeholder={t('checkout.phone')}
            value={formData.phone}
            onChangeText={text => handleInputChange('phone', text)}
            keyboardType="phone-pad"
            maxLength={15}
          />

          <View style={[styles.summary, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.summaryTitle, { color: theme.text }]}>{t('checkout.paymentMethod')}</Text>
            <Text style={[styles.summaryText, { color: theme.primary }]}>{t('checkout.cod')}</Text>
          </View>

          <CustomButton title={t('checkout.placeOrder')} onPress={placeOrder} loading={loading} />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Animated.View style={{ transform: [{ scale }], opacity }}>
          <Ionicons name="checkmark-circle" size={100} color="green" style={{ marginBottom: 20 }} />
        </Animated.View>

        <Animated.Text style={[styles.title, { opacity, color: theme.text }]}>
          {t('checkout.success')}
        </Animated.Text>

        <Text style={[styles.subtitle, { color: theme.text }]}>
          {t('checkout.successMessage', { name: formData.name })}
        </Text>

        <CustomButton title={t('checkout.backHome')} onPress={continueShopping} style={styles.btn} />
      </View>
    </View>
  );
};

export default React.memo(CheckoutScreen);

const styles = StyleSheet.create({
  container: { flex: 1 },
  formContent: { padding: 20 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, marginBottom: 40, opacity: 0.8 },
  btn: { width: '100%' },
  row: { flexDirection: 'row' },
  summary: { padding: 16, borderWidth: 1, borderRadius: 12, marginVertical: 20 },
  summaryTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  summaryText: { fontSize: 18, fontWeight: 'bold' },
});
