import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <h1>404</h1>

            <h2>Page Not Found</h2>

            <Link to="/">
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;