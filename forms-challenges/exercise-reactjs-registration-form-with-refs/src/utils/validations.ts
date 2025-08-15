
// --- CORRECCIÓN 1: Consistencia en las reglas de validación ---
// Todas las funciones ahora devuelven un objeto con 'valid' (boolean) y 'message' (string).
// Esto elimina el error "string | undefined" que es la causa principal del problema.
export const validationRules = {
    email: (email: string) =>
      /\S+@\S+\.\S+/.test(email)
        ? { valid: true, message: '' }
        : { valid: false, message: 'Por favor, introduce un email válido.' },
    password: (password: string) =>
      password.length >= 8
        ? { valid: true, message: '' }
        : { valid: false, message: 'La contraseña debe tener al menos 8 caracteres.' },
    confirmPassword: (password: string, confirmation: string) =>
      password === confirmation
        ? { valid: true, message: '' }
        : { valid: false, message: 'Las contraseñas no coinciden.' },
  };
  