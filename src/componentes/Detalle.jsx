import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Detalle() {
  const { id } = useParams();

  const [pokemonDetalle,setPokemonDetalle] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data)
        setPokemonDetalle(data);
      } catch (error) {
        console.log(error.message)
      }
    };

    fetchData();
  }, [id]);

  let nombresEstadisticas = null;
    if(pokemonDetalle.stats) {
      nombresEstadisticas = pokemonDetalle.stats.map((pokemon) => 
      <li>{pokemon.stat.name} - {pokemon.base_stat}</li>
    ); 
  }

  let detallePokemonsImg = null;
  if(pokemonDetalle.sprites) {
    detallePokemonsImg = (
      <img src={pokemonDetalle.sprites.other.dream_world.front_default} />
    );
  }



  return (
    <section className='container-fluid d-flex justify-content-center align-items-center flex-column'>
        <h1>{pokemonDetalle.name}</h1>
        <p className='fs-3'>Número pokedex: {pokemonDetalle.id}</p>
        {detallePokemonsImg}
        <p className='fs-4'><span className='fw-bold'>Stats:</span>
          <ul className='listaStats'>{nombresEstadisticas}</ul> 
        </p>
    </section>
  );

}
// sprites.other.dream_world.front_default

export default Detalle;
