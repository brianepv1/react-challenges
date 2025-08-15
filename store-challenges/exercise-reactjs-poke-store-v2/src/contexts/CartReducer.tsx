// Aqui definimos aquellas funciones o manejos de estados que necesitamos para el estado general de nuestra aplicacion

import type { CartItem } from "../interfaces/interfaces";
import type { Action, State } from "../types/types";

// Recibe un estado y una accion
export function CartReducer(state: State, action: Action){
    // Manejamos las diferentes acciones con el switch
    switch(action.type){
        case "ADD_TO_CART": {
            // Primero necesitamos el payload que viene dentro de la accion, o sea la data
            const pokemonToAdd = action.payload
            // Del estado actual, sacamos el item si ya existe si no regresara -1 
            const existingItemIndex = state.cart.findIndex((poke) => poke.id === pokemonToAdd.id)

            // Si hay un pokemon, dara resultado 1 o mayor a 1 entonces entramos
            if(existingItemIndex > -1){
                // Hacemos una copia del estado del carrito actual, con el spread operator para no mutar directamente al estado
                const updatedCart =  [...state.cart]
                // Con ayuda del existingItemIndex hacemos update de la cantidad de pokemones que el usuario se esta llevando
                // dado que updatedCart es un array
                updatedCart[existingItemIndex].quantity += 1

                // Retornamos con el spread operator, le decimos que de todo los datos del spread operator, vas  modificar solo el carro con 
                // el nuevo carrito que esta actualizado
                return {...state, cart: updatedCart}
            }

            // En dado caso de que no exista o sea que no sea mayor a -1 significa que no exista
            // Lo que haremos sera agregar al carrito
            // Con el spread operator sacamos toda la data del payload y el quantity le ponemos una dado que el cart items es un pokemon con la
            // propiedad cantidad
            const newCartItem: CartItem = { ...pokemonToAdd, quantity: 1}
        
            // Finalmente retornamos de nueva cuenta con el spread operator, le decimos que 
            // de lo que esta actualmente en en el estado cart, vamos a modificar la propiedad cart
            // que sera una combinacion de lo que hay en el estado del carrito mas el newCartItem
            return { ...state, cart: [...state.cart, newCartItem]}
        }
        case "REMOVE_FROM_CART": {
            // Obtenemos el id del payload
            const { id } = action.payload

            // Filtramos mediante el id, con el estado actual del carrito
            const filteredCart = state.cart.filter((poke) => poke.id !== id );

            // Retornamos el estado modificando lo que tiene el carrito
            return {...state, cart: filteredCart }

        }
        case "DECREMENT_QUANTITY": {
            const { id } = action.payload;
            const itemToDecrement = state.cart.find((item) => item.id === id);

            if(itemToDecrement?.quantity === 1){
                return {
                    ...state,
                    cart: state.cart.filter((item) => item.id !== id)
                }
            }

            const updatedCart = state.cart.map((item) => 
                item.id === id ? { ...item, quantity: item.quantity - 1} : item
            )
            return { ...state, cart: updatedCart }
        }
        default:
            return state
    }

}