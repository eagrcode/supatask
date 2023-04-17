// styles
import styles from "./Login.module.scss";

// react
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// context
import { useAuth } from "../../context/AuthProvider";
import { useTheme } from "../../context/ThemeProvider";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

// loading spinners
import PulseLoader from "react-spinners/PulseLoader";

function Login() {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // destructure context
  const { login } = useAuth();
  const { theme } = useTheme();

  const navigate = useNavigate();

  // delay function
  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  // sign in user
  async function signInUser(e) {
    e.preventDefault();
    setIsLoading(true);
    await sleep(500);

    try {
      const { data, error } = await login(email, password);
      console.log(data);
      if (error) {
        console.log(error);
        setErrorMessage("Invalid log in credentials");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }

    setIsLoading(false);
  }

  return (
    <>
      <div className={`${styles.main} ${styles[theme]}`}>
        <h1 className={styles.h1}>Log in to Supatask</h1>
        <form className={styles.form} onSubmit={signInUser}>
          <p>Enter your email address and password.</p>
          <div className={`${styles.inputRow} ${styles[theme]}`}>
            <FontAwesomeIcon className={styles.icon} icon={faEnvelope} size="xl" />
            <input
              type="text"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.input} ${styles[theme]}`}
              placeholder="Email"
              required
            />
          </div>
          <div className={`${styles.inputRow} ${styles[theme]}`}>
            <FontAwesomeIcon className={styles.icon} icon={faLock} size="xl" />
            <input
              type="password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className={`${styles.input} ${styles[theme]}`}
              placeholder="Password"
              required
            />
          </div>
          <button className={styles.button} type="submit">
            {isLoading ? <PulseLoader color="var(--primary-text-dark)" size={8} /> : "Log in"}
          </button>
          <p>
            Don't have an account yet?{" "}
            <Link className={`${styles.link} ${styles[theme]}`} to="/register">
              Sign up
            </Link>
          </p>
          <p className={styles.error} style={{ color: "red" }}>
            {errorMessage}
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
