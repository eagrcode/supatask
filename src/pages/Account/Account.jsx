import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router";

// context
import { useTheme } from "../../context/ThemeProvider";

// styles
import styles from "./Account.module.scss";

const Account = () => {
  const [loading, setLoading] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const { theme } = useTheme();

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    setLoading(true);

    if (user) {
      try {
        let { data, error } = await supabase
          .from("profiles")
          .select(`first_name, last_name`)
          .eq("id", user?.id)
          .single();

        if (error) {
          console.log(error);
        }

        if (data) {
          console.log(data);
          setFirstName(data?.first_name);
          setLastName(data?.last_name);
        }
      } catch (error) {
        console.log(error);
      }
    }

    setLoading(false);
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updates = {
        id: user?.id,
        first_name: firstName,
        last_name: lastName,
        updated_at: new Date(),
      };
      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.wrapper} ${styles[theme]}`}>
      <h1 className={styles.h1}>Account info</h1>
      <form className={styles.form} onSubmit={updateProfile}>
        <p>{user?.email}</p>
        <label for="first-name">First name</label>
        <input
          className={styles[theme]}
          id="first-name"
          type="text"
          value={firstName || ""}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={loading}
        />
        <label for="last-name">Last name</label>
        <input
          className={styles[theme]}
          id="last-name"
          type="text"
          value={lastName || ""}
          onChange={(e) => setLastName(e.target.value)}
          disabled={loading}
        />
        <button className={styles.btn} disabled={loading}>
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Account;
