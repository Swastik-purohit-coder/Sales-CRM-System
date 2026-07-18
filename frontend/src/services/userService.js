import api from "./api";

const userService = {

    getUsers(params) {
        return api.get("/users", { params });
    },

    getUser(id) {
        return api.get(`/users/${id}`);
    },

    createUser(data) {
        return api.post("/users", data);
    },

    updateUser(id, data) {
        return api.put(`/users/${id}`, data);
    },

    toggleStatus(id) {
        return api.patch(`/users/${id}/status`);
    },

    deleteUser(id) {
        return api.delete(`/users/${id}`);
    },

};

export default userService;