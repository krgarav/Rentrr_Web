import axios from "axios";
const BaseUrl = "http://localhost:4000";
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
