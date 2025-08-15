import './index.css'
import { usePokemon } from './contexts/PokemonContext';
import { useCart } from './contexts/CartContext';
import PokemonList from './components/pokemon/PokemonList';

function App() {
  const { pokemons, loading, error} = usePokemon();
  const { cart } = useCart();


  if(loading){
    return <p>Cargando Pokemon...</p>
  }

  if(error){
    return <p>Error al cargar los Pokemons: {error.message}</p>
  }

  return (
    <div className='container'>
      <h1>Poke Store</h1>
      {
        pokemons && <PokemonList pokemons={pokemons}></PokemonList>
      }
      {cart.length > 0 && <div className='floating_cart btn'>{cart.length} Pokemones</div>}
    </div>
  )
}

export default App
