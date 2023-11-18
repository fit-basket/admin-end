import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const handleLogin = ({ data, token }) => {
  localStorage.setItem("authToken", token);
  localStorage.setItem("user", JSON.stringify(data));
};

const handleLogout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
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
    signOut: (state, action) => {
      handleLogout();
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signInStart, signInSuccess, signInFailure, signOut } =
  userSlice.actions;

export default userSlice.reducer;
