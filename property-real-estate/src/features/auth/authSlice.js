import { createSlice } from "@reduxjs/toolkit";

/*
  Simple auth slice kept minimal. We use local/demo auth in the app
  for demonstration. If you hook Firebase login/sign-up flows, you can
  dispatch actions to set user state here.
*/

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser(state, action) { state.user = action.payload; },
    logout(state) { state.user = null; },
    setLoading(state, action) { state.loading = action.payload; },
    setError(state, action) { state.error = action.payload; },
  },
});

export const { setUser, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
