import { useEffect, useState } from "react";

import userService from "../../services/userService";
import leadService from "../../services/leadService";

const LeadAssignModal = ({
    lead,
    close,
    refresh,
}) => {

    const [users, setUsers] =
        useState([]);

    const [assignedTo, setAssignedTo] =
        useState("");

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        const res =
            await userService.getUsers();

        setUsers(res.data?.data || []);

    };

    const submit = async () => {

        await leadService.assignLead(
            lead._id,
            assignedTo
        );

        refresh();

        close();

    };

    return (

        <div className="modal">

            <h3>

                Assign Lead

            </h3>

            <select
                onChange={(e) =>
                    setAssignedTo(e.target.value)
                }
            >

                <option>

                    Select User

                </option>

                {users.map((u) => (

                    <option
                        key={u._id}
                        value={u._id}
                    >

                        {u.fullName}

                    </option>

                ))}

            </select>

            <button
                onClick={submit}
            >

                Assign

            </button>

        </div>

    );

};

export default LeadAssignModal;