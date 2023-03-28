import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router";

const Account = () => {
  const [loading, setLoading] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

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
    <div>
      <form onSubmit={updateProfile}>
        <div>Email: {user?.email}</div>
        <div>
          <label htmlFor="username">First Name</label>
          <input
            id="username"
            type="text"
            value={firstName || ""}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="website">Last Name</label>
          <input
            id="website"
            type="text"
            value={lastName || ""}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <button disabled={loading}>Update profile</button>
        </div>
      </form>
    </div>
  );
};

export default Account;
