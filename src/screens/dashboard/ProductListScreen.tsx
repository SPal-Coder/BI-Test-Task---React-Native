import React, { useEffect, useCallback } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProductCard from '../../components/ProductCard';
import { useTheme } from '../../theme/useTheme';
import { fetchProducts } from '../../redux/productSlice';

const ProductListScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const { items: products, status, hasMore } = useSelector((state: any) => state.products);

  const loading = status === 'loading';

  // Initial load
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts({ refresh: true }) as any);
    }
  }, [status, dispatch]);

  const onRefresh = useCallback(() => {
    dispatch(fetchProducts({ refresh: true }) as any);
  }, [dispatch]);

  const loadMore = useCallback(() => {
    if (!hasMore || loading) return;
    dispatch(fetchProducts({}) as any);
  }, [hasMore, loading, dispatch]);

  const renderItem = useCallback(
    ({ item }: { item: any }) => <ProductCard item={item} />,
    []
  );

  const keyExtractor = useCallback(
    (item: any) => item.id.toString(),
    []
  );

  if (status === 'loading' && products.length === 0) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: theme.card, borderBottomColor: theme.border },
        ]}
      >
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Products
        </Text>

        <TouchableOpacity
          style={[styles.cartBtn, { backgroundColor: theme.primary }]}
          onPress={() => (navigation as any).navigate('Cart')}
        >
          <Ionicons name="cart-outline" size={22} color="#FFF" />
          <Text style={styles.cartBtnText}>Cart</Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        refreshControl={
          <RefreshControl
            refreshing={status === 'loading' && products.length > 0}
            onRefresh={onRefresh}
            tintColor={theme.primary}
          />
        }
        contentContainerStyle={styles.listContent}
        ListFooterComponent={
          hasMore ? (
            <ActivityIndicator style={styles.loader} color={theme.primary} />
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default React.memo(ProductListScreen);

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  listContent: {
    paddingBottom: 20,
  },

  loader: {
    marginVertical: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  cartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  cartBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
  },
});
