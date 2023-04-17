// styles
import styles from "./Burger.module.scss";

// context
import { useTheme } from "../../context/ThemeProvider";

function Burger({ isOpen, setIsOpen }) {
  const { theme } = useTheme();

  return (
    <button
      aria-label="menu"
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={styles.btn}
    >
      <div className={isOpen ? `${styles.burger} ${styles.active}` : styles.burger}>
        <div className={`${styles.bar} ${styles[theme]}`}></div>
        <div className={`${styles.bar} ${styles[theme]}`}></div>
        <div className={`${styles.bar} ${styles[theme]}`}></div>
      </div>
    </button>
  );
}

export default Burger;
