import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
    name: 'adminSlice',
    initialState: {
        register: {},
        login: {},
        userDetails: {},
        token: "",
    },
    reducers: {
        createUser: (state, payload) => {
            state.register = { ...payload };
        },
        loginUser: (state, payload) => {
            state.login = { ...payload };
        },
        userDetail: (state, payload) => {
            state.userDetails = { ...payload };
        },
        token: (state, payload) => {
            state.token = { ...payload };
        }
    },
});

export const { createUser, loginUser, userDetail, token } = adminSlice.actions
export default adminSlice.reducer