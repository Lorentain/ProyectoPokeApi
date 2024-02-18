import React, { useState, useEffect } from 'react'; 
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../../firebase.conf";

import logo from '../assets/logo.png';

function Navegacion() {
    const [usuarioActivo, setUsuarioActivo] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsuarioActivo(user.email);
            } else {
                setUsuarioActivo("");
            }
        });

        return () => unsubscribe();
    }, []);

    function cerrarSesion() {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("Sesion cerrada con exito")
            setUsuarioActivo("");
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                    <Link className="nav-link text-dark fs-4 fw-bold" to="/"><img className='logoNav' src={logo}/></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
                                <li className="nav-item">
                                    <Link className="nav-link text-dark fs-4 fw-bold" to="/">Inicio</Link>
                                </li>
                                {usuarioActivo !== "" && (
                                    <li className="nav-item">
                                        <Link className="nav-link text-dark fs-4 fw-bold" to="/jugar">Jugar</Link>
                                   </li>
                                )}
                                <li className="nav-item">
                                <Link className="nav-link text-dark fs-4 fw-bold" to="/pokedex">Pokedex</Link>
                                </li>
                                {usuarioActivo === "" ? (
                                    <li className="nav-item">
                                        <Link className="nav-link text-dark fs-4 fw-bold" to="/login">Login</Link>
                                    </li>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link text-dark fs-4 fw-bold">{usuarioActivo}</a>
                                        </li>
                                        <button className='btn btn-danger' onClick={cerrarSesion}>Cerrar Sesión</button>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Navegacion;
