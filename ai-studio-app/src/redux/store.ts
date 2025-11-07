import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/loginSlice';
import registerReducer from './slices/registerSlice';
import generationReducer  from './slices/promptGenerationSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        promptGeneration: generationReducer,
        theme: themeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;