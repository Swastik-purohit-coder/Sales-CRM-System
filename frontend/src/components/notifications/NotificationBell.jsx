import { Bell } from "lucide-react";
import "./notification.css";

const NotificationBell = ({
    unread = 0,
    onClick,
}) => {

    return (

        <button
            className="notification-bell"
            onClick={onClick}
        >

            <Bell size={22} />

            {unread > 0 && (

                <span className="notification-count">

                    {unread}

                </span>

            )}

        </button>

    );

};

export default NotificationBell;