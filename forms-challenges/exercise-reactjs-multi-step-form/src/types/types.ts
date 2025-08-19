export interface FormPost {
    id: number
    title: string
}


export type FormState = {
    currentStep: number
    formPost:  FormObject
    feedbackType: string
}

export type FormObject = {
    title: string
    name: string,
    email: string
    textAreaForm: string
}

export type Actions = 
    | { type: "NEXT_STEP", payload: { currentStep: number }}
    | { type: "PREVIOUS_STEP", payload: { currentStep: number }}
    | { type: "UPDATE_FORM_DATA", payload: { name: string, value: string } }
    | { type: "UPDATE_FEEDBACK_TYPE", payload: { value: string } }
    | { type: "SET_SPECIFIC_STEP", payload: { step: number } }
    
export type FormContextType = {
    currentStep: number
    formData:  FormObject
    feedbackType: string
    nextStep: (id: number) => void
    previousStep: (id: number) => void
    updateFormData: (nameInput: string, value: string) => void
    updateFeedbackType: (value: string) => void
    setStep: (step: number) => void
}