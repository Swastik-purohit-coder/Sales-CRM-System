const EmptyState = ({ message = "No data available." }) => {
    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            {message}
        </div>
    );
};

export default EmptyState;