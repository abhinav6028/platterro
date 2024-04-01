import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch data from an API
export const fetchData = createAsyncThunk('data/fetchData', async () => {
    try {
        const response = await axios.get('https://pappad.intertoons.com/api/03879045/V1/configuration');
        return response.data;
    } catch (error) {
        throw error;
    }
});

// Define slice
const dataSlice = createSlice({
    name: 'data',
    initialState: {
        value: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.loading = false;
                state.value = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

// Configure Redux store
const store = configureStore({
    reducer: {
        data: dataSlice.reducer
    }
});

export default store;