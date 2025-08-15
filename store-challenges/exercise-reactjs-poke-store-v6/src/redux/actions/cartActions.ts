import { 
    ADD_TO_CART,
    DECREMENT_QUANTITY,
    INCREMENT_QUANTITY,
    REMOVE_FROM_CART,
 } from '../types/cartType';

 import type { 
    CartActionTypes
 } from '../types/cartType';

import type { Pokemon } from '../../types';

// Opcional pero recomendado: agregar el tipo de retorno para mayor claridad.
export const addToCart = (pokemon: Pokemon): CartActionTypes => ({
    type: ADD_TO_CART,
    payload: pokemon,
  });
  
  export const removeFromCart = (pokemonId: string): CartActionTypes => ({
    type: REMOVE_FROM_CART,
    payload: pokemonId,
  });
  
  export const incrementQuantity = (pokemonId: string): CartActionTypes => ({
    type: INCREMENT_QUANTITY,
    payload: pokemonId,
  });
  
  export const decrementQuantity = (pokemonId: string): CartActionTypes => ({
    type: DECREMENT_QUANTITY,
    payload: pokemonId,
  });