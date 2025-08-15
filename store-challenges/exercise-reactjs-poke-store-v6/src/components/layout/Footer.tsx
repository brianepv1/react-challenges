/**
 * Componente estático para el pie de página de la aplicación.
 * No utiliza ningún componente UI complejo, solo clases de Tailwind para el estilo.
 */
export function Footer() {
  return (
    <footer className="border-t mt-auto bg-background">
      <div className="container flex h-14 items-center justify-center">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} PokéStore. Una Demo con React, Redux y Shadcn/ui.
        </p>
      </div>
    </footer>
  );
}