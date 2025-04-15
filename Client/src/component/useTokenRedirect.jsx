import { useEffect } from "react";
import axios from "axios";

const BaseUrl = "http://localhost:4000";
export const useTokenRedirect = (setUser) => {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${BaseUrl}/check-auth`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        console.log("Not logged in");
        setUser(null);
      }
    };

    checkAuth();
  }, []);
};
