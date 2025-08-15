import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { Button } from '../components/ui/Button'; // Ruta corregida
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card'; // Ruta corregida
import { CartContent } from '../components/cart/CartContent';

export default function CartPage() {
  const { totalPrice, totalItems } = useCart();

  if (totalItems === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Tu carrito está vacío</h1>
        <p className="text-muted-foreground mb-4">Aún no has añadido ningún Pokémon.</p>
        <Button asChild>
          <Link to="/">¡Vamos a atraparlos!</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Revisa tu Pedido</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Tus Pokémon ({totalItems})</CardTitle>
            </CardHeader>
            <CardContent>
              <CartContent />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1 lg:sticky lg:top-24">
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Envío</span>
                <span className="font-semibold text-green-600">Gratis</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild size="lg" className="w-full">
                <Link to="/checkout">Proceder al Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}