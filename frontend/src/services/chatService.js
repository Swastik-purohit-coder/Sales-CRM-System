import api, { extractApiData } from './api.js'

export const chatService = {
  getConversations: async (params = {}) => {
    const response = await api.get('/conversations', { params })
    return extractApiData(response)
  },

  createConversation: async (payload) => {
    const response = await api.post('/conversations', payload)
    return extractApiData(response)
  },

  getConversation: async (id) => {
    const response = await api.get(`/conversations/${id}`)
    return extractApiData(response)
  },

  deleteConversation: async (id) => {
    const response = await api.delete(`/conversations/${id}`)
    return extractApiData(response)
  },

  getMessages: async (conversationId, params = {}) => {
    const response = await api.get(`/messages/${conversationId}`, { params })
    return extractApiData(response)
  },

  sendMessage: async (payload) => {
    const response = await api.post('/messages', payload)
    return extractApiData(response)
  },

  markMessageSeen: async (messageId) => {
    const response = await api.patch(`/messages/${messageId}/seen`)
    return extractApiData(response)
  },
}

export default chatService