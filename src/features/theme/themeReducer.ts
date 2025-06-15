import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Theme, ThemeState } from "../../types/themeType";

const themeFromStorage = ((): Theme => {
  const stored = localStorage.getItem('theme');
  return stored === 'dark' ? 'dark' : 'light';
})();

const initialState: ThemeState = {
  theme: themeFromStorage,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;