import { useEffect, useState, type FormEvent, type ChangeEvent, useRef } from 'react';
import './App.css';
import { validationRules } from './utils/validations';

function App() {
  const [form, setForm] = useState({
    emailInput: '',
    passwordInput: '',
    confirmationPasswordInput: '',
  });

  const [error, setError] = useState({
    emailInput: '',
    passwordInput: '',
    confirmationPasswordInput: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmationPasswordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkFormValidity = () => {
      // --- CORRECCIÓN 2: Evaluar la propiedad '.valid' del resultado ---
      // Antes se evaluaba el objeto entero, que siempre es 'true'.
      const emailIsValid = validationRules.email(form.emailInput).valid;
      const passwordIsValid = validationRules.password(form.passwordInput).valid;
      const confirmationPasswordIsValid = validationRules.confirmPassword(
        form.passwordInput,
        form.confirmationPasswordInput
      ).valid;

      const allFieldsFilled =
        form.emailInput !== '' && form.passwordInput !== '' && form.confirmationPasswordInput !== '';

      setIsFormValid(emailIsValid && passwordIsValid && confirmationPasswordIsValid && allFieldsFilled);
    };

    checkFormValidity();
  }, [form]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Actualizamos el estado del formulario. La validación se hará con los valores más recientes.
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    // --- Lógica de validación revisada y simplificada ---
    if (name === 'emailInput') {
      const result = validationRules.email(value);
      setError(prev => ({ ...prev, emailInput: result.message }));
    } 
    else if (name === 'passwordInput') {
      const passwordResult = validationRules.password(value);
      const confirmationResult = validationRules.confirmPassword(value, updatedForm.confirmationPasswordInput);

      setError(prevError => ({
        ...prevError,
        passwordInput: passwordResult.message,
        confirmationPasswordInput: confirmationResult.message,
      }));
    } 
    else if (name === 'confirmationPasswordInput') {
      const result = validationRules.confirmPassword(updatedForm.passwordInput, value);
      setError(prev => ({ ...prev, confirmationPasswordInput: result.message }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitted(true);
      if (isFormValid) {
          console.log("Formulario enviado exitosamente:", form);
          // Aquí puedes añadir la lógica para enviar los datos a un servidor.
      } else {
          console.log("El formulario contiene errores y no puede ser enviado.");

          if(error.emailInput){
            emailInputRef.current?.focus();
          } else if(error.passwordInput){
            passwordInputRef.current?.focus();
          } else if(error.confirmationPasswordInput){
            confirmationPasswordInputRef.current?.focus();
          }
      }
  };

  return (
    <>
      {/* --- CORRECCIÓN 3: JSX completo y funcional --- */}
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="emailInput">Email: </label>
          <input
            type="email"
            id="emailInput"
            name="emailInput"
            value={form.emailInput}
            onChange={handleOnChange}
          />
          {error.emailInput && <p className="error-message">{error.emailInput}</p>}
        </div>
        <div>
          <label htmlFor="passwordInput">Password:</label>
          <input
            type="password"
            id="passwordInput"
            name="passwordInput"
            value={form.passwordInput}
            onChange={handleOnChange}
          />
          {error.passwordInput && <p className="error-message">{error.passwordInput}</p>}
        </div>
        <div>
          <label htmlFor="confirmationPasswordInput">Confirmation Password: </label>
          <input
            type="password"
            id="confirmationPasswordInput"
            name="confirmationPasswordInput"
            value={form.confirmationPasswordInput}
            onChange={handleOnChange}
          />
          {error.confirmationPasswordInput && <p className="error-message">{error.confirmationPasswordInput}</p>}
        </div>
        <button type="submit" disabled={!isFormValid}>
            Registrarse
        </button>
        {isSubmitted && !isFormValid && <p className="error-message">Por favor, corrige los errores para continuar.</p>}
      </form>
    </>
  );
}

export default App;