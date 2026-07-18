import api from "./api";

const profileService = {

    getProfile() {
        return api.get("/auth/profile");
    },

    updateProfile(data) {
        return api.put("/users/profile", data);
    },

    changePassword(data) {
        return api.put("/users/change-password", data);
    },

    uploadAvatar(formData) {
        return api.post(
            "/users/avatar",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    },

};

export default profileService;