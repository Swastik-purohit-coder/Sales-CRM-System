import api from "./api";

const notificationService = {

    getNotifications() {

        return api.get("/notifications");

    },

    getUnread() {

        return api.get(
            "/notifications/unread"
        );

    },

    markRead(id) {

        return api.patch(
            `/notifications/${id}/read`
        );

    },

    markAllRead() {

        return api.patch(
            "/notifications/read-all"
        );

    },

    deleteNotification(id) {

        return api.delete(
            `/notifications/${id}`
        );

    },

};

export default notificationService;