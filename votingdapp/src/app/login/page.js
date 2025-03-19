'use client'
import { useState } from "react";
import styles from "./login.module.css";

const SignupForm = () => {
    const [state, setCurrentState] = useState({name: "", email: "", password: ""})
    const change = (event) => {
        setCurrentState({...state, [event.target.name] : event.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", state.name, state.email, state.password);
    };

    return (
        <div className={styles.bungkusan}>
            <div className={styles.glasses}>
        <h2 className={styles.header}>Signup</h2>
        <form onSubmit={handleSubmit} className={styles.blanko}>
            <div>
            <label className={styles.head}>Name:</label>
            <input className={styles.value} type="text" name="name" onChange={change} placeholder="name" required />
            </div>

            <div>
            <label className={styles.head}>Email:</label>
            <input className={styles.value} type="email" name="email" onChange={change} placeholder="email" required />
            </div>

            <div>
            <label className={styles.head}>Password:</label>
            <input className={styles.value} type="password" name="password" onChange={change} placeholder="password" required />
            </div>

            <button type="submit" className={styles.tombol}>Sign Up</button>
        </form>
        </div>
        </div>
    );
};

export default SignupForm;
