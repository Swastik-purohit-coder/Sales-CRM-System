import { useState } from "react";
import ConversationList from "./ConversationList";

const ChatSidebar = ({
    conversations,
    selectedConversation,
    onSelect,
}) => {

    const [search, setSearch] = useState("");

    const filtered =
        conversations.filter((conversation) => {

            const receiver =
                conversation.receiver ||
                conversation.user ||
                {};

            return receiver.fullName
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                );

        });

    return (

        <div className="chat-sidebar">

            <div className="chat-search">

                <input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

            </div>

            <ConversationList
                conversations={filtered}
                selectedConversation={
                    selectedConversation
                }
                onSelect={onSelect}
            />

        </div>

    );

};

export default ChatSidebar;