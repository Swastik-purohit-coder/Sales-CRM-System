import "./chat.css";

const MessageBubble = ({ message, currentUser }) => {

    const mine =
        (message.sender?._id || message.sender)?.toString() === currentUser?._id?.toString();

    return (

        <div
            className={`message-row ${
                mine ? "mine" : "other"
            }`}
        >

            <div
                className={`message-bubble ${
                    mine ? "mine" : "other"
                }`}
            >

                {message.file && (

                    <a
                        href={message.file}
                        target="_blank"
                        rel="noreferrer"
                    >

                        📎 Attachment

                    </a>

                )}

                <p>

                    {message.message || message.content}

                </p>

                <small>

                    {new Date(
                        message.createdAt
                    ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}

                </small>

            </div>

        </div>

    );

};

export default MessageBubble;