import { ChevronLeft } from "lucide-react";

const ChatHeader = ({
    conversation,
    onBack,
}) => {

    if (!conversation) return null;

    const receiver =
        conversation.receiver ||
        conversation.user ||
        {};

    return (

        <div className="chat-header">

            <div className="chat-user">

                {onBack && (
                    <button className="chat-back-btn" onClick={onBack}>
                        <ChevronLeft size={20} />
                    </button>
                )}

                <img
                    src={
                        receiver.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(receiver.fullName || 'User')}`
                    }
                    alt=""
                />

                <div>

                    <h3>

                        {receiver.fullName}

                    </h3>

                    <small>

                        {receiver.online
                            ? "Online"
                            : "Offline"}

                    </small>

                </div>

            </div>

        </div>

    );

};

export default ChatHeader;