const Input = ({ label, ...props }) => {
    if (label) {
        return (
            <div className="input-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span className="input-label" style={{ fontSize: "12px", fontWeight: "600" }}>{label}</span>
                <input {...props} />
            </div>
        );
    }
    return <input {...props} />;
};

export default Input;