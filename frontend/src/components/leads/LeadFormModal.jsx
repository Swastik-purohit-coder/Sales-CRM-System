import { useEffect, useState } from "react";
import leadService from "../../services/leadService";

const initialState = {
    name: "",
    email: "",
    phone: "",
    company: "",
    source: "WEBSITE",
    priority: "MEDIUM",
};

const LeadFormModal = ({
    open,
    close,
    refresh,
    editLead,
}) => {

    const [form, setForm] = useState(initialState);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (editLead) {

            setForm({
                name: editLead.name,
                email: editLead.email,
                phone: editLead.phone,
                company: editLead.company,
                source: editLead.source,
                priority: editLead.priority,
            });

        } else {

            setForm(initialState);

        }

    }, [editLead]);

    if (!open) return null;

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const submit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            if (editLead) {

                await leadService.updateLead(
                    editLead._id,
                    form
                );

            } else {

                await leadService.createLead(form);

            }

            refresh();

            close();

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>

                    {editLead
                        ? "Update Lead"
                        : "Create Lead"}

                </h2>

                <form onSubmit={submit}>

                    <input
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <input
                        name="phone"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={handleChange}
                    />

                    <input
                        name="company"
                        placeholder="Company"
                        value={form.company}
                        onChange={handleChange}
                    />

                    <select
                        name="source"
                        value={form.source}
                        onChange={handleChange}
                    >

                        <option>WEBSITE</option>

                        <option>FACEBOOK</option>

                        <option>INSTAGRAM</option>

                        <option>LINKEDIN</option>

                        <option>REFERRAL</option>

                    </select>

                    <select
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                    >

                        <option>HIGH</option>

                        <option>MEDIUM</option>

                        <option>LOW</option>

                    </select>

                    <div className="modal-actions">

                        <button type="submit">

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

export default LeadFormModal;