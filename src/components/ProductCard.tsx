import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import QuantityControl from './QuantityControl';
import { useTheme } from '../theme/useTheme';

const ProductCard = ({ item }: any) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const cartItem = useSelector(
    (state: any) => state.cart.find((i: any) => i.id === item.id),
    shallowEqual
  );

  return (
    <View style={[styles.card, { backgroundColor: theme.card, shadowColor: theme.text }]}>
      <FastImage
        style={styles.image}
        source={{
          uri: item.thumbnail,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.description, { color: theme.text }]} numberOfLines={2}>
          {item.description}
        </Text>

        <Text style={[styles.price, { color: theme.primary }]}>₹ {item.price}</Text>

        <View style={styles.actions}>
          <QuantityControl
            qty={cartItem?.qty || 0}
            onAdd={() => dispatch(addToCart(item))}
            onRemove={() => dispatch(removeFromCart(item.id))}
          />
        </View>
      </View>
    </View>
  );
};

export default React.memo(ProductCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '30%', // Responsive width relative to card
    aspectRatio: 1, // Maintain square aspect ratio
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    marginBottom: 4,
    opacity: 0.8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  actions: {
    alignItems: 'flex-start',
  },
});
