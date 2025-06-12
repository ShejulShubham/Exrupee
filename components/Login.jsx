'use client'

import { useState } from "react";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistration, setIsRegistration] = useState(false);

    return (
        <div className="login">
            <h2>{isRegistration ? "Create an Account" : "Login"}</h2>
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" type="password" />
            <button >Submit</button>
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