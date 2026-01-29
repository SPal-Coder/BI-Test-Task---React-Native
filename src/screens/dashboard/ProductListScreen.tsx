import React, { useState, useEffect, useCallback, useRef } from 'react';
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

import ProductCard from '../../components/ProductCard';
import { useTheme } from '../../theme/useTheme';
import { getProducts } from '../../api/products';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductListScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const endReachedLock = useRef(false);

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const fetchProducts = useCallback(
    (pageNum: number, refresh = false) => {
      if (loading || refreshing) return;

      refresh ? setRefreshing(true) : setLoading(true);

      setTimeout(() => {
        const nextData = getProducts(pageNum);

        setProducts(prev =>
          refresh ? nextData : [...prev, ...nextData]
        );

        setPage(pageNum);
        setHasMore(nextData.length > 0);

        setLoading(false);
        setRefreshing(false);
        endReachedLock.current = false;
      }, 1000);
    },
    [loading, refreshing]
  );

  const onRefresh = useCallback(() => {
    fetchProducts(1, true);
  }, [fetchProducts]);

  const loadMore = useCallback(() => {
    if (!hasMore || endReachedLock.current) return;
    endReachedLock.current = true;
    fetchProducts(page + 1);
  }, [page, hasMore, fetchProducts]);

  const renderItem = useCallback(
    ({ item }) => <ProductCard item={item} />,
    []
  );

  const keyExtractor = useCallback(
    (item: any) => item.id.toString(),
    []
  );

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
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={5}
        removeClippedSubviews
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
          />
        }
        ListFooterComponent={
          loading && !refreshing ? (
            <ActivityIndicator style={styles.loader} color={theme.primary} />
          ) : null
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default React.memo(ProductListScreen);

const styles = StyleSheet.create({
  container: { flex: 1 },

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
