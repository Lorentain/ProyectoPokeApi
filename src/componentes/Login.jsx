import React from "react";
import { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import auth from "../../firebase.conf";
import { Link } from "react-router-dom";


// Importar Imágenes
import logoGoogle from "../assets/google.png";
import logoGithub from "../assets/github.png";

function Login() {

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

    function loginGoogle() {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log("Login exitoso",user)
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage)
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    function loginUsuario(email,password) {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    function loginGithub() {
        const provider = new GithubAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);
            // ...
        });
    }

    
    function handleSubmit(event) {
        event.preventDefault(); // Evita que el formulario recargue la página
        loginUsuario(email, password);
    }

    return (
        <>
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <h1 className="text-center mb-4">Login</h1>
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
                        <Link className="nav-link text-dark fs-4 fw-bold text-center" to="/registrar">¿No tienes cuenta todavía?</Link>
                    </form>
                    <div className="d-flex justify-content-center">
                        <img className="logosLogin me-3" src={logoGoogle} alt="Google Logo" onClick={loginGoogle}/>
                        <img className="logosLogin" src={logoGithub} alt="GitHub Logo" onClick={loginGithub}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}

export default Login;