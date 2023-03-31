// styles
import { NavLink } from "react-router-dom";
import styles from "./HeroBtn.module.scss";

function HeroBtn({ text }) {
  return (
    <NavLink to="register">
      <button className={styles.btn}>{text}</button>
    </NavLink>
  );
}

export default HeroBtn;
