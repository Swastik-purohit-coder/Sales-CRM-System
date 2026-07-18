import { Link } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {

    const [email, setEmail] =
        useState("");

    const [success, setSuccess] =
        useState(false);

    const submit = (e) => {
        e.preventDefault();

        setSuccess(true);
    };

    return (

        <div className="login-page">

            <form
                className="login-card"
                onSubmit={submit}
            >

                <h2>

                    Forgot Password

                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <button>

                    Send Reset Link

                </button>

                {success && (

                    <p>

                        If this email exists,
                        password reset instructions
                        will be sent.

                    </p>

                )}

                <Link to="/login">

                    Back To Login

                </Link>

            </form>

        </div>

    );

};

export default ForgotPassword;