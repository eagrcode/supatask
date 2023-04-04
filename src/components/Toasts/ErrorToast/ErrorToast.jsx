// styles
import styles from "./ErrorToast.module.scss";

// icons
import { MdError } from "react-icons/md";

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
      <MdError size={30} style={{ color: "red" }} />
      <div className={styles.text}>
        <p>Could not update your account</p>
      </div>
    </div>
  );
}

export default ErrorToast;
