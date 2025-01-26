import clientApi from "@/utils/api";
import { setToken } from "@/utils/auth";
import { useState } from "react";

const useLogin = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = async (username: string) => {
    if (!username) {
      setError('Please enter the email.');
      return;
    }
    setLoading(true);
    try {
      const res = await clientApi.login({ email: username })
      setToken(res.data.token);
      window.location.href = '/';
    }
    catch (err) {
      console.log(err);
      setError('Username is incorrect.');
      setLoading(false);
    }
  }
  return {
    login,
    error,
    setError,
    loading,
    setLoading
  }
}

export default useLogin