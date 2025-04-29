import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  errorMessage: "",
  successMessage: "",
};

const handleLogin = ({ data, token }) => {
  localStorage.setItem("authToken", token);
  localStorage.setItem("admin", JSON.stringify(data));
};

const handleLogout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("admin");
};

const handleBusinessUpate = (data) => {
  localStorage.setItem("admin", JSON.stringify(data));
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload.data;
      state.loading = false;
      state.error = false;
      handleLogin(action.payload);
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      handleLogout();
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    updateBusinessStart: (state) => {
      state.loading = true;
    },
    updateBusinessSuccess: (state, action) => {
      const { data } = action.payload;
      state.currentUser = data;
      state.loading = false;
      state.error = false;
      handleBusinessUpate(data);
    },
    updateBusinessFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateErrorMessage: (state, action) => {
      state.errorMessage = action.payload.data;
    },
    updateSuccessMessage: (state, action) => {
      state.successMessage = action.payload.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOut,
  updateBusinessStart,
  updateBusinessSuccess,
  updateBusinessFailure,
  updateErrorMessage,
  updateSuccessMessage,
} = userSlice.actions;

export default userSlice.reducer;
