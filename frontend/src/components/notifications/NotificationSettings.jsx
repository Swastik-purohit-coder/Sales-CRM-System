import { useState } from "react";

const NotificationSettings = () => {

    const [email, setEmail] =
        useState(true);

    const [push, setPush] =
        useState(true);

    const [chat, setChat] =
        useState(true);

    return (

        <div>

            <h3>

                Notification Settings

            </h3>

            <label>

                <input
                    type="checkbox"
                    checked={email}
                    onChange={() =>
                        setEmail(!email)
                    }
                />

                Email Notifications

            </label>

            <br />

            <label>

                <input
                    type="checkbox"
                    checked={push}
                    onChange={() =>
                        setPush(!push)
                    }
                />

                Push Notifications

            </label>

            <br />

            <label>

                <input
                    type="checkbox"
                    checked={chat}
                    onChange={() =>
                        setChat(!chat)
                    }
                />

                Chat Notifications

            </label>

        </div>

    );

};

export default NotificationSettings;