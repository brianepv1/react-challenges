import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity } from '../features/cart/cartSlice';
import type { Pokemon } from '../types';
import type { RootState, AppDispatch } from '../app/store';
import styled from 'styled-components';

const Card = styled.div`
  background: var(--card-background);
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--shadow-color);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  text-align: center;
  flex-grow: 1;
`;

const PokemonImage = styled.img`
  width: 120px;
  height: 120px;
  margin: 0 auto;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
`;

const PokemonName = styled.h3`
  margin: 1rem 0 0.5rem;
  text-transform: capitalize;
  font-size: 1.3rem;
  color: var(--text-color);
`;

const PokemonTypes = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TypeBadge = styled.span`
  background-color: #eee;
  color: #555;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  text-transform: capitalize;
`;

const CardActions = styled.div`
  padding: 1rem;
  border-top: 1px solid #f0f0f0;
`;

const BaseButton = styled.button`
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  width: 100%;

  &:active {
    transform: scale(0.97);
  }
`;

const AddButton = styled(BaseButton)`
  background-color: var(--secondary-color);
  color: white;

  &:hover {
    background-color: #274a8b;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const QuantityButton = styled(BaseButton)`
  background-color: #e0e0e0;
  color: var(--text-color);
  width: 45px;
  flex-shrink: 0;
`;

const QuantityDisplay = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  min-width: 30px;
  text-align: center;
`;


interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === pokemon.id)
  );

  const handleAddToCart = () => dispatch(addToCart(pokemon));
  const handleIncrement = () => dispatch(incrementQuantity(pokemon.id));
  const handleDecrement = () => dispatch(decrementQuantity(pokemon.id));

  return (
    <Card>
      <CardContent>
        <PokemonImage src={pokemon.image} alt={pokemon.name} />
        <PokemonName>{pokemon.name}</PokemonName>
        <PokemonTypes>
          {pokemon.types.map((type) => (
            <TypeBadge key={type}>{type}</TypeBadge>
          ))}
        </PokemonTypes>
      </CardContent>
      <CardActions>
        {cartItem ? (
          <QuantityControl>
            <QuantityButton onClick={handleDecrement}>-</QuantityButton>
            <QuantityDisplay>{cartItem.quantity}</QuantityDisplay>
            <QuantityButton onClick={handleIncrement}>+</QuantityButton>
          </QuantityControl>
        ) : (
          <AddButton onClick={handleAddToCart}>Agregar al Carrito</AddButton>
        )}
      </CardActions>
    </Card>
  );
};

export default PokemonCard;