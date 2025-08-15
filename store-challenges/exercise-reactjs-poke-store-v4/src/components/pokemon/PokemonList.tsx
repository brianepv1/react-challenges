// src/components/PokemonList.tsx

import type { PokemonListProps } from "../../types/pokemons";
import PokemonCard from "./PokemonCard";


export default function PokemonList({ pokemons }: PokemonListProps) {
    return (
        <div className="grid">
            {pokemons?.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
        </div>
    );
}