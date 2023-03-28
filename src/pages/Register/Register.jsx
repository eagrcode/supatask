// react
import { useState } from "react";

// supabase client
import { supabase } from "../../supabaseClient";

// styles
import styles from "./Register.module.scss";

// context
import { useTheme } from "../../context/ThemeProvider";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { theme } = useTheme();

  async function signUpUser(e) {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      throw error;
    }
  }

  return (
    <>
      <main className={`${styles.main} ${styles[theme]}`}>
        <form className={styles.form} onSubmit={signUpUser}>
          <span className={styles.formHeader}>Create an account</span>
          <input
            type="text"
            value={firstName}
            name="first-name"
            onChange={(e) => setFirstName(e.target.value)}
            className={`${styles.input} ${styles[theme]}`}
            placeholder="First name"
          />
          <input
            type="text"
            value={lastName}
            name="last-name"
            onChange={(e) => setLastName(e.target.value)}
            className={`${styles.input} ${styles[theme]}`}
            placeholder="Last name"
          />
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className={`${styles.input} ${styles[theme]}`}
            placeholder="Email address"
          />
          <input
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className={`${styles.input} ${styles[theme]}`}
            placeholder="Password"
          />
          <button className={styles.button} type="submit">
            Submit
          </button>
        </form>
      </main>
    </>
  );
}

export default Register;
