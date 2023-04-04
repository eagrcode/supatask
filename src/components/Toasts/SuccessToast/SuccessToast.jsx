// styles
import styles from "./SuccessToast.module.scss";

// icons
import { TiTick } from "react-icons/ti";

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
      <TiTick size={30} style={{ color: "green" }} />
      <div className={styles.text}>
        <p>Account updated</p>
      </div>
    </div>
  );
}

export default SuccessToast;
