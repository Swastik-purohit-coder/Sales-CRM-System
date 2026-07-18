const roleConfig = {
    ADMIN: {
        background: "#dbeafe",
        color: "#2563eb",
    },
    SALES: {
        background: "#fef3c7",
        color: "#ca8a04",
    },
};

const UserRoleBadge = ({ role }) => {
    const config =
        roleConfig[role] || roleConfig.SALES;

    return (
        <span
            style={{
                padding: "4px 10px",
                borderRadius: "20px",
                background: config.background,
                color: config.color,
                fontWeight: 600,
            }}
        >
            {role}
        </span>
    );
};

export default UserRoleBadge;