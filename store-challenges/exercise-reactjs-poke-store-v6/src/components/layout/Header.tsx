import { Link } from 'react-router-dom';

export function Header() {
  return (
    // La barra de fondo es 100% ancha.
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-sm">
      {/* `container` centra y limita el contenido DENTRO de la barra. Este es el uso correcto. */}
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          PokéStore
        </Link>
        <nav>
          <Link to="/" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
            Inicio
          </Link>
        </nav>
      </div>
    </header>
  );
}