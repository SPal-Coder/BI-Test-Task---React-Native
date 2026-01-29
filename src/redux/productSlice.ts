import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllProducts } from '../api/products';

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (
    { refresh = false }: { refresh?: boolean } = {},
    { getState }
  ) => {
    const state: any = getState();
    const { skip, limit } = state.products;

    const currentSkip = refresh ? 0 : skip;
    const response = await fetchAllProducts(limit, currentSkip);

    return {
      products: response.products,
      total: response.total,
      refresh,
    };
  }
);

interface ProductState {
  items: any[];
  isFetching: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  skip: number;
  limit: number;
  total: number;
  hasMore: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  isFetching: false,
  isRefreshing: false,
  isLoadingMore: false,
  skip: 0,
  limit: 10,
  total: 0,
  hasMore: true,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        const refresh = action.meta.arg?.refresh;

        if (refresh) {
          state.isRefreshing = true;
        } else if (state.items.length === 0) {
          state.isFetching = true;
        } else {
          state.isLoadingMore = true;
        }
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { products, total, refresh } = action.payload;

        state.isFetching = false;
        state.isRefreshing = false;
        state.isLoadingMore = false;

        if (refresh) {
          state.items = products;
          state.skip = products.length;
        } else {
          state.items.push(...products);
          state.skip += products.length;
        }

        state.total = total;
        state.hasMore = state.skip < total;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.isFetching = false;
        state.isRefreshing = false;
        state.isLoadingMore = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default productSlice.reducer;
