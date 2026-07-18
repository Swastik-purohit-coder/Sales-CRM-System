const colors = {

    HIGH: "#ef4444",

    MEDIUM: "#f59e0b",

    LOW: "#22c55e",

};

const LeadPriorityBadge = ({
    priority,
}) => (

    <span
        style={{
            color: "white",
            background: colors[priority],
            padding: "4px 10px",
            borderRadius: 6,
        }}
    >

        {priority}

    </span>

);

export default LeadPriorityBadge;