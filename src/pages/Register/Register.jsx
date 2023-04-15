// react
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// supabase client
import { supabase } from "../../supabaseClient";

// styles
import styles from "./Register.module.scss";

// context
import { useTheme } from "../../context/ThemeProvider";

// icons
import { MdEmail, MdLock } from "react-icons/md";

// loading spinners
import PulseLoader from "react-spinners/PulseLoader";

function Register() {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(null);

  // theme context
  const { theme } = useTheme();

  const navigate = useNavigate();

  // delay data fetching
  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  // register new user
  async function signUpUser(e) {
    e.preventDefault();
    setIsLoading(true);
    await sleep(500);

    try {
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
        console.log(error);
      } else {
        navigate("/register-success");
      }
    } catch (error) {
      console.log(error.message);
    }

    setIsLoading(false);
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
              className={`${styles.input} ${styles.hasIcon} ${styles[theme]}`}
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
              className={`${styles.input} ${styles.hasIcon} ${styles[theme]}`}
              placeholder="Password"
            />
          </div>
          <button className={styles.button}>
            {isLoading ? <PulseLoader color="var(--primary-text-dark)" size={8} /> : "Submit"}
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
