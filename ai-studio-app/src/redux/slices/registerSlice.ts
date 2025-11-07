import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegisterUser { 
    id: number;
    name: string;
    email: string;
    phone?: number;
    password: string;
}

interface RegisterResponseStructure {
    user: RegisterUser | null;
    success: boolean;
    error: boolean;
}

const initialState: RegisterResponseStructure = {
    success: false,
    user: null,
    error: false,
}

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerSuccess: (state, action: PayloadAction<RegisterUser>) => {
            state.user = action.payload;
            state.success = true;
            state.error = false;
        },
        registerFailure: (state, action) => {
            state.user = null;
            state.success = false;
            state.error = action.payload;
        },
        resetRegister: (state) => {
            state.user = null;
            state.success = false;
        }
    }
})

export const { registerSuccess, registerFailure, resetRegister } = registerSlice.actions;
export default registerSlice.reducer;