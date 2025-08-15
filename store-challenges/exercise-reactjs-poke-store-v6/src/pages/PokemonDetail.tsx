import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALL_POKEMONS } from '../api/queries';
import type { Pokemon } from '../types';
import { Badge } from '../components/ui/Badge';
import { PokemonCardActions } from '../components/pokemons/PokemonCardActions'; // Necesitamos este componente

export default function PokemonDetail() {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_ALL_POKEMONS);

  if (loading) return <p className="text-center py-20">Cargando...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error.message}</p>;

  const pokemon: Pokemon | undefined = data.pokemons.find((p: Pokemon) => p.id === id);

  if (!pokemon) return <p className="text-center py-20">Pokémon no encontrado.</p>;

  return (
    <section className="py-12 sm:py-16">
      {/* Contenedor centrado con un ancho máximo apropiado para una página de detalles. */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex items-center justify-center bg-slate-100 rounded-lg p-4">
            <img src={pokemon.image} alt={pokemon.name} className="max-h-[300px] w-auto object-contain" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold capitalize text-slate-900">{pokemon.name}</h1>
            <div className="flex gap-2 my-4">
              {pokemon.types.map(type => <Badge key={type} className="capitalize">{type}</Badge>)}
            </div>
            <p className="text-5xl font-extrabold text-slate-900 mb-6">${pokemon.price.toFixed(2)}</p>
            <div className="mb-6 border-t pt-4">
              <h2 className="text-xl font-semibold mb-3 text-slate-800">Detalles</h2>
              <ul className="space-y-2 text-slate-600">
                <li><strong>Altura:</strong> {pokemon.height} - {pokemon.height}</li>
                <li><strong>Peso:</strong> {pokemon.weight} - {pokemon.weight}</li>
              </ul>
            </div>
            <div className="mt-auto w-full">
              <PokemonCardActions pokemon={pokemon} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}