import api from "./api";

const leadService = {

    getLeads(params) {
        return api.get("/leads", { params });
    },

    getLead(id) {
        return api.get(`/leads/${id}`);
    },

    createLead(data) {
        return api.post("/leads", data);
    },

    updateLead(id, data) {
        return api.put(`/leads/${id}`, data);
    },

    assignLead(id, assignedTo) {
        return api.patch(`/leads/${id}/assign`, {
            assignedTo,
        });
    },

    updateStatus(id, status) {
        return api.patch(`/leads/${id}/status`, {
            status,
        });
    },

    deleteLead(id) {
        return api.delete(`/leads/${id}`);
    },

};

export default leadService;