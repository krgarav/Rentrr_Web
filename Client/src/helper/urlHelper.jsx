import { useMutation } from "@tanstack/react-query";
import { sendVerificationEmail, registerUser, loginUser } from "./baseUrls";

export const useSendVerificationEmail = () => {
  return useMutation({
    mutationFn: sendVerificationEmail, // ✅ THIS is important!
    onSuccess: (data) => {
      console.log("✅ Backend response:", data);
      // You can also trigger toast or navigate here
    },
    onError: (error) => {
      console.error(
        "❌ Error from backend:",
        error.response?.data || error.message
      );
    },
  });
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser, // ✅ THIS is important!
    onSuccess: (data) => {
      console.log("✅ Backend response:", data);
      // You can also trigger toast or navigate here
    },
    onError: (error) => {
      console.error(
        "❌ Error from backend:",
        error.response?.data || error.message
      );
    },
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser, // ✅ THIS is important!
    onSuccess: (data) => {
      console.log("✅ Backend response:", data);
      // You can also trigger toast or navigate here
    },
    onError: (error) => {
      console.error(
        "❌ Error from backend:",
        error.response?.data || error.message
      );
    },
  });
};
