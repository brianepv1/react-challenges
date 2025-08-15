// src/components/PokemonList.tsx

import type { Pokemon } from "../../interfaces/interfaces";
import PokemonCard from "./PokemonCards";


type PokemonListProps = {
    pokemons?: Pokemon[] // Hacemos pokemons opcional por si aún no han cargado
}

export default function PokemonList({ pokemons }: PokemonListProps) {
    return (
        <div className="grid">
            {pokemons?.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
        </div>
    );
}