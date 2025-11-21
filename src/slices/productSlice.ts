
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type ProductState = {
  list: Product[];
  loading: boolean;
  editing: Product | null; 
};

const initialState: ProductState = {
  list: [],
  loading: false,
  editing: null,
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await axios.get<Product[]>("https://fakestoreapi.com/products");
  return res.data;
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {

      const productExists = state.list.some((p) => p.id === action.payload.id);
      if (productExists) {
 
        const maxId = state.list.reduce((m, p) => Math.max(m, p.id), 0);
        state.list.push({ ...action.payload, id: maxId + 1 });
      } else {
        state.list.push(action.payload);
      }
    },

    updateProduct: (state, action: PayloadAction<Product>) => {
      const idx = state.list.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) state.list[idx] = action.payload;
    },

    deleteProduct: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
    },

    setEditing: (state, action: PayloadAction<Product | null>) => {
      state.editing = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      
      });
  },
});

export const { addProduct, updateProduct, deleteProduct, setEditing } =
  productSlice.actions;

export default productSlice.reducer;
