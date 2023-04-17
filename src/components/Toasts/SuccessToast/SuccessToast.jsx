// styles
import styles from "./SuccessToast.module.scss";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

// context
import { useTheme } from "../../../context/ThemeProvider";

function SuccessToast({ isToast }) {
  const { theme } = useTheme();

  return (
    <div
      className={
        isToast
          ? `${styles.toast} ${styles[theme]} ${styles.show}`
          : `${styles.toast} ${styles[theme]}`
      }
    >
      <FontAwesomeIcon icon={faCheck} size="xl" color="green" />
      <div className={styles.text}>
        <p>Account updated</p>
      </div>
    </div>
  );
}

export default SuccessToast;
