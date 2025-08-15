export const checkValidation = (value: string, type: string): { valid: boolean, message: string} => {
    const validInput = { valid: true, message: 'Valid'}


    if(type === 'email'){
        const regex = /^\S+@\S+\.\S+$/;

        if(!regex.test(value)){
            return { valid: false, message: 'Email is not valid'}
        }

        return validInput
    }

    if(type === 'password'){
        console.log("value ", value )
        if(value.length < 8){
            return { valid: false, message: 'Minimun password length should be 8'}
        }

        return validInput

    }

    if(type === 'text'){
        if(value.length < 3){
            return { valid: false, message: 'Minimun password length should be 8'}
        }

        return validInput
    }

    return { valid: false, message: `No validation for this input type`}
}