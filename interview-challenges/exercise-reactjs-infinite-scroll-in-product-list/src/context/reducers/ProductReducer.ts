import type { Actions, ProductContextState } from "../../types/interfaces";

export function ProductReducer(state: ProductContextState, action: Actions){
    switch(action.type){
        case "SET_PRODUCTS": {
            return { ...state, products: action.payload }
        }
        case "ADD_PRODUCTS": {
            return { ...state, products: [ ...state.products, ...action.payload ] }
        }
        case "SET_FETCH": {
            const { status } = action.payload

            return { ...state, status: status}
        }
        case "SET_CAN_LOAD_MORE_PRODUCTS": {
            const { hasMore } = action.payload

            return {...state, hasMore}
        }
        default:
            return state
    }
}