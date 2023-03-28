// styles
import styles from "./Navbar.module.scss";

// react-router
import { NavLink, Outlet } from "react-router-dom";

// context
import { useAuth } from "../../context/AuthProvider";
import { useTheme } from "../../context/ThemeProvider";

// icons
import { MdDarkMode, MdLightMode } from "react-icons/md";

function Navbar() {
  const { auth, user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  console.log(theme);

  function signOutUser() {
    signOut();
  }

  return (
    <>
      <nav className={`${styles.nav} ${styles[theme]}`}>
        <NavLink className={`${styles.logo} ${styles[theme]}`} to="/">
          Supatask
        </NavLink>
        <div>
          <ul className={styles.ul}>
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
                <button onClick={signOutUser}>Log Out</button>
              ) : (
                <NavLink className={`${styles.link} ${styles[theme]}`} to="login">
                  Log In
                </NavLink>
              )}
            </li>
          </ul>
          <button
            className={`${styles.btn} ${styles[theme]}`}
            onClick={() => setTheme(theme == "light" ? "dark" : "light")}
          >
            {theme == "dark" ? <MdLightMode size={30} /> : <MdDarkMode size={30} />}
          </button>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
