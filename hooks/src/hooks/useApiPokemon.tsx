import  { useEffect, useState } from 'react'


interface Pokemon {
    id: number;
    name: string;
    imageUrl: string;
}




export const useApiPokemon = (id: number) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [isLoading, setisLoading] = useState(true)


    const getElementPokemon = async (id: number) => {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await res.json();

            setPokemon({
                id: data.id,
                name: data.name,
                imageUrl: data.sprites.front_default
            });
        } catch (error) {
            console.error(error);
        }
        setisLoading(false);
    };


    useEffect(() => {
        getElementPokemon(id);
    }, [id]);

    return {
        pokemon,
        isLoading
    };
};
