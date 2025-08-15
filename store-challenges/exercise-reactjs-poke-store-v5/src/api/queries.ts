import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "./apolloClient";
import { gql } from "@apollo/client";

export const fetchPokemons = createAsyncThunk('pokemons/fetchPokemons', async () => {
    const { data } = await client.query({
        query: gql`
            query MiPrimeraConsultaDePokemons {
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
    });

    console.log(data.pokemons)
    return data.pokemons
})