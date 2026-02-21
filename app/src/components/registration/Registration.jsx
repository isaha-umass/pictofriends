import {signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import { useState } from 'react'
import {app} from "firebase"

function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  //  const [loginError, setLoginError] = useState('');

    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()
    provider.addScope('profile');
    provider.addScope('email');

    const handleSignup = async(e) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Sign up done")
        } catch (error) {
            console.log(error)
        }
    }
    const handleLogin = async(e) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Sign in done")
        } catch (error) {
            console.log(error.code)
        }
    }
    const handleGoogleLogin = async(e) => {
        try {
            await signInWithPopup(auth, provider)
            console.log("log in done")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form>
                <input type = "text" 
                value = {email}
                onChange = {(e)=>setEmail(e.target.value)}
                placeholder = "Enter your email..."
                />

                <input type = "password" 
                value = {password}
                onChange = {(e)=>setPassword(e.target.value)}
                placeholder = "Enter your password..."
                />

                <button type = "submit" onClick = {handleLogin}> Log in </button>
            </form>

            <button onClick={handleSignup}> Sign Up </button>

            <button onClick = {handleGoogleLogin}> Continue with Google </button>
        </div>
    )

}

export default Registration