import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state: any, action) => {
      const item = state.find(i => i.id === action.payload.id);
      if (item) item.qty += 1;
      else state.push({ ...action.payload, qty: 1 });
    },
    removeFromCart: (state: any, action) => {
      const item = state.find(i => i.id === action.payload);
      if (!item) return;
      if (item.qty > 1) item.qty -= 1;
      else return state.filter(i => i.id !== action.payload);
    },
    clearCart: () => [],
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
