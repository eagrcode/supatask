// react
import { useState, useEffect } from "react";

// supabase client
import { supabase } from "../../supabaseClient";

// context
import { useAuth } from "../../context/AuthProvider";

// loading spinners
import PulseLoader from "react-spinners/PulseLoader";

// components
import { SuccessToast, ErrorToast } from "../../components";

// context
import { useTheme } from "../../context/ThemeProvider";

// styles
import styles from "./Account.module.scss";

const Account = () => {
  // state
  const [loading, setLoading] = useState(null);
  const [status, setStatus] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [isToast, setIsToast] = useState(false);

  // context destructure
  const { theme } = useTheme();
  const { user } = useAuth();

  // delay data fetching
  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  // get user details on render
  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    setLoading(true);
    if (user) {
      try {
        await sleep(500);
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

  // update user account details
  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    disableSubmit();
    try {
      await sleep(500);
      const updates = {
        id: user?.id,
        first_name: firstName,
        last_name: lastName,
        updated_at: new Date(),
      };
      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) {
        console.log(error);
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
      showToast();
    }
  };

  // disable submit btn for 3 secs
  function disableSubmit() {
    setBtnDisable(true);
    const timer = setTimeout(() => {
      setBtnDisable(false);
    }, 3500);

    return () => clearTimeout(timer);
  }

  // show toast pop up for 3 secs
  function showToast() {
    setIsToast(true);
    const timer = setTimeout(() => {
      setIsToast(false);
    }, 3000);

    return () => clearTimeout(timer);
  }

  return (
    <div className={`${styles.wrapper} ${styles[theme]}`}>
      <h1 className={styles.h1}>Account info</h1>
      <form className={styles.form} onSubmit={updateProfile}>
        <p>{user?.email}</p>
        <label htmlFor="first-name">First name</label>
        <input
          className={styles[theme]}
          id="first-name"
          type="text"
          value={firstName || ""}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={loading}
        />
        <label htmlFor="last-name">Last name</label>
        <input
          className={styles[theme]}
          id="last-name"
          type="text"
          value={lastName || ""}
          onChange={(e) => setLastName(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className={styles.btn} disabled={btnDisable}>
          {loading ? <PulseLoader color="var(--primary-text-dark)" size={8} /> : "Update"}
        </button>
      </form>
      {status === "success" ? <SuccessToast isToast={isToast} /> : <ErrorToast isToast={isToast} />}
    </div>
  );
};

export default Account;
