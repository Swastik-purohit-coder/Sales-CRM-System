import api, { extractApiData } from './api.js'

export const leadService = {
  createLead: async (payload) => {
    const response = await api.post('/leads', payload)
    return extractApiData(response)
  },

  getLeads: async (params = {}) => {
    const response = await api.get('/leads', { params })
    return extractApiData(response)
  },

  getLead: async (id) => {
    const response = await api.get(`/leads/${id}`)
    return extractApiData(response)
  },

  updateLead: async (id, payload) => {
    const response = await api.put(`/leads/${id}`, payload)
    return extractApiData(response)
  },

  assignLead: async (id, payload) => {
    const response = await api.patch(`/leads/${id}/assign`, payload)
    return extractApiData(response)
  },

  updateLeadStatus: async (id, payload) => {
    const response = await api.patch(`/leads/${id}/status`, payload)
    return extractApiData(response)
  },

  deleteLead: async (id) => {
    const response = await api.delete(`/leads/${id}`)
    return extractApiData(response)
  },
}

export default leadService