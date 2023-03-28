import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, useLocation } from "react-router";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

// auth component
const AuthProvider = ({ children }) => {
  // state
  const [loading, setLoading] = useState(null);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // login
  const login = (email, password) => supabase.auth.signInWithPassword({ email, password });

  // sign out
  const signOut = () => {
    supabase.auth.signOut();
  };

  // retrieve user
  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
      console.log(user);
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

  useEffect(() => {
    if (!user && location.pathname === "/account") {
      navigate("/register");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
