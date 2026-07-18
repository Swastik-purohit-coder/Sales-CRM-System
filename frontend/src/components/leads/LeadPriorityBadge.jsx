const priorityConfig = {

    HIGH: {
        color: "#dc2626",
        background: "#fee2e2",
    },

    MEDIUM: {
        color: "#ca8a04",
        background: "#fef3c7",
    },

    LOW: {
        color: "#16a34a",
        background: "#dcfce7",
    },

};

const LeadPriorityBadge = ({
    priority,
}) => {

    const config =
        priorityConfig[priority] ||
        priorityConfig.LOW;

    return (

        <span
            style={{
                background: config.background,
                color: config.color,
                padding: "5px 12px",
                borderRadius: "20px",
                fontWeight: 600,
                fontSize: 13,
            }}
        >

            {priority}

        </span>

    );

};

export default LeadPriorityBadge;