const statusConfig = {
    NEW: {
        color: "#2563eb",
        background: "#dbeafe",
    },
    CONTACTED: {
        color: "#ca8a04",
        background: "#fef3c7",
    },
    QUALIFIED: {
        color: "#7c3aed",
        background: "#ede9fe",
    },
    WON: {
        color: "#16a34a",
        background: "#dcfce7",
    },
    LOST: {
        color: "#dc2626",
        background: "#fee2e2",
    },
};

const LeadStatusBadge = ({ status }) => {

    const config =
        statusConfig[status] ||
        statusConfig.NEW;

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

            {status}

        </span>

    );

};

export default LeadStatusBadge;