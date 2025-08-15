
import { useState } from 'react';
import './App.css'
import useInputs from './hooks/useInputs'
import { checkValidation } from './utils/utils';

type Errors = {
   email: { valid: boolean; message: string; }; 
   name: { valid: boolean; message: string; }; 
   password: { valid: boolean; message: string; };
}

function App() {
  const name = useInputs();
  const email = useInputs();
  const password = useInputs();

  const [ error, setErrors ] = useState<Errors>({email: {valid: false, message: ''}, name: {valid: false, message: ''}, password: {valid: false, message: ''}});
  const [ form, setForm ] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validateInputName = checkValidation(name.value, 'text')
    const validateInputEmail = checkValidation(email.value, 'email')
    const validateInputPassword = checkValidation(password.value, 'password')

    console.log("validation ", validateInputName.valid,  validateInputEmail.valid, validateInputPassword.valid)
    if(validateInputName.valid == true && validateInputEmail.valid  == true && validateInputPassword.valid == true){
      setForm(true)
      return
    }

    setErrors({email: validateInputEmail, name: validateInputName, password: validateInputPassword})

    setForm(false)
    return
  }

  console.log("form ", form)
  return (
    <>
    <h1>Registration form</h1>
    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: 'column'}}>
      <div>
        <label htmlFor="inputName">Full name: </label>
        <input  name="inputName" type="text" value={name.value} onChange={(e) => name.handleInput(e)}/>
        {(error && error.name.valid == false) && <p style={{color: 'red'}}>{error.name.message}</p>}
      </div>
      <div>
        <label htmlFor="inputEmail">Email:  </label>
        <input  name="inputEmail" type="email" value={email.value} onChange={(e) => email.handleInput(e)}/>
        {(error && error.email.valid == false) && <p style={{color: 'red'}}>{error.email.message}</p>}
      </div>
      <div>
        <label htmlFor="inputPassword">Password: </label>
        <input name="inputPassword" type="password" value={password.value} onChange={(e) => password.handleInput(e)}/>
        {(error && error.password.valid == false) && <p style={{color: 'red'}}>{error.password.message}</p>}
      </div>

      <br />
      <button type='submit'>Register</button>
      <br />

      {form && <h3>Successfully registered with email: [user's email]</h3>}
    </form>
    </>
  )
}

export default App
