const NotificationItem = ({
    notification,
    onRead,
    onDelete,
}) => {

    return (

        <div
            className={`notification-item ${
                notification.read
                    ? ""
                    : "unread"
            }`}
        >

            <div>

                <h4>

                    {notification.title}

                </h4>

                <p>

                    {notification.message}

                </p>

                <small>

                    {new Date(
                        notification.createdAt
                    ).toLocaleString()}

                </small>

            </div>

            <div
                className="notification-actions"
            >

                {!notification.read && (

                    <button
                        onClick={() =>
                            onRead(notification)
                        }
                        style={{
                            padding: "6px 12px",
                            backgroundColor: "#2563eb",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "13px",
                            fontWeight: "500",
                            cursor: "pointer"
                        }}
                    >

                        Read

                    </button>

                )}

                <button
                    onClick={() =>
                        onDelete(notification)
                    }
                    style={{
                        padding: "6px 12px",
                        backgroundColor: "#f3f4f6",
                        color: "#ef4444",
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                        fontSize: "13px",
                        fontWeight: "500",
                        cursor: "pointer"
                    }}
                >

                    Delete

                </button>

            </div>

        </div>

    );

};

export default NotificationItem;