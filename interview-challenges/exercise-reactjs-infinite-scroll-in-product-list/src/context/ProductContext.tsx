import { createContext, useContext, type ReactNode, useReducer, useCallback, useEffect } from "react";
import type { ProductContextState, ProductContextType, Products, fetchStatus } from "../types/interfaces";
import { ProductReducer } from "./reducers/ProductReducer";
import { getAllProductsWithLimitAndSkip } from "../services/productsService";

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({children}: { children: ReactNode }){

    const initalState: ProductContextState = {
        products: [],
        status: "idle",
        hasMore: true
    }

    const [ state, dispatch ] = useReducer(ProductReducer, initalState);

    const setProducts = useCallback((products: Products) => {
        dispatch({ type: "SET_PRODUCTS", payload: products })
    }, [])

    const setFetchStatus = useCallback((status: fetchStatus) => {
        dispatch({ type: "SET_FETCH", payload: { status }})
    }, [])

    const setHasMore = useCallback((hasMore: boolean) => {
        dispatch( {type: "SET_CAN_LOAD_MORE_PRODUCTS", payload: { hasMore}})
    }, [])

    const addProducts = useCallback((products: Products) => {
        dispatch( { type: "ADD_PRODUCTS", payload: products})
    }, [])

    useEffect(() => {
        const getInitialProducts = async () => {
            setFetchStatus("loading")

            try{
                const productsResponse = await getAllProductsWithLimitAndSkip(10,10);
                console.log("Products data ", productsResponse?.products)

                if(productsResponse && productsResponse.products){
                    setProducts(productsResponse?.products);
                    setFetchStatus("success");


                    const currentTotal = productsResponse.products.length;

                    if (currentTotal >= productsResponse.total) {
                        setHasMore(false);
                    }else{
                        setHasMore(true)
                    }
                }else{
                    throw new Error("No products data received");
                }

            }catch(error){
                console.error(error);
                setFetchStatus("error")
            }
        }

        getInitialProducts();
    }, [setFetchStatus, setProducts, setHasMore]);


    const loadMoreProducts = useCallback( async () => {
        if(state.status === 'loading' || !state.hasMore){
            return;
        }

        setFetchStatus('loading');
        try{
            const skip = state.products.length;
            const moreProductsResponse = await getAllProductsWithLimitAndSkip(10, skip);

            if(moreProductsResponse && moreProductsResponse?.products.length > 0){
                addProducts(moreProductsResponse.products);
                setFetchStatus("success");

                const newTotalInState = state.products.length + moreProductsResponse.products.length;
                if(newTotalInState >= moreProductsResponse.total){
                    setHasMore(false);
                }
            }else{
                setHasMore(false);
                setFetchStatus("success");
            }
        }catch(error){
            console.log(error);
            setFetchStatus("success");
        }
    }, [state.status, state.hasMore, state.products.length, addProducts, setFetchStatus, setHasMore])

    const value = {
        ...state,
        setProducts,
        setFetchStatus,
        setHasMore,
        loadMoreProducts,
        addProducts
    }

    return <ProductContext.Provider value={value}>
        {children}
    </ProductContext.Provider>


}

export function useProduct(){
    const context = useContext(ProductContext)
    if(context === undefined){
        throw new Error(`useProduct hook should be used inside the provider`)
    }

    return context
}