'use client'

import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Login() {

    const parameters = useSearchParams();

    const isRegisterParameter = parameters.get('register');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistration, setIsRegistration] = useState(isRegisterParameter);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const { signup, login } = useAuth();

    async function handleAuthenticate() {
        if (!email || !email.includes('@') || password.length < 6 || isAuthenticating) { return }

        setErrorMessage(null);
        setIsAuthenticating(true);

        try {
            if (isRegistration) {
                await signup(email, password);

            } else {
                await login(email, password);
            }

        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message);
        } finally {
            setIsAuthenticating(false);
        }

    }

    return (
        <div className="login">
            <h2>{isRegistration ? "Create an Account" : "Login"}</h2>
            {errorMessage && <div><p>❌ {errorMessage}</p></div>}
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" type="password" />
            <button onClick={handleAuthenticate} disabled={isAuthenticating}>{isAuthenticating ? "Submitting..." : "Submit"}
            </button>
            <div className="full-line" />
            <div>
                <p>{isRegistration ? 'Already have an Account?' : 'Don\'t have an account?'}</p>
                <button onClick={() => {
                    setIsRegistration(!isRegistration)
                }}>{isRegistration ? "Log In" : "Sign Up"}</button>
            </div>
        </div>
    )
}