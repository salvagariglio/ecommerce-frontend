import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.products.findIndex(
                (item) => item._id === action.payload._id
            );

            if (itemIndex >= 0) {
                state.products[itemIndex].quantity += action.payload.quantity;
            } else {
                state.products.push(action.payload);
            }
        },
        removeFromCart: (state, action) => {
            state.products = state.products.filter(
                (item) => item._id !== action.payload
            );
        },
        incrementQuantity: (state, action) => {
            const itemIndex = state.products.findIndex(
                (item) => item._id === action.payload
            );

            if (itemIndex >= 0) {
                state.products[itemIndex].quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const itemIndex = state.products.findIndex(
                (item) => item._id === action.payload
            );

            if (itemIndex >= 0 && state.products[itemIndex].quantity > 1) {
                state.products[itemIndex].quantity -= 1;
            }
        },
        clearCart: (state) => {
            state.products = [];
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;