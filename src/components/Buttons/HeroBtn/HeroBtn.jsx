// styles
import styles from "./HeroBtn.module.scss";

// react router
import { NavLink } from "react-router-dom";

function HeroBtn({ text }) {
  return (
    <NavLink to="login">
      <button className={styles.btn}>{text}</button>
    </NavLink>
  );
}

export default HeroBtn;
