import { gql } from "@apollo/client";

export const GET_ALL_POKEMONS = gql`
    query GET_POKEMONS {
        pokemons(limit: 20){
            id
            name
            image
            types
            weight
            height
            price
        }
    }
`