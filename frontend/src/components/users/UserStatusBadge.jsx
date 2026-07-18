const statusConfig = {
    ACTIVE: {
        label: "Active",
        color: "#16a34a",
        background: "#dcfce7",
    },
    INACTIVE: {
        label: "Inactive",
        color: "#dc2626",
        background: "#fee2e2",
    },
};

const UserStatusBadge = ({ status }) => {
    const config =
        statusConfig[status] || statusConfig.ACTIVE;

    return (
        <span
            style={{
                padding: "4px 10px",
                borderRadius: "20px",
                background: config.background,
                color: config.color,
                fontWeight: 600,
                fontSize: "13px",
            }}
        >
            {config.label}
        </span>
    );
};

export default UserStatusBadge;