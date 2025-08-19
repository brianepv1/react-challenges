import { useState } from "react";
import { useFormContext } from "../context/FormContext"
import { validations } from "../utils/validations";

export default function Step1(){
    const { currentStep, nextStep, updateFormData } = useFormContext();

    const [ form, setForm ] = useState({
        name: '',
        email: '',
        title: ''
    })

    const [ errors, setErrors ] = useState({
        name: '',
        email: '',
        title: ''
    })

    const validateInput = (name: string, value: string) => {
        if(name === "name"){
            const result = validations.name(value);
            setErrors((prevErrors) => {
                return {...prevErrors, name: result.msg}
            })
        }else if(name === "email"){
            const result = validations.email(value);
            setErrors((prevErrors) => {
                return {...prevErrors, email: result.msg}
            })

        }else if(name === 'title'){
            const result = validations.title(value);
            setErrors((prevErrors) => {
                return {...prevErrors, title: result.msg}
            })
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;

        setForm((prevState) => {
            return {...prevState, [name]: value}
        })
        validateInput(name, value)
    }


    const isValid = !errors.name && !errors.email && !errors.title;
    console.log("IsValid", isValid)


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if(isValid && form.name.trim() !== '' && form.email.trim() !== '' && form.title.trim() !== ''){
            updateFormData("name", form.name)
            updateFormData("email", form.email)
            updateFormData("title", form.title)
            nextStep(currentStep);
        }
        

    }


    return <div className="step1_contact_information_container">
        <h2>Contact information</h2>
        <form onSubmit={handleSubmit}>
            <div className="step1_form_name">
                <label htmlFor="name">
                    Full Name:
                </label>
                <input type="text" name="name" onChange={handleChange} value={form.name}/>
                { errors.name && <p  style={{color: 'red', fontWeight: 'bold'}} >{ errors.name}</p>}
            </div>
            <div className="step1_form_email">
                <label htmlFor="email">
                    Email:
                </label>
                <input type="email"  name="email" onChange={handleChange} value={form.email}/>
                { errors.email && <p  style={{color: 'red', fontWeight: 'bold'}} >{ errors.email}</p>}
            </div>
            <div className="step1_form_title">
                <label htmlFor="title">
                    Title:
                </label>
                <input type="text"  name="title" onChange={handleChange} value={form.title}/>
                { errors.title && <p  style={{color: 'red', fontWeight: 'bold'}} >{ errors.title}</p>}
            </div>
            <button type="submit">Next step</button>

            { !isValid && <p style={{color: 'red', fontWeight: 'bold'}}>Please review your data before the submit</p>}
        </form>
    </div>
}