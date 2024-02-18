import React from "react";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.conf";

import { Link } from "react-router-dom";

function Registrar() {

    let [usuarioActivo,setUsuarioActivo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          setUsuarioActivo(user.email);
          const uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }
      });

    function registrarUsuario(email,password) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

    function handleSubmit(event) {
        event.preventDefault(); // Evita que el formulario recargue la página
        registrarUsuario(email, password);
    }

    return (
        <>
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <h3 className="text-center mb-3">Registrar Usuario</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="d-grid mb-3">
                            <input type="submit" className="btn btn-primary" value="Enviar" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )

}

export default Registrar;