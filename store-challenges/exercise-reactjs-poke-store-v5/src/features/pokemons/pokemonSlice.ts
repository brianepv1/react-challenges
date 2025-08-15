import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from '../../types';
// Asegúrate que la importación del thunk apunte al archivo correcto
import { fetchPokemons } from '../../api/queries'; 

// 1. Define la interfaz para el estado de este "slice"
interface PokemonsState {
  list: Pokemon[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

// 2. Define el estado inicial
const initialState: PokemonsState = {
  list: [],
  loading: 'idle',
  error: null,
};

// 3. Crea el slice
const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    // Aquí irían acciones síncronas si las tuvieras
  },
  // 4. Esta es la parte más importante para las llamadas asíncronas
  extraReducers: (builder) => {
    builder
      // Se ejecuta cuando la llamada a la API empieza
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = 'pending';
        state.error = null; // Limpia errores anteriores
      })
      // SE EJECUTA CUANDO LA LLAMADA A LA API TERMINA CON ÉXITO
      .addCase(fetchPokemons.fulfilled, (state, action: PayloadAction<Pokemon[]>) => {
        state.loading = 'succeeded';
        // Aquí está la magia: guardamos los Pokémon del 'payload' en nuestra lista
        state.list = action.payload; 
      })
      // Se ejecuta si la llamada a la API falla
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Ocurrió un error al traer los pokémons';
      });
  },
});

export default pokemonsSlice.reducer;