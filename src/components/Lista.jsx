// quando a tela carregar, eu quero consumir uma API e mostrar os dados na tela
import { useEffect, useState } from "react"
import Axios from 'axios'

export const Lista = () => {
    const [pokemons, setPokemons] = useState([]);
    const [listaOculta, setListaOculta] = useState(false);
    const [statusDaLista, setStatusDaLista] = useState(
        "A lista de Pokemons está visível!"
    );
    //vamos ocultar a lista ao marcar o checkbox com useState
    //vamos mostrar um subtitulo com o status da lista com useEffect

    //atenção! useEffect é executado apenas uma vez ao entrar na aplicação
    
useEffect (() => {
    console.log('componente montado');
        async function pegaDados () {
        const resposta = await Axios.get('https://pokeapi.co/api/v2/pokemon')
        setPokemons(resposta.data.results)
    }
    pegaDados()

return () => {
    console.log("componente desmontado")
};
},[]);

useEffect(() => {
    if (listaOculta){
    setStatusDaLista("a lista de pokemons está oculta!");
    } else {
    setStatusDaLista("a lista de pokemons está visível!");
    }
//listaOculta   com TERNÁRIO MARAVILHOSO
// ?setStatusDaLista("a lista de pokemons está oculta!");
// :setStatusDaLista("a lista de pokemons está visível!");

}, [listaOculta]);

function ocultarLista() {
    setListaOculta((valor) => !valor);
}

return(
    <>
    <h1>pokemons</h1>
    <input type="checkbox" onChange={ocultarLista} />
    <label>ocultar lista</label>
    <br />
    <h2>{statusDaLista}</h2>
    <br />
    {listaOculta
    ? null
    : pokemons.map((pokemon) => {
        return <p key={pokemon.name}>{pokemon.name}</p>
    })}
    
    </>
)
}