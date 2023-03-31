// styles
import styles from "./Home.module.scss";

// context
import { useAuth } from "../../context/AuthProvider";
import { useTheme } from "../../context/ThemeProvider";

// components
import { HeroBtn } from "../../components";

function Home() {
  const { user, loading } = useAuth();
  const { theme } = useTheme();

  if (!user) {
    return (
      <main className={`${styles.main} ${styles[theme]}`}>
        <div className={styles.hero}>
          <h1>
            React & Supabase <span>CRUD</span> app
          </h1>
          <p>Supatask is a simple tool designed to keep track of your daily tasks.</p>
          <HeroBtn text={"Get Started"} />
        </div>
      </main>
    );
  }

  return (
    <main className={`${styles.main} ${styles[theme]}`}>
      <h1>Supatask</h1>
      <p>Welcome, {user.user_metadata.first_name}</p>
    </main>
  );
}

export default Home;
