import ConversationItem from "./ConversationItem";

const ConversationList = ({
    conversations,
    selectedConversation,
    onSelect,
}) => {

    return (

        <div className="conversation-list">

            {conversations.map((conversation) => (

                <ConversationItem
                    key={conversation._id}
                    conversation={conversation}
                    active={
                        selectedConversation?._id ===
                        conversation._id
                    }
                    onSelect={onSelect}
                />

            ))}

        </div>

    );

};

export default ConversationList;