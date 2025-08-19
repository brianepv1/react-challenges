import { useState } from "react"
import { useFormContext } from "../context/FormContext";

export default function Step2(){
    const { updateFeedbackType, nextStep, currentStep, setStep } = useFormContext()
    const [ radioState, setRadioState ] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadioState(e.currentTarget.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(radioState !== ''){
            if(radioState === "featureRequest" || radioState === "bugReport"){
                updateFeedbackType(radioState);
                nextStep(currentStep);    
            }else{
                updateFeedbackType(radioState);
                setStep(4);
            }
        }
    }



    return <div className="step2_feedback_type">
        <h2>Feedback Type</h2>
        <form onSubmit={handleSubmit}>
            <div className="step2_radio_group">
                <label htmlFor="">Bug Report</label>
                <input type="radio" id="bugReport" name="feedbackType" checked={"bugReport" === radioState} onChange={handleChange} value={'bugReport'} />
            </div>
            <div className="step2_radio_group">
                <label htmlFor="">Feature Request</label>
                <input type="radio" id="featureRequest" name="feedbackType" checked={"featureRequest" === radioState} onChange={handleChange}  value={'featureRequest'}/>
            </div>
            <div className="step2_radio_group">
                <label htmlFor="">General Praise</label>
                <input type="radio" id="generalPraise" name="feedbackType" checked={"generalPraise" === radioState} onChange={handleChange}  value={'generalPraise'}/>
            </div>


            <button type="submit">Next Step</button>
            <button type="button">Prev Step</button>


        </form>
    </div>
}