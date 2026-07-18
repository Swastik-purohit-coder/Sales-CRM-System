import { useEffect, useState } from "react";

import notificationService from "../services/notificationService";
import { useSocket } from "../hooks/useSocket";

import {
    NotificationPanel,
    NotificationFilters,
    NotificationSkeleton,
    NotificationEmptyState,
} from "../components/notifications";

const Notifications = () => {

    const socket = useSocket();

    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    const [filter, setFilter] = useState("ALL");

    useEffect(() => {

        loadNotifications();

    }, []);

    useEffect(() => {

        if (!socket) return;

        socket.on("notification", (notification) => {

            setNotifications((prev) => [

                notification,

                ...prev,

            ]);

        });

        return () => {

            socket.off("notification");

        };

    }, [socket]);

    const loadNotifications = async () => {

        setLoading(true);

        try {

            const res =
                await notificationService.getNotifications();

            const data =
                res.data?.data || res.data;

            setNotifications(
                data.notifications || data
            );

        } finally {

            setLoading(false);

        }

    };

    const markRead = async (notification) => {

        await notificationService.markRead(
            notification._id
        );

        loadNotifications();

    };

    const deleteNotification = async (
        notification
    ) => {

        await notificationService.deleteNotification(
            notification._id
        );

        loadNotifications();

    };

    const markAllRead = async () => {

        await notificationService.markAllRead();

        loadNotifications();

    };

    const filtered = notifications.filter((item) => {

        if (filter === "ALL") return true;

        if (filter === "READ")
            return item.read;

        if (filter === "UNREAD")
            return !item.read;

        return item.type === filter;

    });

    if (loading)
        return <NotificationSkeleton />;

    return (

        <div className="page-container">

            <div className="page-header">

                <div>

                    <h1>

                        Notifications

                    </h1>

                    <p>

                        All system notifications

                    </p>

                </div>

                <button
                    onClick={markAllRead}
                    style={{
                        padding: "8px 16px",
                        backgroundColor: "#2563eb",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "background-color 0.2s ease"
                    }}
                >

                    Mark All Read

                </button>

            </div>

            <NotificationFilters
                filter={filter}
                setFilter={setFilter}
            />

            {filtered.length === 0 ? (

                <NotificationEmptyState />

            ) : (

                <NotificationPanel
                    notifications={filtered}
                    onRead={markRead}
                    onDelete={deleteNotification}
                />

            )}

        </div>

    );

};

export default Notifications;