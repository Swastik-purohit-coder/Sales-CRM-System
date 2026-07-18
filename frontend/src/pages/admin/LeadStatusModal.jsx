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
    lead,
    close,
    refresh,
}) => {

    const [status, setStatus] =
        useState(lead.status);

    const save = async () => {

        await leadService.updateStatus(
            lead._id,
            status
        );

        refresh();

        close();

    };

    return (

        <div className="modal">

            <h3>

                Update Status

            </h3>

            <select
                value={status}
                onChange={(e) =>
                    setStatus(e.target.value)
                }
            >

                {statuses.map((item) => (

                    <option
                        key={item}
                    >

                        {item}

                    </option>

                ))}

            </select>

            <button
                onClick={save}
            >

                Save

            </button>

        </div>

    );

};

export default LeadStatusModal;