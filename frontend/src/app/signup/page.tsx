'use client'
import styles from "@/app/style/signup.module.css";
import axios from "axios";
//NOTE: this is used for web2 functionalities
function SignupForm() {
    async function handleSubmit(e: any) {
        const formData = new FormData(e.target);
        let name = formData.get("name");
        let email = formData.get("email");
        let password = formData.get("password");
        try {
            const result = await axios.post("http://127.0.0.1:8000/inputUser", {
                "name": name,
                "email": email,
                "password": password
            }, {
                headers: {
                    "Content-Type":  "application/json",
                }
            });

            console.log("Data terkirim ke backend: ", result);
        }
        catch(err) {
            console.error("terjadi error ", err);
        }
    };

    return (
        <div className={styles.bungkusan}>
            <div className={styles.glasses}>
        <h2 className={styles.header}>Signup to web3 world</h2>
        <form method="POST" onSubmit={handleSubmit} className={styles.blanko}>
            <div>
            <label className={styles.head}>Name:</label>
            <input className={styles.value} type="text" name="name" /*onChange={change} */placeholder="name" required />
            </div>

            <div>
            <label className={styles.head}>Email:</label>
            <input className={styles.value} type="email" name="email" /*onChange={change} */placeholder="email" required />
            </div>

            <div>
            <label className={styles.head}>Password:</label>
            <input className={styles.value} type="password" name="password" /*onChange={change}*/ placeholder="password" required />
            </div>

            <button type="submit" className={styles.tombol}>Sign Up</button>
        </form>
        </div>
        </div>
    );
};

export default SignupForm;
