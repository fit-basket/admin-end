import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

// const getToken = () => {
//   const authToken = document.cookie
//     //   console.log("AUTHHHH", authToken);
//     .split("; ")
//     .find((row) => row.startsWith("access_token="))
//     .split("=")[1];
//   localStorage.setItem("authToken", authToken);
// };

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
      //   getToken();
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signInStart, signInSuccess, signInFailure, signOut } =
  counterSlice.actions;

export default counterSlice.reducer;
