import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const getCookies = Cookies.get('user');
const initialState = {
    login: {
        currentUser: getCookies ? JSON.parse(getCookies) : null,
        isFetching: false,
        error: false,
    },
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
    },
});

export const { loginStart, loginSuccess, loginFailed } = authSlice.actions;

export const tokenRedux = (state) => {
    return state.auth.login.currentUser && state.auth.login.currentUser.accessToken;
};

export default authSlice.reducer;
