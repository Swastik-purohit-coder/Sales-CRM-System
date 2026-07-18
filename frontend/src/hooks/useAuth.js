import { useAuthContext } from "../context/AuthContext";

const useAuth = () => {
    return useAuthContext();
};

export { useAuth };
export default useAuth;
