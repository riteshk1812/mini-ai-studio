import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GenerationInputs {
    id: number;
    prompt: string;
    style: string;
    imageUrl: string;
    createdAt: string;
}

interface GenerationInitialState {
    generations: GenerationInputs[];
    success: boolean;
    loading: boolean;
    error: string | null;
    retryCount: number;
}

const initialState: GenerationInitialState = {
    generations: [],
    success: false,
    loading: false,
    error: null,
    retryCount: 0
}

const generationSlice = createSlice({
    name: 'generations',
    initialState,
    reducers: {
        loadingPromptGeneration: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        createGenerationSuccess: (state, action: PayloadAction<GenerationInputs>) => {
            state.generations = [action.payload, ...state.generations].slice(0, 5);
            state.loading = false;
            state.success = true;
            state.retryCount = 0;
            state.error = null;
        },
        fetchGenerationSuccess: (state, action: PayloadAction<GenerationInputs[]>) => {
            state.generations = action.payload.slice(0,4);
            state.loading =false;
            state.success = true;
            state.error = null;
        },
        generationFailure: (state, action: PayloadAction<string | undefined>) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload || "Something went wrong.";
        },
        retryCountGeneration: (state) => {
            state.retryCount += 1;
            state.loading = false;
            state.error = null;
        },
        resetGenerations: (state) => {
            state.generations = [];
            state.success = false;
            state.loading = false;
            state.error = null;
            state.retryCount = 0;
        },
    },
});

export const {
    loadingPromptGeneration,
    createGenerationSuccess,
    fetchGenerationSuccess,
    generationFailure,
    retryCountGeneration,
    resetGenerations,
} = generationSlice.actions;

export default generationSlice.reducer;