import api from "./api";

const authService = {
    login: async (data) => {
        const res = await api.post("/auth/login", data);
        return res.data;
    },

    logout: async () => {
        const res = await api.post("/auth/logout");
        return res.data;
    },

    profile: async () => {
        const res = await api.get("/auth/profile");
        return res.data;
    },
};

export default authService;