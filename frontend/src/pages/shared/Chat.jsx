import { useEffect, useMemo, useRef, useState } from 'react'
import { Send, UsersRound } from 'lucide-react'
import toast from 'react-hot-toast'

import Button from '../../components/common/Button.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import Loader from '../../components/common/Loader.jsx'
import ConversationComposer from '../../components/chat/ConversationComposer.jsx'
import chatService from '../../services/chatService.js'
import userService from '../../services/userService.js'
import { getApiErrorMessage } from '../../services/api.js'
import useAuth from '../../hooks/useAuth.js'
import useSocket from '../../hooks/useSocket.js'
import { formatDateTime } from '../../utils/formatDate.js'
import { MESSAGE_STATUS_LABELS } from '../../utils/chatLabels.js'

const Chat = () => {
  const { user, isAdmin } = useAuth()
  const { socket, emit, on, off, onlineUsers } = useSocket()
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([])
  const [activeConversation, setActiveConversation] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [messageText, setMessageText] = useState('')
  const [typingUser, setTypingUser] = useState(null)
  const [isCreatingConversation, setIsCreatingConversation] = useState(false)
  const [participantsMap, setParticipantsMap] = useState({})
  const bottomRef = useRef(null)
  const typingTimeoutRef = useRef(null)

  const selectedConversation = useMemo(() => conversations.find((item) => item._id === activeConversation?._id) || activeConversation, [activeConversation, conversations])

  const loadConversations = async (loadingState = true) => {
    if (loadingState) setIsLoading(true)
    try {
      const data = await chatService.getConversations({ page: 1, limit: 20 })
      setConversations(data.conversations || [])
      if (!activeConversation && data.conversations?.length) {
        setActiveConversation(data.conversations[0])
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  const loadMessages = async (conversationId) => {
    if (!conversationId) return

    try {
      const data = await chatService.getMessages(conversationId, { page: 1, limit: 50 })
      const orderedMessages = [...(data.messages || [])].reverse()
      setMessages(orderedMessages)
      orderedMessages.forEach((message) => {
        if (message.receiver?._id === user?._id && !message.isSeen) {
          chatService.markMessageSeen(message._id).catch(() => null)
        }
      })
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    }
  }

  useEffect(() => {
    loadConversations(true)
  }, [])

  useEffect(() => {
    if (activeConversation?._id) {
      loadMessages(activeConversation._id)
      emit('join_conversation', activeConversation._id)
    }

    return () => {
      if (activeConversation?._id) {
        emit('leave_conversation', activeConversation._id)
      }
    }
  }, [activeConversation?._id])

  useEffect(() => {
    if (!socket) return

    const handleReceive = (message) => {
      if (String(message.conversation?._id || message.conversation) !== String(activeConversation?._id)) return
      setMessages((current) => [...current, message])
      if (message.receiver?._id === user?._id && !message.isSeen) {
        chatService.markMessageSeen(message._id).catch(() => null)
      }
    }

    const handleTyping = ({ sender }) => {
      if (sender?._id !== user?._id) {
        setTypingUser(sender?.fullName || 'Someone')
      }
    }

    const handleStopTyping = () => setTypingUser(null)

    on('receive_message', handleReceive)
    on('typing', handleTyping)
    on('stop_typing', handleStopTyping)
    on('message_seen', ({ messageId, seenAt }) => {
      setMessages((current) => current.map((message) => (message._id === messageId ? { ...message, isSeen: true, status: 'SEEN', seenAt } : message)))
    })

    return () => {
      off('receive_message', handleReceive)
      off('typing', handleTyping)
      off('stop_typing', handleStopTyping)
      off('message_seen', () => null)
    }
  }, [activeConversation?._id, off, on, socket, user?._id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, activeConversation?._id])

  useEffect(() => {
    if (!selectedConversation) return
    emit('user_online', user?._id)
  }, [emit, selectedConversation, user?._id])

  const handleSendMessage = async (event) => {
    event.preventDefault()
    if (!messageText.trim() || !activeConversation) return

    const receiver = activeConversation.participants?.find((participant) => participant._id !== user?._id)

    try {
      const created = await chatService.sendMessage({
        conversation: activeConversation._id,
        receiver: receiver?._id,
        message: messageText.trim(),
        messageType: 'TEXT',
      })

      setMessages((current) => [...current, created])
      setMessageText('')
      emit('send_message', created)
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    }
  }

  const handleTyping = () => {
    if (!activeConversation) return

    emit('typing', { conversationId: activeConversation._id, sender: user })

    window.clearTimeout(typingTimeoutRef.current)
    typingTimeoutRef.current = window.setTimeout(() => {
      emit('stop_typing', { conversationId: activeConversation._id, sender: user })
    }, 650)
  }

  const createConversation = async ({ participantId }) => {
    setIsCreatingConversation(true)
    try {
      const conversation = await chatService.createConversation({ participants: [participantId], type: 'PRIVATE' })
      toast.success('Conversation created')
      await loadConversations(false)
      setActiveConversation(conversation)
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    } finally {
      setIsCreatingConversation(false)
    }
  }

  useEffect(() => {
    const loadParticipants = async () => {
      if (!isAdmin) return
      try {
        const usersData = await userService.getUsers({ page: 1, limit: 100 })
        const map = {}
        ;(usersData.users || []).forEach((participant) => {
          map[participant._id] = participant
        })
        setParticipantsMap(map)
      } catch {
        setParticipantsMap({})
      }
    }

    loadParticipants()
  }, [isAdmin])

  return (
    <div className="grid min-h-[74vh] gap-6 xl:grid-cols-[340px_1fr]">
      <aside className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-5">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Chat</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Conversations</h1>
          <p className="mt-2 text-sm text-slate-500">Real-time messaging with unread state and typing indicator support.</p>
        </div>

        <div className="space-y-3 p-4">
          {isAdmin ? <ConversationComposer onCreate={createConversation} isSaving={isCreatingConversation} /> : null}

          {isLoading ? <Loader label="Loading conversations" /> : null}

          <div className="space-y-2">
            {conversations.map((conversation) => {
              const otherParticipant = conversation.participants?.find((participant) => participant._id !== user?._id)
              const isActive = conversation._id === activeConversation?._id
              const isOnline = onlineUsers.includes(String(otherParticipant?._id))

              return (
                <button
                  key={conversation._id}
                  type="button"
                  className={`w-full rounded-2xl border px-4 py-4 text-left transition ${isActive ? 'border-blue-200 bg-blue-50' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
                  onClick={() => setActiveConversation(conversation)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{otherParticipant?.fullName || conversation.groupName || 'Conversation'}</p>
                      <p className="text-xs text-slate-500">{conversation.lastMessage?.message || 'No messages yet'}</p>
                    </div>
                    <span className={`h-2.5 w-2.5 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </aside>

      <section className="flex min-h-[74vh] flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        {activeConversation ? (
          <>
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-5">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {activeConversation.participants?.find((participant) => participant._id !== user?._id)?.fullName || activeConversation.groupName || 'Chat'}
                </h2>
                <p className="text-sm text-slate-500">Typing and seen states update in real time.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-500">
                {messages.length} messages
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50/60 px-5 py-5">
              {messages.map((message) => {
                const isOwn = message.sender?._id === user?._id

                return (
                  <div key={message._id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-3xl px-4 py-3 shadow-sm ${isOwn ? 'bg-blue-600 text-white' : 'bg-white text-slate-900 border border-slate-200'}`}>
                      <p className="text-sm leading-6">{message.message}</p>
                      <div className={`mt-2 flex items-center justify-between gap-4 text-[11px] ${isOwn ? 'text-blue-100' : 'text-slate-400'}`}>
                        <span>{formatDateTime(message.createdAt)}</span>
                        <span>{MESSAGE_STATUS_LABELS[message.status] || message.status}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
              {typingUser ? <p className="text-sm text-slate-500">{typingUser} is typing...</p> : null}
              <div ref={bottomRef} />
            </div>

            <form className="border-t border-slate-100 bg-white px-5 py-5" onSubmit={handleSendMessage}>
              <div className="flex gap-3">
                <input
                  value={messageText}
                  onChange={(event) => setMessageText(event.target.value)}
                  onKeyDown={handleTyping}
                  className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                  placeholder="Write a message..."
                />
                <Button type="submit" leftIcon={<Send className="h-4 w-4" />}>Send</Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center p-8">
            <EmptyState
              title="No conversation selected"
              description="Pick an existing conversation or start a new one if you are an admin."
              icon={<UsersRound className="h-6 w-6" />}
            />
          </div>
        )}
      </section>
    </div>
  )
}

export default Chat