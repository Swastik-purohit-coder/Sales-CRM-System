import { useState } from "react";

import LeadAssignModal from "./LeadAssignModal";
import LeadStatusModal from "./LeadStatusModal";

import LeadPriorityBadge from "./LeadPriorityBadge";
import LeadStatusBadge from "./LeadStatusBadge";

const LeadTable = ({
    leads = [],
    loading,
    refresh,
}) => {

    const [selectedLead, setSelectedLead] =
        useState(null);

    const [assignModal, setAssignModal] =
        useState(false);

    const [statusModal, setStatusModal] =
        useState(false);

    if (loading) {

        return <p>Loading...</p>;

    }

    return (

        <table className="crm-table">

            <thead>

                <tr>

                    <th>Name</th>

                    <th>Email</th>

                    <th>Phone</th>

                    <th>Status</th>

                    <th>Priority</th>

                    <th>Assigned</th>

                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {leads.map((lead) => (

                    <tr key={lead._id}>

                        <td>{lead.name}</td>

                        <td>{lead.email}</td>

                        <td>{lead.phone}</td>

                        <td>

                            <LeadStatusBadge
                                status={lead.status}
                            />

                        </td>

                        <td>

                            <LeadPriorityBadge
                                priority={lead.priority}
                            />

                        </td>

                        <td>

                            {lead.assignedTo?.fullName}

                        </td>

                        <td>

                            <button
                                onClick={() => {

                                    setSelectedLead(lead);

                                    setAssignModal(true);

                                }}
                            >

                                Assign

                            </button>

                            <button
                                onClick={() => {

                                    setSelectedLead(lead);

                                    setStatusModal(true);

                                }}
                            >

                                Status

                            </button>

                        </td>

                    </tr>

                ))}

            </tbody>

            {assignModal && (

                <LeadAssignModal
                    lead={selectedLead}
                    close={() => setAssignModal(false)}
                    refresh={refresh}
                />

            )}

            {statusModal && (

                <LeadStatusModal
                    lead={selectedLead}
                    close={() => setStatusModal(false)}
                    refresh={refresh}
                />

            )}

        </table>

    );

};

export default LeadTable;