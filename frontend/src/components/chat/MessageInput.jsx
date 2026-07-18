import { useState } from "react";

const MessageInput = ({
    onSend,
}) => {

    const [message, setMessage] =
        useState("");

    const submit = (e) => {

        e.preventDefault();

        if (!message.trim()) return;

        onSend(message);

        setMessage("");

    };

    return (

        <form
            className="message-input"
            onSubmit={submit}
        >

            <input
                placeholder="Type a message..."
                value={message}
                onChange={(e) =>
                    setMessage(
                        e.target.value
                    )
                }
            />

            <button>

                Send

            </button>

        </form>

    );

};

export default MessageInput;