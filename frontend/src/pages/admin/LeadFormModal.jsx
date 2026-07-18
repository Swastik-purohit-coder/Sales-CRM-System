import { useState } from "react";

import leadService from "../../services/leadService";

const LeadFormModal = ({
    close,
    refresh,
}) => {

    const [form, setForm] =
        useState({

            name: "",

            email: "",

            phone: "",

            company: "",

        });

    const submit = async () => {

        await leadService.createLead(form);

        refresh();

        close();

    };

    return (

        <div className="modal">

            <h2>

                Create Lead

            </h2>

            {Object.keys(form).map((key) => (

                <input
                    key={key}
                    placeholder={key}
                    value={form[key]}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            [key]:
                                e.target.value,
                        })
                    }
                />

            ))}

            <button
                onClick={submit}
            >

                Save

            </button>

        </div>

    );

};

export default LeadFormModal;