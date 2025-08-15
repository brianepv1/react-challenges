// src/reducers/CartReducer.ts

import type { CartItem } from "../interfaces/interfaces";
import type { Action, CartState } from "../types/types";

export default function CartReducer(state: CartState, action: Action) {
    switch (action.type) {
        case "ADD_TO_CART": {
            const pokemonToAdd = action.payload;
            // 1. VERIFICAR SI EL ARTÍCULO YA EXISTE EN EL CARRITO
            const existingPokemon = state.cart.find((poke) => poke.id === pokemonToAdd.id);

            // 2. SI YA EXISTE, DEVOLVEMOS EL ESTADO SIN CAMBIOS PARA EVITAR DUPLICADOS
            if (existingPokemon) {
                return state; 
            }

            // 3. SI NO EXISTE, LO AÑADIMOS CON CANTIDAD 1
            const newItemCart: CartItem = { ...pokemonToAdd, quantity: 1 };
            return { ...state, cart: [...state.cart, newItemCart] };
        }

        case "REMOVE_FROM_CART": {
            const { id } = action.payload;
            const filteredList = state.cart.filter((poke) => poke.id !== id);
            
            return { ...state, cart: filteredList };
        }

        case "INCREMENT_QUANTITY": {
            const { id } = action.payload;
            const updatedCart = state.cart.map((poke) =>
                poke.id === id ? { ...poke, quantity: poke.quantity + 1 } : poke
            );
            return { ...state, cart: updatedCart };
        }

        case "DECREMENT_QUANTITY": {
            const { id } = action.payload;
            // Primero, buscamos el artículo para verificar su cantidad actual
            const pokemonToFind = state.cart.find((poke) => poke.id === id);

            // Si la cantidad es 1, al decrementar lo eliminamos del carrito
            if (pokemonToFind?.quantity === 1) {
                const filteredList = state.cart.filter((poke) => poke.id !== id);
                return { ...state, cart: filteredList };
            }

            // Si es mayor que 1, simplemente restamos uno a la cantidad
            const updatedCart = state.cart.map((poke) =>
                poke.id === id ? { ...poke, quantity: poke.quantity - 1 } : poke
            );
            return { ...state, cart: updatedCart };
        }
        
        default:
            return state;
    }
}