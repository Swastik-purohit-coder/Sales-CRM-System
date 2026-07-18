import { useState } from "react";

const ChangePasswordModal = ({
    open,
    onClose,
    onSave,
}) => {

    const [form, setForm] = useState({

        currentPassword: "",

        newPassword: "",

        confirmPassword: "",

    });

    if (!open) return null;

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };

    const submit = () => {

        if (
            form.newPassword !==
            form.confirmPassword
        ) {

            return alert(
                "Passwords do not match."
            );

        }

        onSave(form);

    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Change Password</h2>

                <input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={form.currentPassword}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={form.newPassword}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                />

                <div className="modal-actions">

                    <button onClick={submit}>

                        Update

                    </button>

                    <button onClick={onClose}>

                        Cancel

                    </button>

                </div>

            </div>

        </div>

    );

};

export default ChangePasswordModal;