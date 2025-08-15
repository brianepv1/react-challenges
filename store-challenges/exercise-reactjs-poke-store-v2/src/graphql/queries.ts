// Importamos qgl desde apollo client 
import { gql } from "@apollo/client";

// Creamos la query que vamos a utilizar para obtener los datos desde el servidor de graph ql

export const GET_ALL_POKEMONS = gql`
    query GetAllPokemonsData {
        pokemons(limit: 20) {
            id
            name
            image
            types
            height
            weight
        }
    }
`;