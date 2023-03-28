// styles
import { NavLink } from "react-router-dom";
import styles from "./ButtonBlue.module.scss";

function ButtonBlue({ text }) {
  return (
    <NavLink to="register">
      <button className={styles.btn}>{text}</button>
    </NavLink>
  );
}

export default ButtonBlue;
