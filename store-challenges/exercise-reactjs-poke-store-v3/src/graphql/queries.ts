import { gql } from "@apollo/client";

export const GET_ALL_POKEMON_DATA = gql`
    query GET_ALL_POKEMON_DATA {
        pokemons(limit: 20) {
            id
            name
            image
            types
            height
            weight
        }
    }
`