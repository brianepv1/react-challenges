import { createContext, useReducer, type ReactNode, useCallback, useContext } from "react";
import type { FormContextType, FormState } from "../types/types";
import { formReducer } from "./reducer/formReducer";

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({children}: {children: ReactNode}){
    
    const initState: FormState = {
        currentStep: 1,
        formPost: {
            title: '',
            name: '',
            email: '',
            textAreaForm: ''
        },
        feedbackType: ''
    }

    const [ state, dispatch ] = useReducer(formReducer, initState)

    const nextStep = useCallback((currentStep: number) => {
        dispatch({ type: "NEXT_STEP", payload: {currentStep: currentStep}})
    }, [])

    const previousStep = useCallback((currentStep: number) => {
        dispatch({ type: "PREVIOUS_STEP", payload: {currentStep: currentStep}})
    }, [])

    const updateFormData = useCallback((name: string, value: string) => {
        dispatch( {type: "UPDATE_FORM_DATA", payload: { name: name, value: value}})
    }, [])

    const updateFeedbackType = useCallback((value: string) => {
        dispatch( {type: "UPDATE_FEEDBACK_TYPE", payload: { value: value }})
    }, [])

    const setStep = useCallback((step: number) => {
        dispatch( {type: "SET_SPECIFIC_STEP", payload: { step: step }})
    }, [])

    const value = {
        currentStep: state.currentStep,
        formData:  state.formPost,
        feedbackType: state.feedbackType,
        nextStep,
        previousStep,
        updateFormData,
        updateFeedbackType,
        setStep
    }

    return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export function useFormContext(){
    const context = useContext(FormContext)
    if(context === undefined){
        throw new Error(`useFormContext should be used inside a FormProvider`)
    }
    return context
}