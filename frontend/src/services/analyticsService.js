import api, { extractApiData } from './api.js'

export const analyticsService = {
	getOverview: async () => {
		const response = await api.get('/dashboard/overview')
		return extractApiData(response)
	},

	getCards: async () => {
		const response = await api.get('/dashboard/cards')
		return extractApiData(response)
	},

	getLeadStatus: async () => {
		const response = await api.get('/dashboard/lead-status')
		return extractApiData(response)
	},

	getLeadSource: async () => {
		const response = await api.get('/dashboard/lead-source')
		return extractApiData(response)
	},

	getMonthlyLeads: async () => {
		const response = await api.get('/dashboard/monthly-leads')
		return extractApiData(response)
	},

	getTopSales: async (limit = 5) => {
		const response = await api.get('/dashboard/top-sales', { params: { limit } })
		return extractApiData(response)
	},

	getTodayFollowUps: async () => {
		const response = await api.get('/dashboard/today-followups')
		return extractApiData(response)
	},

	getRecentLeads: async (limit = 10) => {
		const response = await api.get('/dashboard/recent-leads', { params: { limit } })
		return extractApiData(response)
	},
}

export default analyticsService
