import api from "./api";

const analyticsService = {

    overview() {
        return api.get("/dashboard/overview").then(res => res.data?.data || res.data);
    },

    getOverview() {
        return api.get("/dashboard/overview").then(res => res.data?.data || res.data);
    },

    getDashboard() {
        return api.get("/analytics").then(res => res.data?.data || res.data);
    },

    cards() {
        return api.get("/dashboard/cards").then(res => res.data?.data || res.data);
    },

    leadStatus() {
        return api.get("/dashboard/lead-status").then(res => res.data?.data || res.data);
    },

    leadSource() {
        return api.get("/dashboard/lead-source").then(res => res.data?.data || res.data);
    },

    monthlyLeads() {
        return api.get("/dashboard/monthly-leads").then(res => res.data?.data || res.data);
    },

    topSales() {
        return api.get("/dashboard/top-sales").then(res => res.data?.data || res.data);
    },

    todayFollowUps() {
        return api.get("/dashboard/today-followups").then(res => res.data?.data || res.data);
    },

    recentLeads() {
        return api.get("/dashboard/recent-leads").then(res => res.data?.data || res.data);
    },

};

export default analyticsService;