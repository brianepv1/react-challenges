import { useQuery } from '@apollo/client';
import { GET_ALL_POKEMONS } from '../api/queries';
import type { Pokemon } from '../types';
import { PokemonCard } from '../components/pokemons/PokemonCard';

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_POKEMONS);

  if (loading) return <div className="text-center py-20">Cargando...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error.message}</div>;

  return (
    // La sección padre ocupa todo el ancho disponible.
    <section className="w-full py-12 sm:py-16">
      
      {/* EL CAMBIO CLAVE: Este div es nuestro nuevo "contenedor".
          - `max-w-screen-xl`: Un ancho máximo generoso, más grande que el `container` por defecto.
          - `mx-auto`: Centra este contenedor horizontalmente.
          - `px-4 sm:px-6 lg:px-8`: Padding horizontal que se adapta a las pantallas.
      */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Elige tu Compañero</h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-500">Una nueva aventura te espera en cada elección.</p>
        </div>
        
        {/* La cuadrícula ahora vivirá dentro de este contenedor perfectamente centrado. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {data.pokemons.map((pokemon: Pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
      
    </section>
  );
}