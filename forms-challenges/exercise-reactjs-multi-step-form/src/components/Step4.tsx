import { useMemo, useState } from "react"
import { useFormContext } from "../context/FormContext"

export default function Step4(){
    const { formData, feedbackType, previousStep, currentStep } = useFormContext()
    const [ submitted, setSubmitted ] = useState({
        status: false,
        msg: ''
    })

    const handleSendData = useMemo(() => {
        if(formData.name  !== '' && formData.email  !== '' && formData.title  !== '' && formData.textAreaForm  !== '' && feedbackType !== ''){
            setSubmitted({ status: true, msg: "Thank you for your feedback"})
        }else{
            setSubmitted({ status: false, msg: "Please review all your information before submit"})
        }
    }, [])

    const msgStyle = submitted.status ? { color: 'green', fontWeight: 'bold' } : { color: 'red', fontWeight: 'bold'}

    return <>
        <h2>Review your submission</h2>
        <div>
            <p>Full Name: {formData.name}</p>
            <p>Email: {formData.email}</p>
            <p>Title of: {formData.title}</p>
            <p>Feedback type: {feedbackType}</p>
            {feedbackType === "bugReport" && <>
                <p>Bug Report: {formData.textAreaForm}</p>
            </>} 

            {feedbackType === "featureRequest" && <>
                <p>Feature Request: {formData.textAreaForm}</p>
            </>}
        </div>
        <button onClick={() => handleSendData}>Submit</button>
        <button onClick={() => previousStep(currentStep)}>Prev Step</button>

        {submitted.status && <p style={msgStyle}>{submitted.msg}</p>}
    </>
}