import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  selectedCategory: "",
  products: [],
  isEdit: false,
  loading: false,
  error: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Handle Category fetch
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

    // Handle category selection
    setCategory: (state, action) => {
      state.selectedCategory = action.payload.data;
    },

    // Handle Product fetch
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

    // Handle Add product
    addProductStart: (state) => {
      state.loading = true;
    },
    addProductSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
    },
    addProductFailure: (state) => {
      state.loading = false;
      state.error = true;
    },

    // Handle Modal
    setModalOpen: (state, action) => {
      state.isEdit = action.payload.data;
    },
    // setModalClose: (state) => {
    //   state.modalOpen = true;
    // },
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
  addProductStart,
  addProductSuccess,
  addProductFailure,
  setModalOpen,
  // setModalClose,
} = productSlice.actions;

export default productSlice.reducer;
