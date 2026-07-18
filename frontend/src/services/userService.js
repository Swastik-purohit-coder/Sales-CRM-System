import api, { extractApiData } from './api.js'

export const userService = {
  createUser: async (payload) => {
    const response = await api.post('/users', payload)
    return extractApiData(response)
  },

  getUsers: async (params = {}) => {
    const response = await api.get('/users', { params })
    return extractApiData(response)
  },

  getUser: async (id) => {
    const response = await api.get(`/users/${id}`)
    return extractApiData(response)
  },

  updateUser: async (id, payload) => {
    const response = await api.put(`/users/${id}`, payload)
    return extractApiData(response)
  },

  toggleUserStatus: async (id) => {
    const response = await api.patch(`/users/${id}/status`)
    return extractApiData(response)
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`)
    return extractApiData(response)
  },
}

export default userService