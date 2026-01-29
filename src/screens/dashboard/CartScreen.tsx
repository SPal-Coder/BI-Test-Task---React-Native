import React, { useCallback, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, shallowEqual } from 'react-redux';
import { useTheme } from '../../theme/useTheme';
import ProductCard from '../../components/ProductCard';
import CustomButton from '../../components/CustomButton';

const CartScreen = ({ navigation }: any) => {
  const { theme } = useTheme();

  const cart = useSelector(
    (state: any) => state.cart,
    shallowEqual
  );

  const total = useMemo(() => {
    return cart.reduce(
      (sum: number, item: any) => sum + item.price * item.qty,
      0
    );
  }, [cart]);

  const renderItem = useCallback(
    ({ item }: { item: any }) => <ProductCard item={item} />,
    []
  );

  const keyExtractor = useCallback(
    (item: any) => item.id.toString(),
    []
  );

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const checkout = useCallback(() => {
    navigation.navigate('Checkout');
  }, [navigation]);

  if (cart.length === 0) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          styles.emptyContainer,
          { backgroundColor: theme.background },
        ]}
      >
        <Text style={[styles.emptyText, { color: theme.text }]}>
          Your cart is empty
        </Text>

        <CustomButton
          title="Shop Now"
          onPress={goBack}
          style={styles.shopNowBtn}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={cart}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews
        contentContainerStyle={styles.listContent}
      />

      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme.card,
            borderTopColor: theme.border,
          },
        ]}
      >
        <View style={styles.billDetails}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Bill Details
          </Text>

          <View style={styles.billRow}>
            <Text style={{ color: theme.text }}>Item Total</Text>
            <Text style={{ color: theme.text }}>
              ₹ {total.toLocaleString()}
            </Text>
          </View>

          <View style={styles.billRow}>
            <Text style={{ color: theme.text }}>Delivery Fee</Text>
            <Text style={{ color: 'green', fontWeight: 'bold' }}>
              FREE
            </Text>
          </View>

          <View
            style={[styles.separator, { backgroundColor: theme.border }]}
          />

          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: theme.text }]}>
              To Pay
            </Text>
            <Text
              style={[
                styles.totalAmount,
                { color: theme.primary },
              ]}
            >
              ₹ {total.toLocaleString()}
            </Text>
          </View>
        </View>

        <CustomButton title="Checkout" onPress={checkout} />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(CartScreen);

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    opacity: 0.7,
  },
  shopNowBtn: { minWidth: 150 },
  listContent: { paddingBottom: 100 },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  billDetails: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  separator: { height: 1, marginVertical: 8 },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: { fontSize: 18, fontWeight: 'bold' },
  totalAmount: { fontSize: 24, fontWeight: 'bold' },
});
