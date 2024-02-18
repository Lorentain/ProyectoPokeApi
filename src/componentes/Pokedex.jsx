import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

function Pokedex() {
    const [pokemonData, setPokemonData] = useState([]);
    const navigate = useNavigate();
    const [contador, setContador] = useState(9);
  
    function mostrarPokemons(url) {
      fetch(url)
        .then((respuesta) => respuesta.json())
        .then((pokemonMostrar) => {
          setPokemonData((prevData) => [...prevData, pokemonMostrar]);
        });
    }
  
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${contador}&offset=0`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        data.results.forEach((element) => {
          mostrarPokemons(element.url);
        });
        setContador((prevContador) => prevContador + 9);
        console.log(contador);
      } catch (error) {
        console.log(error.message);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const listaPokemonsImg = pokemonData.map((pokemon, index) => {
      return (
        <div key={index} className='contenedor-pokedex p-2' onClick={() => navigate(`/detalle/${pokemon.id}`)}>
          <img className='border border-4 border-dark' src={pokemon.sprites.other.showdown.front_default} alt={`Pokemon ${pokemon.id}`} />
        </div>
      );
    });
  
    const recargarPokemons = () => {
      fetchData();
    };
  
    return (
      <>
        <h1 className='text-center'>Pokedex</h1>
        <main className='d-flex justify-content-center align-items-center flex-column'>
          <div className='contenedor-pokedex d-flex justify-content-center align-items-center'>
            <ul className='d-flex flex-wrap'>{listaPokemonsImg}</ul>
          </div>
          <div>
            <button type="button" onClick={recargarPokemons} className='btn btn-dark mt-3 text-center'>Recargar Datos</button>
          </div>
        </main>
      </>
    );
}

export default Pokedex;
