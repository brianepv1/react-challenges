import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Esta función es una combinación de dos utilidades:
 * 1. `clsx`: Permite construir strings de clases de forma condicional.
 *    Por ejemplo: clsx('base-class', { 'active-class': isActive })
 * 2. `twMerge`: Fusiona inteligentemente las clases de Tailwind.
 *    Por ejemplo, si recibe 'px-2 py-2' y 'p-4', el resultado final será 'p-4',
 *    eliminando las clases conflictivas anteriores.
 * Es la base para la estilización dinámica en todos los componentes de Shadcn.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}