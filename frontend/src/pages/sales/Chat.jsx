import { useEffect, useState } from "react";

import {
    ChatSidebar,
    ChatWindow,
} from "../../components/chat";

import chatService from "../../services/chatService";
import userService from "../../services/userService";

import { useAuth } from "../../hooks/useAuth";

import { useSocket } from "../../hooks/useSocket";
import "../../components/chat/chat.css";

const Chat = () => {

    const { user } = useAuth();

    const socket = useSocket();

    const [conversations, setConversations] =
        useState([]);

    const [users, setUsers] = useState([]);

    const [selectedConversation,
        setSelectedConversation] =
        useState(null);

    const [messages, setMessages] =
        useState([]);

    const [typing, setTyping] =
        useState(false);

    useEffect(() => {
        loadConversations();
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const res = await userService.getUsers({ limit: 100 });
            const data = res.data?.data || res.data;
            const allUsers = data.users || data || [];
            
            // Filters: Admin sees Sales users; Sales user sees Admin
            if (user?.role?.toLowerCase() === "admin") {
                const salesUsers = allUsers.filter(
                    (u) => u.role?.toLowerCase() === "sales" && u.isActive && u._id !== user._id
                );
                setUsers(salesUsers);
            } else {
                const adminUsers = allUsers.filter(
                    (u) => u.role?.toLowerCase() === "admin" && u.isActive && u._id !== user._id
                );
                setUsers(adminUsers);
            }
        } catch (err) {
            console.error("Failed to load contact users:", err);
        }
    };

    useEffect(() => {
        if (selectedConversation && !selectedConversation.isTemp) {
            loadMessages();
        } else {
            setMessages([]);
        }
    }, [selectedConversation]);

    useEffect(() => {
        if (!socket || !user) return;
        socket.emit("user-online", user._id);
    }, [socket, user]);

    useEffect(() => {
        if (!socket || !selectedConversation) return;

        socket.emit("join-conversation", selectedConversation._id);

        return () => {
            socket.emit("leave-conversation", selectedConversation._id);
        };
    }, [socket, selectedConversation]);

    useEffect(() => {
        if (!socket) return;

        socket.on(
            "receive-message",
            (message) => {
                // Prevent duplicate display of messages sent by the logged-in user
                const msgSenderId = message.sender?._id || message.sender;
                if (msgSenderId?.toString() === user?._id?.toString()) {
                    return;
                }
                setMessages((prev) => [
                    ...prev,
                    message,
                ]);
            }
        );

        socket.on(
            "typing",
            () => {
                setTyping(true);
                setTimeout(() => {
                    setTyping(false);
                }, 1500);
            }
        );

        return () => {
            socket.off("receive-message");
            socket.off("typing");
        };

    }, [socket, user]);

    const loadConversations =
        async () => {
            const res =
                await chatService.getConversations();

            const data =
                res.data?.data || res.data;

            setConversations(
                data.conversations ||
                data
            );
        };

    const loadMessages =
        async () => {
            const res =
                await chatService.getMessages(
                    selectedConversation._id
                );

            const data =
                res.data?.data || res.data;

            const msgList = data.messages || data || [];

            setMessages(
                [...msgList].reverse()
            );
        };

    const sendMessage =
        async (text) => {
            const receiver = selectedConversation.receiver || selectedConversation.user || {};
            const payload = {
                conversation: selectedConversation._id,
                receiver: receiver._id,
                message: text,
            };

            const res =
                await chatService.sendMessage(
                    payload
                );

            const message =
                res.data?.data ||
                res.data;

            setMessages((prev) => [
                ...prev,
                message,
            ]);

            if (socket) {
                socket.emit(
                    "send-message",
                    message
                );
            }
        };

    const handleSelectConversation = async (conv) => {
        if (conv.isTemp) {
            try {
                const res = await chatService.createConversation({
                    participants: [conv.user._id],
                    type: "PRIVATE"
                });
                const newConv = res.data?.data || res.data;
                setConversations((prev) => [newConv, ...prev]);
                setSelectedConversation(newConv);
            } catch (err) {
                console.error("Failed to start conversation:", err);
            }
        } else {
            setSelectedConversation(conv);
        }
    };

    const sidebarConversations = users.map((u) => {
        const existing = conversations.find((c) =>
            c.participants?.some((p) => (p._id || p).toString() === u._id.toString())
        );
        if (existing) {
            const otherParticipant = existing.participants?.find(
                (p) => (p._id || p).toString() === u._id.toString()
            );
            existing.user = otherParticipant || u;
            return existing;
        }
        return {
            _id: `temp_${u._id}`,
            isTemp: true,
            user: u,
            participants: [u, user],
            lastMessage: "No messages yet",
            unread: 0,
            type: "PRIVATE",
        };
    });

    return (
        <div
            className="chat-page"
        >
            <ChatSidebar
                conversations={
                    sidebarConversations
                }
                selectedConversation={
                    selectedConversation
                }
                onSelect={
                    handleSelectConversation
                }
            />

            <ChatWindow
                conversation={
                    selectedConversation
                }
                messages={messages}
                currentUser={user}
                typing={typing}
                onSend={sendMessage}
                onBack={() => setSelectedConversation(null)}
            />

        </div>

    );

};

export default Chat;