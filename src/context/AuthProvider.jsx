import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, useLocation } from "react-router";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

// auth component
const AuthProvider = ({ children }) => {
  // state
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  console.log(loading);

  // login
  const login = async (email, password) =>
    await supabase.auth.signInWithPassword({ email, password });

  // sign out
  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  };

  // retrieve user
  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      console.log(user);
      setLoading(false);
    };
    getUser();

    // auth listener
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        navigate("/");
      }
    });

    // clean up
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
