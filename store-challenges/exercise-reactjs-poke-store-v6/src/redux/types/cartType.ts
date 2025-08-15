import type { Pokemon } from "../../types";

// Constantes de tipo de acción (se mantienen igual)
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';

// --- Interfaces de Acción Específicas ---

// Acción para agregar un Pokémon. El payload es el objeto Pokémon completo.
interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: Pokemon;
}

// Acción para remover. El payload es solo el ID del Pokémon.
interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: string; // pokemonId
}

// Acción para incrementar. El payload es solo el ID del Pokémon.
interface IncrementQuantityAction {
  type: typeof INCREMENT_QUANTITY;
  payload: string; // pokemonId
}

// Acción para decrementar. El payload es solo el ID del Pokémon.
interface DecrementQuantityAction {
  type: typeof DECREMENT_QUANTITY;
  payload: string; // pokemonId
}

// --- Unión Discriminada de Todas las Acciones del Carrito ---
// Este es el único tipo que nuestro reducer necesitará.
export type CartActionTypes =
  | AddToCartAction
  | RemoveFromCartAction
  | IncrementQuantityAction
  | DecrementQuantityAction;