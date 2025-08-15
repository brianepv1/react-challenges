import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '../ui/Sheet';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { CartContent } from './CartContent';
import { Link } from 'react-router-dom';

/**
 * El botón de carrito flotante, ahora posicionado en la parte inferior central de la pantalla.
 */
export function FloatingCart() {
  const { totalItems, totalPrice } = useCart();

  // No mostramos el botón si el carrito está vacío para una UI más limpia.
  if (totalItems === 0) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* SOLUCIÓN AL POSICIONAMIENTO:
            - `bottom-5`: Anclado abajo.
            - `left-1/2 -translate-x-1/2`: Centrado horizontal perfecto.
        */}
        <Button
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <ShoppingCart className="mr-3 h-5 w-5" />
          <span className="font-semibold">Ver Carrito</span>
          <Badge variant="secondary" className="ml-3">
            {totalItems}
          </Badge>
        </Button>
      </SheetTrigger>
      {/* SOLUCIÓN A LA LEGIBILIDAD: El Sheet ahora es consistente con el tema claro. */}
      <SheetContent className="bg-white text-slate-900">
        <SheetHeader><SheetTitle>Tu Carrito</SheetTitle></SheetHeader>
        <div className="flex-1 overflow-y-auto py-4"><CartContent /></div>
        <SheetFooter className="border-t pt-4">
          <div className="w-full space-y-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span><span>${totalPrice.toFixed(2)}</span>
            </div>
            <Button asChild size="lg" className="w-full"><Link to="/cart">Ir a Pagar</Link></Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}