import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const res = await login(form);

            const user =
                res?.data?.user ||
                res?.user ||
                res?.data?.data?.user ||
                res?.data;

            if (user.role?.toLowerCase() === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/sales/dashboard");
            }

        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Login Failed"
            );
        }

        setLoading(false);
    };

    return (

        <div className="login-page">

            <form
                className="login-card"
                onSubmit={handleSubmit}
            >

                <h1>Sales CRM</h1>

                <p>Sign in to continue</p>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button
                    disabled={loading}
                >
                    {loading
                        ? "Signing In..."
                        : "Login"}
                </button>

            </form>

        </div>

    );

};

export default Login;
