// src/views/PokemonDetail.tsx

import { useParams, Link } from "react-router-dom";
import { usePokemon } from "../contexts/PokemonContext";
import '../index.css'

// Objeto para mapear tipos de Pokémon a colores. ¡Siéntete libre de añadir más!
const typeColors: { [key: string]: string } = {
  fire: '#FF4422',
  grass: '#77CC55',
  water: '#3399FF',
  electric: '#FFCC33',
  psychic: '#FF5599',
  ice: '#66CCFF',
  dragon: '#7766EE',
  dark: '#775544',
  fairy: '#FF77EE',
  normal: '#AAAA99',
  fighting: '#BB5544',
  flying: '#8899FF',
  poison: '#AA5599',
  ground: '#DDBB55',
  rock: '#BBAA66',
  bug: '#AABB22',
  ghost: '#6666BB',
  steel: '#AAAABB'
};

export default function PokemonDetail() {
  const { pokemonId } = useParams();
  const { pokemons, loading } = usePokemon();

  if (loading) {
    return <p className="loading-message">Cargando detalles...</p>;
  }

  const pokemon = pokemons.find(p => p.id === pokemonId);

  if (!pokemon) {
    return (
      <div className="detail-view">
        <h2>Pokémon no encontrado</h2>
        <Link to="/" className="back-link">← Volver a la tienda</Link>
      </div>
    );
  }

  // Obtenemos el color principal del Pokémon para el fondo
  const primaryType = pokemon.types[0].toLowerCase();
  const themeColor = typeColors[primaryType] || '#CCCCCC'; // Color por defecto

  return (
    // Aplicamos un estilo en línea para el fondo degradado dinámico
    <div className="detail-view" style={{ background: `linear-gradient(180deg, ${themeColor} 5%, #f4f7f9 40%)` }}>
      <Link to="/" className="back-link">← Volver a la tienda</Link>
      
      <div className="detail-content">
        <div className="image-container">
          <img src={pokemon.image} alt={pokemon.name} className="detail-image" />
        </div>
        
        <div className="info-container">
          <h1 className="pokemon-name">{pokemon.name}</h1>
          
          <div className="types-container">
            {pokemon.types.map(type => (
              <span key={type} className="type-pill" style={{ backgroundColor: typeColors[type.toLowerCase()] || '#CCCCCC' }}>
                {type}
              </span>
            ))}
          </div>
          
          <div className="stats">
            <div className="stat-item">
              <span>Peso</span>
              <strong>{pokemon.weight} kg</strong>
            </div>
            <div className="stat-item">
              <span>Altura</span>
              <strong>{pokemon.height} m</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}