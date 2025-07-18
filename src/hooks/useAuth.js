// useAuth: custom hook to access authentication context throughout the app.
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
