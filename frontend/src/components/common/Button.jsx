const Button = ({ children, leftIcon, variant, size, ...props }) => {
    const classes = [
        "btn",
        variant ? `btn-${variant}` : "",
        size ? `btn-${size}` : "",
        props.className || ""
    ].filter(Boolean).join(" ");

    return (
        <button 
            {...props} 
            className={classes}
            style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                ...props.style
            }}
        >
            {leftIcon && <span style={{ display: "inline-flex", alignItems: "center" }}>{leftIcon}</span>}
            {children}
        </button>
    );
};

export default Button;