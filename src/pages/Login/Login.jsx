// styles
import styles from "./Login.module.scss";

// react
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// context
import { useAuth } from "../../context/AuthProvider";
import { useTheme } from "../../context/ThemeProvider";

// icons
import { MdEmail, MdLock } from "react-icons/md";

function Login() {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // destructure context
  const { login } = useAuth();
  const { theme } = useTheme();

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
      <main className={`${styles.main} ${styles[theme]}`}>
        <h1 className={styles.h1}>Log in to Supatask</h1>
        <form className={styles.form} onSubmit={signInUser}>
          <p>Enter your email address and password.</p>
          <div className={`${styles.inputRow} ${styles[theme]}`}>
            <MdEmail size={25} />
            <input
              type="text"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.input} ${styles[theme]}`}
              placeholder="Email"
            />
          </div>
          <div className={`${styles.inputRow} ${styles[theme]}`}>
            <MdLock size={25} />
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
            Log in
          </button>
          <p>
            Don't have an account yet?{" "}
            <Link className={`${styles.link} ${styles[theme]}`} to="/register">
              Sign up
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}

export default Login;
