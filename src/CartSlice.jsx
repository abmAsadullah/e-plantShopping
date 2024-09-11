// CartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0
    },
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.name === action.payload.name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0); // Atualiza totalQuantity
        },
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const item = state.items.find(item => item.name === name);
            if (item) {
                if (quantity <= 0) {
                    state.items = state.items.filter(item => item.name !== name);
                } else {
                    item.quantity = quantity;
                }
                state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0); // Atualiza totalQuantity
            }
        },
        removeItem: (state, action) => {
            const name = action.payload;
            state.items = state.items.filter(item => item.name !== name);
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0); // Atualiza totalQuantity
        }
    }
});

export const { addItem, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
