import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from '../hooks/useCart';
import { Button } from '../components/ui/Button'; // Ruta corregida
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'; // Ruta corregida
import { Input } from '../components/ui/Input'; // Ruta corregida

export default function CheckoutPage() {
  const { totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (totalItems === 0) {
      navigate('/cart', { replace: true });
    }
  }, [totalItems, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`¡Pago simulado exitoso! Gracias por tu compra de $${totalPrice.toFixed(2)}.`);
    navigate('/');
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Finalizar Compra</CardTitle>
          <CardDescription>Completa tus datos para realizar el pedido.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre Completo</label>
              <Input id="name" type="text" placeholder="Ash Ketchum" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Correo Electrónico</label>
              <Input id="email" type="email" placeholder="ash@pueblopaleta.com" required />
            </div>
            <div className="pt-4">
               <div className="text-2xl font-bold text-right mb-4">
                  Total a Pagar: ${totalPrice.toFixed(2)}
               </div>
               <Button type="submit" size="lg" className="w-full">
                 Pagar Ahora
               </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}