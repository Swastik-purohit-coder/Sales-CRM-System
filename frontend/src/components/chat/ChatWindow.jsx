import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import EmptyChat from "./EmptyChat";

const ChatWindow = ({
    conversation,
    messages,
    currentUser,
    typing,
    onSend,
    onBack,
}) => {

    const bottomRef = useRef();

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages]);

    if (!conversation)
        return <div className="chat-window"><EmptyChat /></div>;

    return (

        <div className="chat-window active">

            <ChatHeader
                conversation={conversation}
                onBack={onBack}
            />

            <div className="messages">

                {messages.map((message) => (

                    <MessageBubble
                        key={message._id}
                        message={message}
                        currentUser={
                            currentUser
                        }
                    />

                ))}

                <TypingIndicator
                    typing={typing}
                />

                <div ref={bottomRef}></div>

            </div>

            <MessageInput
                onSend={onSend}
            />

        </div>

    );

};

export default ChatWindow;