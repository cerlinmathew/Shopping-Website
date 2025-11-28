import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
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
    addProduct: {
      reducer: (state, action: PayloadAction<Product>) => {
        state.list.push(action.payload);
      },
      prepare: (product: Omit<Product, "id">) => {
        return {
          payload: {
            ...product,
            id: Date.now(), // unique & safe for frontend-only apps
          },
        };
      },
    },

    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.list.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
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
