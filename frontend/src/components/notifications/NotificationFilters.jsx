const NotificationFilters = ({
    filter,
    setFilter,
}) => {
    const options = [
        { label: "All", value: "ALL" },
        { label: "Unread", value: "UNREAD" },
        { label: "Read", value: "READ" },
        { label: "Chat", value: "CHAT" },
        { label: "Lead", value: "LEAD" },
        { label: "System", value: "SYSTEM" },
    ];

    return (
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
            {options.map((opt) => {
                const isActive = filter === opt.value;
                return (
                    <button
                        key={opt.value}
                        onClick={() => setFilter(opt.value)}
                        type="button"
                        style={{
                            padding: "8px 16px",
                            borderRadius: "20px",
                            border: isActive ? "1px solid #2563eb" : "1px solid #e5e7eb",
                            backgroundColor: isActive ? "#2563eb" : "#ffffff",
                            color: isActive ? "#ffffff" : "#4b5563",
                            fontSize: "14px",
                            fontWeight: "500",
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                        }}
                    >
                        {opt.label}
                    </button>
                );
            })}
        </div>
    );
};

export default NotificationFilters;