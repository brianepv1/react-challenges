import type { Pokemon } from "../interfaces/interfaces"

export type PokemonListProps = {
    pokemons?: Pokemon[] // Hacemos pokemons opcional por si aún no han cargado
}