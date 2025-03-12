'use client' 
import { useState, useEffect } from "react"

function LoginForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");



    return (<div>
    <h1>Welcome to Los Polos Hermanos Family</h1>
    <button >Sign Up</button>
    <button>Log in</button>
    <button>Log in with google</button>
    </div>)
}