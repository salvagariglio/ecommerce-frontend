import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice"

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("authState");
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (e) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("authState", serializedState);
    } catch (e) {
    }
};

const preloadedState = {
    auth: loadState(),
};

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    },
    preloadedState,
});

store.subscribe(() => {
    saveState(store.getState().auth);
});
