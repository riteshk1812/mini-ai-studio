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
}

const initialState: GenerationInitialState = {
    generations: [],
    success: false
}

const generationSlice = createSlice({
    name: 'generations',
    initialState,
    reducers: {
        createGenerationSuccess: (state, action: PayloadAction<GenerationInputs>) => {
            state.generations = [action.payload, ...state.generations].slice(0, 5);
            state.success = true;
        },
        fetchGenerationSuccess: (state, action: PayloadAction<GenerationInputs[]>) => {
            console.log("triggered", state, action);
            
            state.generations = action.payload.slice(0,4);
            state.success = true;
        },
        generationFailure: (state) => {
            state.success = false;
        },
        resetGenerations: (state) => {
            state.generations = [];
            state.success = false;
        }
    },
});

export const {
    createGenerationSuccess,
    fetchGenerationSuccess,
    generationFailure,
    resetGenerations,
} = generationSlice.actions;

export default generationSlice.reducer;