import type { Actions, FormState } from "../../types/types";

export function formReducer(state: FormState, action: Actions){
    switch(action.type){
        case "NEXT_STEP": {
            return { ...state, currentStep: state.currentStep + 1 }
        }
        case "PREVIOUS_STEP": {
            return { ...state, currentStep: state.currentStep - 1 }
        }
        case "UPDATE_FORM_DATA": {
            const { name, value } = action.payload;
            return {
                ...state,
                formPost: {
                    ...state.formPost, // Mantenemos los valores anteriores de formPost
                    [name]: value,      // Y actualizamos solo el campo que cambió
                },
            };
        }
        case "UPDATE_FEEDBACK_TYPE": {
            return { ...state, feedbackType: action.payload.value }
        }
        case "SET_SPECIFIC_STEP": {
            return { ...state, currentStep: action.payload.step }
        }
        default:
            return state
    }
}