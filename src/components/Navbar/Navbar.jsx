// styles
import styles from "./Navbar.module.scss";

// react
import { useState } from "react";

// react-router
import { NavLink, Outlet } from "react-router-dom";

// context
import { useAuth } from "../../context/AuthProvider";
import { useTheme } from "../../context/ThemeProvider";

// components
import { Burger } from "../../components";

// icons
import { MdDarkMode, MdLightMode } from "react-icons/md";

function Navbar() {
  // state
  const [isOpen, setIsOpen] = useState(false);

  // context destructure
  const { auth, user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  // signs user out of app
  function signOutUser() {
    signOut();
  }

  return (
    <>
      <nav className={`${styles.nav} ${styles[theme]}`}>
        <NavLink className={`${styles.logo} ${styles[theme]}`} to="/">
          Supatask
        </NavLink>
        <Burger isOpen={isOpen} setIsOpen={setIsOpen} />

        <div
          className={isOpen ? `${styles.listBG} ${styles[theme]} ${styles.open}` : styles.listBG}
        >
          <ul className={isOpen ? `${styles.ul} ${styles[theme]} ${styles.open}` : styles.ul}>
            {user ? (
              <>
                <li className={styles.li}>
                  <NavLink className={`${styles.link} ${styles[theme]}`} to="todos">
                    Todos
                  </NavLink>
                </li>
                <li className={styles.li}>
                  <NavLink className={`${styles.link} ${styles[theme]}`} to="account">
                    Account
                  </NavLink>
                </li>
              </>
            ) : (
              <li className={styles.li}>
                <NavLink className={`${styles.link} ${styles[theme]}`} to="register">
                  Register
                </NavLink>
              </li>
            )}

            <li className={styles.li}>
              {user ? (
                <button className={styles.logoutBtn} onClick={signOutUser}>
                  Log Out
                </button>
              ) : (
                <NavLink className={`${styles.link} ${styles[theme]}`} to="login">
                  Log In
                </NavLink>
              )}
            </li>
            <button
              className={`${styles.btn} ${styles[theme]}`}
              onClick={() => setTheme(theme == "light" ? "dark" : "light")}
            >
              {theme == "dark" ? <MdLightMode size={30} /> : <MdDarkMode size={30} />}
            </button>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
