import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("user");
            //window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export const getApiErrorMessage = (error) => {
    return (
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong"
    );
};

export const extractApiData = (response) => {
    return response?.data?.data || response?.data || response || {};
};

export default api;
