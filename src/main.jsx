import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Navegacion from './componentes/Navegacion.jsx'
import Login from './componentes/Login.jsx'
import Registrar from './componentes/Registrar.jsx'
import Detalle from './componentes/Detalle.jsx'
import Jugar from './componentes/Jugar.jsx'
import Pokedex from './componentes/Pokedex.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <>
    <Navegacion></Navegacion>
    <App></App>
    </>,
    errorElement: <h1>Ruta no válida</h1>
  },
  {
    path: "login",
    element: 
    <>
    <Navegacion></Navegacion>
    <Login></Login>
    </>,
  },
  {
    path: "registrar",
    element: 
    <>
    <Navegacion></Navegacion>
    <Registrar></Registrar>
    </>
  },
  
  {
    path: "detalle/:id", 
    element:
    <>
    <Navegacion></Navegacion>
    <Detalle></Detalle>
    </>,
  },
  {
    path: "jugar",
    element: 
    <>
    <Navegacion></Navegacion>
    <Jugar></Jugar>
    </>
  },
  {
    path: "pokedex",
    element:
    <>
    <Navegacion></Navegacion>
    <Pokedex></Pokedex>
    </>
  }
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
