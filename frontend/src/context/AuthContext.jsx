import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

const getUserFromAuthResponse = (res) => {
    return (
        res?.data?.user ||
        res?.user ||
        res?.data?.data?.user ||
        res?.data ||
        null
    );
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const res = await authService.profile();

            setUser(res.data ?? res.user ?? null);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (values) => {
        const res = await authService.login(values);

        const loggedUser = getUserFromAuthResponse(res);

        if (loggedUser) {
            localStorage.setItem("user", JSON.stringify(loggedUser));
            setUser(loggedUser);
        }

        return res;
    };

    const logout = async () => {
        try {
            await authService.logout();
        } finally {
            localStorage.removeItem("user");
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                setUser,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
