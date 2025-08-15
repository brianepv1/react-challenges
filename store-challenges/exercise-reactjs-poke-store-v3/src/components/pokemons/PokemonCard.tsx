// src/components/PokemonCard.tsx

import type { Pokemon } from "../../interfaces/interfaces";
import { Link } from "react-router-dom";
import type { MouseEvent } from "react";
import { usePokemon } from "../../contexts/PokemonContext";

type PokemonCardProps = {
    pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
    const { cart, addToCart, removeFromCart, decrementQuantity } = usePokemon();
    
    // Usamos '==' para manejar IDs string/number
    const cartItem = cart.find(item => item.id === pokemon.id);
    const quantityInCart = cartItem ? cartItem.quantity : 0;

    const handleActionClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleAddToCart = (e: MouseEvent) => {
        handleActionClick(e);
        addToCart(pokemon);
    }

    const handleIncrement = (e: MouseEvent) => {
        handleActionClick(e);
        addToCart(pokemon);
    }

    const handleDecrement = (e: MouseEvent) => {
        handleActionClick(e);
        decrementQuantity(pokemon.id);
    }
    
    // NUEVO: Manejador para el botón de remover
    const handleRemoveFromCart = (e: MouseEvent) => {
        handleActionClick(e);
        removeFromCart(pokemon.id);
    }
    
    return (
        <Link to={`/pokemon/${pokemon.id}`} className="card" key={pokemon.id}>
            <div className="card-content">
                <img src={pokemon.image} alt={pokemon.name} />
                <h3 className="card-title">{pokemon.name}</h3>
                <div className="card-info">
                    <p>{pokemon.types.join(', ')}</p>
                </div>
            </div>

            <div className="card-actions">
                {quantityInCart === 0 ? (
                    <button className="btn btn-add" onClick={handleAddToCart}>
                        Agregar al Carrito
                    </button>
                ) : (
                    // NUEVO: Contenedor que agrupa el control de cantidad Y el botón de remover
                    <div className="actions-in-cart">
                        <div className="quantity-control">
                            <button className="btn btn-quantity" onClick={handleDecrement}>-</button>
                            <span className="quantity-text">{quantityInCart}</span>
                            <button className="btn btn-quantity" onClick={handleIncrement}>+</button>
                        </div>
                        {/* El nuevo botón de remover (un icono de basura es muy intuitivo) */}
                        <button className="btn btn-remove" onClick={handleRemoveFromCart} title="Remover del carrito">
                            🗑️
                        </button>
                    </div>
                )}
            </div>
        </Link>
    );
}