// styles
import styles from "./RegisterSuccess.module.scss";

// context
import { useTheme } from "../../context/ThemeProvider";

function RegisterSuccess() {
  // theme context
  const { theme } = useTheme();

  return (
    <div className={`${styles.wrapper} ${styles[theme]}`}>
      <p>Please check your email provider to confirm your account</p>
    </div>
  );
}

export default RegisterSuccess;
