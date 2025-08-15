import { Link } from 'react-router-dom';
import type { Pokemon } from '../../types';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

interface PokemonCardProps {
  pokemon: Pokemon;
}

/**
 * La nueva tarjeta de producto, rediseñada desde cero para una UI/UX profesional.
 * Separa estructuralmente el enlace de detalles de las acciones del carrito.
 */
export function PokemonCard({ pokemon }: PokemonCardProps) {
  const { items, handleAddToCart, handleIncrementQuantity, handleDecrementQuantity } = useCart();
  const itemInCart = items.find(item => item.id === pokemon.id);

  return (
    // MEJORA: Un contenedor general con padding para el borde exterior.
    <Card className="group relative overflow-hidden rounded-2xl border-none shadow-md transition-all duration-300 hover:shadow-2xl">
      {/* SECCIÓN 1: EL ENLACE A DETALLES (Contenido Visual) */}
      <Link to={`/pokemon/${pokemon.id}`}>
        <div className="bg-slate-100 p-4">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="h-40 w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold capitalize text-slate-800">{pokemon.name}</h3>
          <p className="text-sm text-slate-500 capitalize">{pokemon.types.join(' / ')}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">${pokemon.price.toFixed(2)}</p>
        </CardContent>
      </Link>

      {/* SECCIÓN 2: LAS ACCIONES (Separadas del Enlace) */}
      {/* Esta sección es independiente y visualmente distinta. */}
      <div className="border-t border-slate-200 p-4">
        {!itemInCart ? (
          <Button
            variant="outline" // Un botón que no grita, pero es claramente un botón.
            className="w-full border-slate-400 text-slate-600 hover:bg-slate-800 hover:text-white"
            onClick={() => handleAddToCart(pokemon)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Agregar al Carrito
          </Button>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => handleDecrementQuantity(itemInCart.id)}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-lg font-bold w-10 text-center">{itemInCart.quantity}</span>
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => handleIncrementQuantity(itemInCart.id)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}