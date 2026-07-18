import api from "./api";

const chatService = {

    getConversations(params) {
        return api.get("/conversations", { params });
    },

    getConversation(id) {
        return api.get(`/conversations/${id}`);
    },

    createConversation(data) {
        return api.post("/conversations", data);
    },

    deleteConversation(id) {
        return api.delete(`/conversations/${id}`);
    },

    getMessages(id, params) {
        return api.get(`/messages/${id}`, { params });
    },

    getMessage(id) {
        return api.get(`/messages/details/${id}`);
    },

    sendMessage(data) {
        return api.post("/messages", data);
    },

    seen(id) {
        return api.patch(`/messages/${id}/seen`);
    },

    deleteMessage(id) {
        return api.delete(`/messages/${id}`);
    },

};

export default chatService;