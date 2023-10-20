import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserRequest } from "../api/users";


const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const getUser = async () => {
    const res = await getUserRequest();
    setUser(res.data);
    return res.data
  }

  const signup = async (user) => {
    try {
      setLoading(true);
      const res = await registerRequest(user);
      if (res.status === 200) {
        await signin(user)
      }
    } catch (error) {
      setErrors(error.response.data.message);
      setLoading(false);
    }
  };

  const signin = async (user) => {
    try {
      setLoading(true);
      const res = await loginRequest(user);
      if (res.status === 200) {
        const tokenHeader = res.headers.get("set-cookie")[0]
        const token = tokenHeader.split(";")[0].split("=")[1]
        await AsyncStorage.setItem("token", token);
        setUser(res.data);
        setIsAuthenticated(true);
        setLoading(false);
      }

    } catch (error) {
      setErrors(error.response.data.message);
      setLoading(false);
    }
  };

  const logout = async () => {

    try {
      await AsyncStorage.removeItem("token")
      setUser(null);
      setIsAuthenticated(false);
      return true
    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {

    const checkLogin = async () => {

      const token = await AsyncStorage.getItem("token")

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(token);

        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
        getUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
