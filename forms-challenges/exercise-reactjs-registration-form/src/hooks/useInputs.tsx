import { useState } from "react";

function useInputs(){
    const [ value, setValue ] =  useState('');

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const value = e.target.value;
        
        if(value === undefined || value.length === 0 || value === null){
            return null
        }
        
        setValue(value);
    }

    return { value, setValue, handleInput}
}

export default useInputs