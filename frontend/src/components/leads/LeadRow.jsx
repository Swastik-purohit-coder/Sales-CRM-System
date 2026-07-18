import LeadStatusBadge from "./LeadStatusBadge";
import LeadPriorityBadge from "./LeadPriorityBadge";
import LeadSourceBadge from "./LeadSourceBadge";

const LeadRow = ({
    lead,
    onEdit,
    onAssign,
    onStatus,
    onView,
}) => {

    return (

        <tr>

            <td>

                {lead.name}

            </td>

            <td>

                {lead.company}

            </td>

            <td>

                {lead.email}

            </td>

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

                <LeadSourceBadge
                    source={lead.source}
                />

            </td>

            <td>

                {lead.assignedTo?.fullName ||
                    "-"}

            </td>

            <td>

                <button
                    onClick={() =>
                        onView(lead)
                    }
                >

                    View

                </button>

                <button
                    onClick={() =>
                        onEdit(lead)
                    }
                >

                    Edit

                </button>

                <button
                    onClick={() =>
                        onAssign(lead)
                    }
                >

                    Assign

                </button>

                <button
                    onClick={() =>
                        onStatus(lead)
                    }
                >

                    Status

                </button>

            </td>

        </tr>

    );

};

export default LeadRow;