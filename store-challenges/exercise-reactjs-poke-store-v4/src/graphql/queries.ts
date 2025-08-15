import { gql } from "@apollo/client";

export const GET_ALL_POKEMONS = gql`
    query GET_ALL_POKEMONS {
        pokemons(limit: 20) {
            id
            image
            name
            types
            weight
            height
        }
    }
`