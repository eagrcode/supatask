// styles
import styles from "./ErrorToast.module.scss";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

// context
import { useTheme } from "../../../context/ThemeProvider";

function ErrorToast({ isToast }) {
  // context destructure
  const { theme } = useTheme();

  return (
    <div
      className={
        isToast
          ? `${styles.toast} ${styles[theme]} ${styles.show}`
          : `${styles.toast} ${styles[theme]}`
      }
    >
      <FontAwesomeIcon icon={faTriangleExclamation} color="red" size="xl" />
      <div className={styles.text}>
        <p>Could not update your account</p>
      </div>
    </div>
  );
}

export default ErrorToast;
