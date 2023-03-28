// styles
import styles from "./Login.module.scss";

// react
import { useState } from "react";

import { useNavigate } from "react-router";

// context
import { useAuth } from "../../context/AuthProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const { user } = useAuth();

  const navigate = useNavigate();

  async function signInUser(e) {
    e.preventDefault();
    try {
      const { data, error } = await login(email, password);
      console.log(data);
    } catch (error) {
      alert(error);
    }
    navigate("/");
  }

  return (
    <>
      <main className={styles.main}>
        <form className={styles.form} onSubmit={signInUser}>
          <span className={styles.formHeader}>Sign In</span>
          <input
            type="text"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="Enter your email"
          />
          <input
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="Enter your password"
          />
          <button className={styles.button} type="submit">
            Sign In
          </button>
        </form>
      </main>
    </>
  );
}

export default Login;
