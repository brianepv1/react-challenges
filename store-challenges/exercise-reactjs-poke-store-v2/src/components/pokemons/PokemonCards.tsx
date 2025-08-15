// src/components/PokemonCard.tsx

import type { Pokemon } from "../../interfaces/interfaces";
import { Link } from "react-router-dom";
import Buttons from "../buttons/Buttons";
import type { MouseEvent } from "react";
import { usePokemon } from "../../contexts/PokemonContext";

// Ahora las props son para un solo pokémon
type PokemonCardProps = {
    pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
    const { addToCart } = usePokemon();

    const handleAddToCart = (e: MouseEvent) => {
        e.preventDefault();
        addToCart(pokemon);
        console.log(`${pokemon.name} añadido al carrito.`);
    }

    return (
        <Link to={`/pokemon/${pokemon.id}`} className="card" key={pokemon.id}>
            <img src={pokemon.image} alt={pokemon.name} />
            <h3 className="card-title">{pokemon.name}</h3>
            <div className="card-info">
                <p>Tipos: {pokemon.types.join(', ')}</p>
            </div>
            <Buttons name="Agregar" onClick={(e) => handleAddToCart(e)}></Buttons>
        </Link>
    );
}