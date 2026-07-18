import NotificationItem from "./NotificationItem";

const NotificationPanel = ({
    notifications,
    onRead,
    onDelete,
}) => {

    return (

        <div className="notification-panel">

            <h3>

                Notifications

            </h3>

            {notifications.length === 0 && (

                <p>

                    No Notifications

                </p>

            )}

            {notifications.map(
                (notification) => (

                    <NotificationItem
                        key={
                            notification._id
                        }
                        notification={
                            notification
                        }
                        onRead={onRead}
                        onDelete={onDelete}
                    />

                )
            )}

        </div>

    );

};

export default NotificationPanel;