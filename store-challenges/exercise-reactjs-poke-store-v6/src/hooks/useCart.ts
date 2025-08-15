import { useMemo } from "react";
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart } from "../redux/actions/cartActions";
import type { Pokemon } from "../types";
import { useAppDispatch, useAppSelect } from "../redux/hooks";

export const useCart = () => {
    const dispatch = useAppDispatch();

    const items = useAppSelect( (state) => state.cart.items)

    const totalItems = useMemo(() => {
        return items.reduce((total, item) => {
            return total + item.quantity
        },0)
    }, [items])

    const totalPrice = useMemo(() => {
        return items.reduce((total, item) => {
            return total + (item.quantity * item.price)
        }, 0)
    }, [items])

    const handleAddToCart =  (pokemon: Pokemon) => {
        dispatch(addToCart(pokemon))
    }

    const handleRemoveFromCart = (pokemonId: string) => {
        dispatch(removeFromCart(pokemonId))
    }

    const handleIncrementQuantity = (pokemonId: string) => {
        dispatch(incrementQuantity(pokemonId))
    }

    const handleDecrementQuantity = (pokemonId: string) => {
        dispatch(decrementQuantity(pokemonId))
    }

    return {
        items,
        totalItems,
        totalPrice,
        handleAddToCart,
        handleRemoveFromCart,
        handleIncrementQuantity,
        handleDecrementQuantity
    }
}