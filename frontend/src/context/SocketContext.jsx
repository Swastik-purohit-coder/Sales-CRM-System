import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { io } from 'socket.io-client'

import useAuth from '../hooks/useAuth.js'

const SocketContext = createContext(null)

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/v1$/, '') || 'http://localhost:5000'

export const SocketProvider = ({ children }) => {
  const { user, isAuthenticated, token } = useAuth()
  const socketRef = useRef(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (!isAuthenticated || !token) {
      socketRef.current?.disconnect()
      socketRef.current = null
      setIsConnected(false)
      setOnlineUsers([])
      return
    }

    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      withCredentials: true,
      auth: {
        token,
      },
    })

    socketRef.current = socket

    socket.on('connect', () => {
      setIsConnected(true)
      if (user?._id) {
        socket.emit('user_online', user._id)
      }
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('user_online', (userId) => {
      setOnlineUsers((current) => Array.from(new Set([...current, String(userId)])))
    })

    socket.on('user_offline', (userId) => {
      setOnlineUsers((current) => current.filter((id) => String(id) !== String(userId)))
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
      setIsConnected(false)
    }
  }, [isAuthenticated, token, user?._id])

  const emit = useCallback((event, payload) => {
    socketRef.current?.emit(event, payload)
  }, [])

  const on = useCallback((event, handler) => {
    socketRef.current?.on(event, handler)
  }, [])

  const off = useCallback((event, handler) => {
    socketRef.current?.off(event, handler)
  }, [])

  const value = useMemo(() => ({
    socket: socketRef.current,
    emit,
    on,
    off,
    onlineUsers,
    isConnected,
  }), [emit, isConnected, off, on, onlineUsers])

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

export const useSocketContext = () => useContext(SocketContext)

export default SocketContext