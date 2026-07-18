import { useEffect, useState } from "react";
import userService from "../../services/userService";

const initialState = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "SALES",
};

const UserFormModal = ({
    open,
    close,
    refresh,
    editUser,
}) => {

    const [form, setForm] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setError("");
        if (editUser) {
            setForm({
                fullName: editUser.fullName,
                email: editUser.email,
                phone: editUser.phone,
                password: "",
                role: editUser.role,
            });
        } else {
            setForm(initialState);
        }
    }, [editUser, open]);

    if (!open) return null;

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
            if (editUser) {
                await userService.updateUser(
                    editUser._id,
                    form
                );
            } else {
                await userService.createUser(form);
            }
            refresh();
            close();
        } catch (err) {
            console.error(err);
            const errMsg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || "Failed to save user";
            setError(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>
                    {editUser
                        ? "Update User"
                        : "Create User"}
                </h2>

                {error && <div className="error" style={{ marginBottom: "15px" }}>{error}</div>}

                <form onSubmit={handleSubmit}>

                    <input
                        name="fullName"
                        placeholder="Full Name"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="phone"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />

                    {!editUser && (

                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />

                    )}

                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                    >

                        <option value="ADMIN">

                            Admin

                        </option>

                        <option value="SALES">

                            Sales

                        </option>

                    </select>

                    <div className="modal-actions">

                        <button
                            type="submit"
                            disabled={loading}
                        >

                            {loading
                                ? "Saving..."
                                : "Save"}

                        </button>

                        <button
                            type="button"
                            onClick={close}
                        >

                            Cancel

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default UserFormModal;