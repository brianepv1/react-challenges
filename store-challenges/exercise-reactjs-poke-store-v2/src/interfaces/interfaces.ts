// Creamos la interface de pokemon que estaremos reutilizando en todo la app, esto tiene base en al api graph ql
export interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
    weight: number;
    height: number;
}

// Por otro lado como estamos creando un carrito o una tienda 
// tambien tenemos que tener una interface que haga referencia a los items que se agregan al carro
export interface CartItem extends Pokemon {
    quantity: number;
}

