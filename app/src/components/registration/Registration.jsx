import {signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from 'firebase/auth'
import { useState } from 'react'
import {app} from "../../../firebase"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../firebase'
import "./Registration.css"

function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  //  const [loginError, setLoginError] = useState('');

    const provider = new GoogleAuthProvider()
    provider.addScope('profile');
    provider.addScope('email');

    const handleSignup = async(e) => {
        try {
            e.preventDefault();
            console.log(e)
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Sign up done")
            navigate("/join");
        } catch (error) {
            console.log(error)
        }
    }
    const handleLogin = async(e) => {
        try {
            e.preventDefault();
            console.log(e)
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Sign in done")
            navigate("/feed");
        } catch (error) {
            console.log(error.code)
        }
    }
    const handleGoogleLogin = async(e) => {
        try {
            e.preventDefault();
            console.log(e)
            await signInWithPopup(auth, provider)
            console.log("log in done")
            navigate("/feed");
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="registration-container">
            <img
            src="/logo.jpg"
            alt="Logo"
            className="top-image"
            />

            <div className="registration-box">
            <form className="registration-form" onSubmit={(e)=> e.preventDefault()}>
                <input 
                type = "text" 
                value = {email}
                onChange = {(e)=>setEmail(e.target.value)}
                placeholder = "email"
                />

                <input 
                type = "password" 
                value = {password}
                onChange = {(e)=>setPassword(e.target.value)}
                placeholder = "password"
                />
                <Link to="/canvas">
                    <button type = "submit" onClick = {handleLogin}> Log in </button>
                </Link>
            </form> <br/>
            <div className="extra-buttons">

            <button onClick={handleSignup} className="signup-btn"> Sign Up </button>

            <button onClick = {handleGoogleLogin} className="google-btn">Continue with Google</button>
            </div>
            </div>
        </div>

    
    )

}

export default Registration