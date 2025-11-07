import { createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
    name: 'theme',
    initialState: {dark: false},
    reducers: {
        toggleTheme: (state) => {
            state.dark = !state.dark;
            document.documentElement.classList.toggle('dark', state.dark);
            localStorage.setItem('theme', state.dark ? 'dark' : 'light')
        },
        loadTheme: (state) => {
            const saved = localStorage.getItem('theme');
            state.dark = saved === 'dark';
            document.documentElement.classList.toggle('dark', state.dark)
        }
    }
})

export const { toggleTheme, loadTheme } = themeSlice.actions;
export default themeSlice.reducer;