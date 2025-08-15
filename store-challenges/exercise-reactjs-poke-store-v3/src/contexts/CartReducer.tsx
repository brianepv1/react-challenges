import type { CartItem } from "../interfaces/interfaces";
import type { Action, State } from "../types/types";

export function CartReducer(state: State, action: Action){
    switch(action.type){
        case "ADD_TO_CART": {
            const pokemonToAdd = action.payload
            const existingPokemon = state.cart.findIndex((poke) => {
                console.log(poke.id === pokemonToAdd.id)
                return poke.id === pokemonToAdd.id
            });

            if (existingPokemon > -1) {
                // .map() crea un NUEVO array.
                const updatedCart = state.cart.map((pokemon, index) => {
                    // Si este es el Pokémon que queremos actualizar...
                    if (index === existingPokemon) {
                        // ...retornamos un NUEVO objeto con la propiedad 'quantity' actualizada.
                        return { ...pokemon, quantity: pokemon.quantity + 1 };
                    }
                    // Para todos los demás Pokémon, los retornamos sin cambios.
                    return pokemon;
                });
            
                // Devolvemos el estado con el nuevo array que contiene el objeto actualizado.
                return { ...state, cart: updatedCart };
            }

            
            const newCartItem: CartItem = { ...pokemonToAdd, quantity: 1} 
            return { ...state, cart: [...state.cart, newCartItem]}
        }
        case "REMOVE_FROM_CART": {
            const { id } = action.payload;
            const filteredList = state.cart.filter((poke) => {
                return poke.id !== id
            })

            return { ...state, cart: filteredList}
        }
        case "DECREMENT_QUANTITY": {
            const { id } = action.payload
            const itemToDecrement = state.cart.find((poke) => poke.id === id)

            if (!itemToDecrement) return state;

            if(itemToDecrement?.quantity === 1){
                return {
                    ...state,
                    cart: state.cart.filter((poke) => poke.id !== id)
                }
            }

            const updatedCart = state.cart.map((poke) => poke.id === id ? { ...poke, quantity: poke.quantity - 1 } : poke )
        // Si tiene más de 1, solo decrementamos la cantidad
            return { ...state, cart: updatedCart}
        }
        default: 
            return state
    }
}