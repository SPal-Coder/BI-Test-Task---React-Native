import React, { useState, useRef, useCallback } from 'react';
import { View, Text, Animated, StyleSheet, Alert, ScrollView } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/cartSlice';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { useTheme } from '../../theme/useTheme';

const CheckoutScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
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
      Alert.alert('Error', 'Please fill in all shipping details');
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
  }, [formData, dispatch, scale, opacity]);

  const continueShopping = useCallback(() => {
    navigation.navigate('HomeTabs');
  }, [navigation]);

  if (step === 'form') {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView contentContainerStyle={styles.formContent}>
          <Text style={[styles.title, { color: theme.text, marginBottom: 20 }]}>
            Shipping Details
          </Text>

          <CustomInput
            placeholder="Full Name"
            value={formData.name}
            onChangeText={t => handleInputChange('name', t)}
          />
          <CustomInput
            placeholder="Address"
            value={formData.address}
            onChangeText={t => handleInputChange('address', t)}
          />
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <CustomInput
                placeholder="City"
                value={formData.city}
                onChangeText={t => handleInputChange('city', t)}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <CustomInput
                placeholder="ZIP Code"
                value={formData.zip}
                onChangeText={t => handleInputChange('zip', t)}
                keyboardType="numeric"
                maxLength={6}
              />
            </View>
          </View>
          <CustomInput
            placeholder="Phone Number"
            value={formData.phone}
            onChangeText={t => handleInputChange('phone', t)}
            keyboardType="phone-pad"
            maxLength={15}
          />

          <View style={[styles.summary, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.summaryTitle, { color: theme.text }]}>Payment Method</Text>
            <Text style={[styles.summaryText, { color: theme.primary }]}>Cash on Delivery</Text>
          </View>

          <CustomButton title="Place Order" onPress={placeOrder} loading={loading} />
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
          Order Placed Successfully!
        </Animated.Text>

        <Text style={[styles.subtitle, { color: theme.text }]}>
          Thank you, {formData.name}!
        </Text>

        <CustomButton title="Continue Shopping" onPress={continueShopping} style={styles.btn} />
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
