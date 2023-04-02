// react
import { useState } from "react";
import { Link } from "react-router-dom";

// supabase client
import { supabase } from "../../supabaseClient";

// styles
import styles from "./Register.module.scss";

// context
import { useTheme } from "../../context/ThemeProvider";

// icons
import { MdEmail, MdLock } from "react-icons/md";

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
        <h1 className={styles.h1}>Create a Supatask account</h1>
        <form className={styles.form} onSubmit={signUpUser}>
          <p>Sign up with your name, email and a password.</p>
          <div className={`${styles.inputRow} ${styles[theme]}`}>
            <input
              type="text"
              value={firstName}
              name="first-name"
              onChange={(e) => setFirstName(e.target.value)}
              className={`${styles.input} ${styles[theme]}`}
              placeholder="First name"
            />
          </div>
          <div className={`${styles.inputRow} ${styles[theme]}`}>
            <input
              type="text"
              value={lastName}
              name="last-name"
              onChange={(e) => setLastName(e.target.value)}
              className={`${styles.input} ${styles[theme]}`}
              placeholder="Last name"
            />
          </div>
          <div className={`${styles.inputRow} ${styles[theme]}`}>
            <MdEmail className={styles.icon} size={25} />
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.input} ${styles[theme]}`}
              placeholder="Email address"
            />
          </div>
          <div className={`${styles.inputRow} ${styles[theme]}`}>
            <MdLock className={styles.icon} size={25} />
            <input
              type="password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className={`${styles.input} ${styles[theme]}`}
              placeholder="Password"
            />
          </div>
          <button className={styles.button} type="submit">
            Submit
          </button>
          <p>
            Already have an account?{" "}
            <Link className={`${styles.link} ${styles[theme]}`} to="/login">
              Log in
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}

export default Register;
