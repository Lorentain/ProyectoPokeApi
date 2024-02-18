import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import css3 from './assets/css-3.png';
import html5 from './assets/html-5.png'
import reactjs from './assets/react.png'
import firebase from './assets/firebase.png'

function App() {
  return(
    <>
    <div className="container main-hero">
      <h1 className="text-center mt-5 fw-bold">Creado por Lorenzo Herrero</h1>

      <p className="mt-4 fs-5">Web creada usando la API llamada PokeApi: <a className='text-decoration-none' target='_blank' href='https://pokeapi.co/'>Ver Aquí</a></p>

      <p className="mt-4 fs-5">Los lenguajes de programación usados han sido:</p>
      <div className="d-flex mt-3">
        <img src={css3} className="inicioImg me-3"/>
        <img src={html5} className="inicioImg me-3"/>
        <img src={reactjs} className="inicioImg me-3"/>
      </div>

      <p className="mt-4 fs-5">El hosting usado es:</p>
      <img src={firebase} className="inicioImg mt-3"/>
    </div>
    </>
  )
}

export default App;
