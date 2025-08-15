
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { fetchPokemons } from '../api/queries';
import PokemonCard from './PokemonCard';
import styled, { keyframes } from 'styled-components';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--secondary-color);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
  margin: 4rem auto;
`;

const MessageContainer = styled.div`
  text-align: center;
  padding: 4rem;
  font-size: 1.2rem;
  color: #666;
`;

const PokemonList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list: pokemons, loading, error } = useSelector((state: RootState) => state.pokemons);

  useEffect(() => {
    if (loading === 'idle') {
      dispatch(fetchPokemons());
    }
  }, [dispatch, loading]);

  if (loading === 'pending') {
    return (
      <MessageContainer>
        <Loader />
        <p>Cargando Pokémon...</p>
      </MessageContainer>
    );
  }
  
  if (error) {
    return <MessageContainer>Error: {error}</MessageContainer>;
  }

  return (
    <ListContainer>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </ListContainer>
  );
};

export default PokemonList;