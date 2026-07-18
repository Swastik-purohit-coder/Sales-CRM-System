import { useState } from "react";
import leadService from "../../services/leadService";

const statuses = [
    "NEW",
    "CONTACTED",
    "QUALIFIED",
    "WON",
    "LOST",
];

const LeadStatusModal = ({
    open,
    close,
    lead,
    refresh,
}) => {

    const [status, setStatus] = useState(
        lead?.status || "NEW"
    );

    if (!open || !lead) return null;

    const submit = async () => {

        await leadService.updateStatus(
            lead._id,
            status
        );

        refresh();

        close();

    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>

                    Update Status

                </h2>

                <select
                    value={status}
                    onChange={(e) =>
                        setStatus(
                            e.target.value
                        )
                    }
                >

                    {statuses.map((item) => (

                        <option
                            key={item}
                            value={item}
                        >

                            {item}

                        </option>

                    ))}

                </select>

                <div className="modal-actions">

                    <button
                        onClick={submit}
                    >

                        Save

                    </button>

                    <button
                        onClick={close}
                    >

                        Cancel

                    </button>

                </div>

            </div>

        </div>

    );

};

export default LeadStatusModal;