import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get } from 'lodash';

// import AuthenticationService from '../../services/auth.service';

export const logout = createAsyncThunk('auth/logout', () => {
    localStorage.removeItem('token');
    localStorage.clear();
});

const initialState = {
    loading: false,
    token: null,
    error: false,
    user: null,
    isLoggedIn: !!JSON.parse(localStorage.getItem('isLoggedIn')),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.token = get(action.payload, 'token', null);
            localStorage.setItem('token', JSON.stringify(get(action.payload, 'token', null)));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout.fulfilled, (state) => {
            state.token = null;
            state.user = null;
            state.isLoggedIn = false;
        });
    },
});

const { reducer, actions } = authSlice;

export const { setToken, setUser, setLoggedIn } = actions;
export default reducer;