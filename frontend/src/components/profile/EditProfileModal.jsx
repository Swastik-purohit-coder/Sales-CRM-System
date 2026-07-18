import { useState, useEffect } from "react";

const EditProfileModal = ({
    open,
    onClose,
    user,
    onSave,
}) => {

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        address: "",
    });

    useEffect(() => {

        if (user) {

            setForm({

                fullName: user.fullName || "",

                phone: user.phone || "",

                address: user.address || "",

            });

        }

    }, [user]);

    if (!open) return null;

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const submit = () => {

        onSave(form);

    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Edit Profile</h2>

                <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                />

                <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                />

                <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Address"
                />

                <div className="modal-actions">

                    <button onClick={submit}>

                        Save

                    </button>

                    <button onClick={onClose}>

                        Cancel

                    </button>

                </div>

            </div>

        </div>

    );

};

export default EditProfileModal;