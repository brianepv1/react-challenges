// Importamos los interfaces que creamos para utilizarlos en 
// los types que se usaran en el reducer del context
import type { CartItem, Pokemon } from "../interfaces/interfaces";

// Al utilizar un context en donde vayamos a modificar el estado seguido o queramos manejar el estado
// Lo mejor es utilizar un reducer como si estuvieramos usando redux dado que con estas acciones podemos 
// activarlas con el dispatch y hacer ciertas acciones
export type Action = 
    | { type: "ADD_TO_CART", payload: Pokemon}
    | { type: "REMOVE_FROM_CART", payload: { id: number }} 
    | { type: "DECREMENT_QUANTITY", payload: { id: number }};

// Como vamos a utilizar un reducer, necesiamos un state que maneje el estado global de la aplicacion
export type State = { 
    cart: CartItem[] 
}

// Pokemon Context type es lo que manejara el context de la aplicacion, esto significa que cuando llamemos al context
// con la funcion usePokemon() podremos obtener lo que pongamos aqui
export type PokemonTypeContext = {
    pokemons: Pokemon[]
    loading: boolean
    error?: Error
    cart: CartItem[]
    addToCart: (pokemon: Pokemon) => void
    removeFromCart: (id: number) => void
    decrementQuantity: (id: number) => void
}
