import { useEffect } from "react";
import axios from "axios";

const BaseUrl = "https://rentrr-web.onrender.com";
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
