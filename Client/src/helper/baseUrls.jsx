import axios from "axios";
export const BaseUrl = "https://rentrr-web.onrender.com";
// export const BaseUrl = "http://localhost:4000";
export const sendVerificationEmail = async ({ email }) => {
  const res = await axios.post(`${BaseUrl}/verify`, {
    email,
  });
  return res.data;
};
export const registerUser = async (formdata, token) => {
  const res = await axios.post(`${BaseUrl}/register`, { formdata, token });
  return res.data;
};

export const loginUser = async ({ email, password }) => {
  const res = await axios.post(
    `${BaseUrl}/login-user`,
    { email, password },
    {
      withCredentials: true, // Make sure credentials (cookies) are sent with the request
    }
  );
  return res.data;
};
export const logoutUser = async () => {
  const res = await axios.get(
    `${BaseUrl}/logout-user`,

    {
      withCredentials: true, // Make sure credentials (cookies) are sent with the request
    }
  );
  return res.data;
};
