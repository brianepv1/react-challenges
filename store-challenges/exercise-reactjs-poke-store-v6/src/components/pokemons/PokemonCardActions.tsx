import { useCart } from '../../hooks/useCart';
import type { Pokemon } from '../../types';
import { Button } from '../ui/Button'; // Ruta corregida
import { Plus, Minus, ShoppingCart } from 'lucide-react';

interface PokemonCardActionsProps {
  pokemon: Pokemon;
}

export function PokemonCardActions({ pokemon }: PokemonCardActionsProps) {
  const { items, handleAddToCart, handleIncrementQuantity, handleDecrementQuantity } = useCart();
  const itemInCart = items.find(item => item.id === pokemon.id);

  if (itemInCart) {
    return (
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" size="icon" className="h-9 w-9" onClick={(e) => { e.preventDefault(); handleDecrementQuantity(itemInCart.id); }}>
          <Minus className="h-4 w-4" />
        </Button>
        <span className="text-lg font-bold w-10 text-center">{itemInCart.quantity}</span>
        <Button variant="outline" size="icon" className="h-9 w-9" onClick={(e) => { e.preventDefault(); handleIncrementQuantity(itemInCart.id); }}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button className="w-full" onClick={(e) => { e.preventDefault(); handleAddToCart(pokemon); }}>
      <ShoppingCart className="mr-2 h-4 w-4" />
      Agregar al Carrito
    </Button>
  );
}