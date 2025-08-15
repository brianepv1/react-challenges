import { useCart } from '../../hooks/useCart';
import { Button } from '../ui/Button'; // Ruta corregida
import { X, Plus, Minus } from 'lucide-react';

export function CartContent() {
  const { items, handleIncrementQuantity, handleDecrementQuantity, handleRemoveFromCart } = useCart();

  if (items.length === 0) {
    return <p className="text-center text-muted-foreground py-8">Tu carrito está vacío.</p>;
  }

  return (
    <div className="flex flex-col divide-y">
      {items.map(item => (
        <div key={item.id} className="flex items-center gap-4 py-4">
          <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-md border p-1" />
          <div className="flex-grow">
            <p className="font-semibold capitalize">{item.name}</p>
            <div className="flex items-center gap-2 mt-2">
              <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleDecrementQuantity(item.id)}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-6 text-center font-medium">{item.quantity}</span>
              <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleIncrementQuantity(item.id)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => handleRemoveFromCart(item.id)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}