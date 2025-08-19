import { useState } from "react"
import { useFormContext } from "../context/FormContext";

export default function Step3(){
    const { feedbackType, updateFormData, nextStep, currentStep } = useFormContext();
    const [ error, setError ] = useState('')
    const [ textAreaForm, setTextAreaForm ] = useState('')


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
         if((feedbackType === "featureRequest" || feedbackType === "bugReport")){
                if(textAreaForm !== ''){
                    updateFormData("textAreaForm", textAreaForm)
                    nextStep(currentStep)
                }else{
                    setError('Please add details on the input')
                }
                
            }else{
                nextStep(currentStep)
            }
    }
    return <>
    <h2>Details</h2>
    <form onSubmit={handleSubmit}>
        <div className="step2_conditional_input">
            {feedbackType === "bugReport" && <>
                <label htmlFor="">Steps to reproduce:</label>
                <input type="textarea" id="bugReportArea" name="bugReportArea" value={textAreaForm} onChange={(e) => setTextAreaForm(e.target.value) }></input>
            </>} 

            {feedbackType === "featureRequest" && <>
                <label htmlFor="">Feature Description:</label>
                <input type="textarea" id="featureRequestArea" name="featureRequestArea" value={textAreaForm} onChange={(e) => setTextAreaForm(e.target.value)}></input>
            </>} 

            <button type="submit">Next Step</button>
            <button type="submit">Prev Step</button>

            { error && <p style={{color: 'red', fontWeight: 'bold'}}>{error}</p>}

        </div>
    </form>

    </>
}