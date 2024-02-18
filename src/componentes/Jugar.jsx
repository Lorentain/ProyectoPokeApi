import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function Jugar() {
    const [tipoGanador,setTipoGanador] = useState("");
    const [numeroAleatorio, setNumeroAleatorio] = useState(null);
    const [pokemon,setPokemon] = useState({});
    const [numerosTipo,setNumerosTipo] = useState([]);
    const [todosTipos, setTodosTipos] = useState([]); // Array con todos los tipos de Pokemons
    const [opciones,setOpciones] = useState([]);
    const [hasGanadoState, setHasGanadoState] = useState(false);
    const [hasPerdidoState, setHasPerdidoState] = useState(false);

    const generarNumeroAleatorio = () => {
        const nuevoNumero = Math.floor(Math.random() * 100) + 1;
        setNumeroAleatorio(nuevoNumero);
    };

    const generarNumeroAleatorio20 = () => {
        return Math.floor(Math.random() * 20); 
    };
    

    useEffect(() => {
        generarNumeroAleatorio();
    }, []);

    useEffect(() => {
        if (numeroAleatorio !== null) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const data = await response.json();
                    data.types.forEach(element => {
                        setTipoGanador(element.type.name)
                    });
                    setPokemon(data);
                } catch (error) {
                    console.log(error.message);
                }
            };
            fetchData();
        }
    }, [numeroAleatorio]);

    async function obtenerTiposPokemon() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/type');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setTodosTipos(data.results);
            console.log(data.results); 
        } catch (error) {
            console.log(error.message);
            return [];
        }
    }

    
  let pokemonImg = null;
  if(pokemon.sprites) {
    pokemonImg = (
      <img className="jugarPokemonImg img-fluid" src={pokemon.sprites.other.dream_world.front_default} />
    );
  }

    const generarTresNumerosAleatorios20 = () => {
        const numerosGenerados = [];
        while (numerosGenerados.length < 3) {
            const nuevoNumero = generarNumeroAleatorio20();
            if (!numerosGenerados.includes(nuevoNumero)) {
                numerosGenerados.push(nuevoNumero);
            }
        }
        setNumerosTipo(numerosGenerados);
    };

    useEffect(() => {
        generarTresNumerosAleatorios20();
    }, []);

    useEffect(() => {
            console.log(numerosTipo)
    }, [numerosTipo]);

    useEffect(() => {
        obtenerTiposPokemon();
    }, []);

    useEffect(() => {
        if (tipoGanador) {
            console.log("El tipo ganador es:", tipoGanador);
        }
    }, [tipoGanador]);

    useEffect(() => {
        if (todosTipos.length > 0 && numerosTipo.length > 0) {
            const tiposSeleccionados = [];
            
            while (tiposSeleccionados.length < 3) { // Permitir tres tipos aleatorios
                const index = Math.floor(Math.random() * todosTipos.length);
                const tipo = todosTipos[index].name;
                if (!tiposSeleccionados.includes(tipo) && tipo !== tipoGanador) {
                    tiposSeleccionados.push(tipo);
                }
            }
            
            tiposSeleccionados.push(tipoGanador); // Agregar el tipo ganador
            setOpciones(tiposSeleccionados);
        }
    }, [todosTipos, numerosTipo, tipoGanador]);

    function hasGanado() {
        setHasGanadoState(true);
    }

    function hasPerdido() {
        setHasPerdidoState(true);
    }

    function resetGame() {
        setHasGanadoState(false);
        setHasPerdidoState(false);
        generarNumeroAleatorio();
    }

    let mostrarOpciones = null;
    if (opciones) {
      // Copia el array opciones
      const opcionesAleatorias = [...opciones];
      
      // Implementación del algoritmo Fisher-Yates Shuffle
      for (let i = opcionesAleatorias.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opcionesAleatorias[i], opcionesAleatorias[j]] = [opcionesAleatorias[j], opcionesAleatorias[i]];
      }
      
      mostrarOpciones = opcionesAleatorias.map((opcion, index) => (
        opcion === tipoGanador ? (
          <button className="btn-opciones btn btn-primary me-2 mb-2" key={index} onClick={hasGanado}>{opcion}</button>
        ) : (
          <button className="btn-opciones btn btn-primary me-2 mb-2" key={index} onClick={hasPerdido}>{opcion}</button>
        )
      ));
    }
    

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center flex-column">
                <h1 className="text-center mb-4">Adivina el tipo Pokemon</h1>
                <h3 className="fs-1 fw-bold">{pokemon.name}</h3>
                {pokemonImg}
                {hasGanadoState ? (
                    <p className="mt-4 text-success fw-bold fs-3 bg-dark p-3">¡HAS GANADO!</p>
                ) : hasPerdidoState ? (
                    <p className="mt-4 text-danger fw-bold fs-3 bg-dark p-3">¡HAS PERDIDO!</p>
                ) : (
                    <>
                        <h4 className="mt-4">Opciones:</h4>
                        <div className="d-flex flex-wrap">
                            {mostrarOpciones}
                        </div>
                    </>
                )}
                <button className="btn btn-success mt-3 mb-3" onClick={resetGame}>Volver a Jugar</button>
            </div>
        </>
    )
}

export default Jugar;