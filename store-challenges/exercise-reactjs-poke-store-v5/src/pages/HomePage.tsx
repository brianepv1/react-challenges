import React from 'react';
import PokemonList from '../components/PokemonList';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>PokéStore</h1>
      <PokemonList />
    </div>
  );
};

export default HomePage;