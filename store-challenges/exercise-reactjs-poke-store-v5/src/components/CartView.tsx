import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../features/cart/cartSlice';
import styled from 'styled-components';

const CartContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: var(--card-background);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--shadow-color);
`;

const CartHeader = styled.h2`
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
  color: var(--text-color);
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  padding: 3rem 1rem;
`;

const CartItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CartItemStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 1.5rem;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  img {
    width: 80px;
    height: 80px;
    background-color: #f7f7f7;
    border-radius: 8px;
  }
  
  p {
    margin: 0;
    text-transform: capitalize;
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuantityButton = styled.button`
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  color: var(--text-color);
  width: 35px;
  height: 35px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f7f7f7;
  }
`;

const QuantityDisplay = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  min-width: 30px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 1.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CartView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);

  if (items.length === 0) {
    return (
      <CartContainer>
        <EmptyCartMessage>Tu carrito está vacío.</EmptyCartMessage>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartHeader>Tu Carrito de Compras</CartHeader>
      <CartItemsList>
        {items.map((item) => (
          <CartItemStyled key={item.id}>
            <ItemInfo>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </ItemInfo>
            <ActionsContainer>
              <QuantityButton onClick={() => dispatch(decrementQuantity(item.id))}>-</QuantityButton>
              <QuantityDisplay>{item.quantity}</QuantityDisplay>
              <QuantityButton onClick={() => dispatch(incrementQuantity(item.id))}>+</QuantityButton>
              <RemoveButton onClick={() => dispatch(removeFromCart(item.id))}>Eliminar</RemoveButton>
            </ActionsContainer>
          </CartItemStyled>
        ))}
      </CartItemsList>
    </CartContainer>
  );
};

export default CartView;