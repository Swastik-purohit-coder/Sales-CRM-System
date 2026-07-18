import "./chat.css";

const ConversationItem = ({
    conversation,
    active,
    onSelect,
}) => {

    const receiver =
        conversation.receiver ||
        conversation.user ||
        {};

    return (

        <div
            className={`conversation-item ${
                active ? "active" : ""
            }`}
            onClick={() =>
                onSelect(conversation)
            }
        >

            <img
                src={
                    receiver.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(receiver.fullName || 'User')}`
                }
                alt=""
                className="conversation-avatar"
            />

            <div className="conversation-info">

                <h4>

                    {receiver.fullName}

                </h4>

                <p>

                    {conversation.lastMessage?.message ||
                        conversation.lastMessage ||
                        "No messages yet"}

                </p>

            </div>

            {conversation.unread > 0 && (

                <span className="badge">

                    {conversation.unread}

                </span>

            )}

        </div>

    );

};

export default ConversationItem;