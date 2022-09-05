import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todo: {
        listTodo: [],
        isFetching: false,
        error: true,
    },
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getTodoStart: (state) => {
            state.todo.isFetching = true;
        },
        getTodoSuccess: (state, action) => {
            state.todo.isFetching = false;
            state.todo.listTodo = action.payload;
            state.todo.error = false;
        },
        getTodoFailed: (state) => {
            state.todo.isFetching = false;
            state.todo.error = true;
        },
    },
});

export const { getTodoStart, getTodoSuccess, getTodoFailed } = authSlice.actions;

export const todoRedux = (state) => {
    return state.todos.todo.listTodo;
};

export default authSlice.reducer;
