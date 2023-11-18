import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  selectedCategory: "",
  products: [],
  loading: false,
  error: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getCategoriesStart: (state) => {
      state.loading = true;
    },
    getCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.error = false;
    },
    getCategoriesFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload.data;
    },
    getProductStart: (state) => {
      state.loading = true;
    },
    getProductSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = false;
    },
    getProductFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getCategoriesStart,
  getCategoriesSuccess,
  getCategoriesFailure,
  setCategory,
  getProductStart,
  getProductSuccess,
  getProductFailure,
} = productSlice.actions;

export default productSlice.reducer;
