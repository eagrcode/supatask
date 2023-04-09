// libraries
import { PulseLoader } from "react-spinners";

// styles
import styles from "./SkeletonTodoCard.module.scss";

// context
import { useTheme } from "../../../context/ThemeProvider";

function SkeletonTodoCard({ isLoading }) {
  const { theme } = useTheme();

  return (
    <div className={`${styles.todo} ${styles[theme]}`}>
      <PulseLoader
        loading={isLoading}
        size={5}
        aria-label="Loading Spinner"
        data-testid="loader"
        color="white"
      />
    </div>
  );
}

export default SkeletonTodoCard;
