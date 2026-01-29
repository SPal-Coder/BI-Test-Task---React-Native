import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTheme } from '../theme/useTheme';

const QuantityControl = ({ qty, onAdd, onRemove }: any) => {
  const { theme } = useTheme();

  if (qty === 0) {
    return (
      <TouchableOpacity
        onPress={onAdd}
        style={[styles.addBtn, { backgroundColor: theme.primary }]}
      >
        <Text style={styles.addBtnText}>Add to Cart</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background, borderColor: theme.border }]}>
      <TouchableOpacity onPress={onRemove} style={[styles.btn, { backgroundColor: theme.card }]}>
        <Ionicons name="remove-outline" size={18} color={theme.text} />
      </TouchableOpacity>

      <Text style={[styles.qty, { color: theme.text }]}>{qty}</Text>

      <TouchableOpacity onPress={onAdd} style={[styles.btn, { backgroundColor: theme.card }]}>
        <Ionicons name="add-outline" size={18} color={theme.text} />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(QuantityControl);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  addBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
