import LeadRow from "./LeadRow";

const LeadTable = ({
    leads = [],
    loading,
    onEdit,
    onAssign,
    onStatus,
    onView,
}) => {

    if (loading) {

        return <p>Loading...</p>;

    }

    return (

        <table className="crm-table">

            <thead>

                <tr>

                    <th>Name</th>

                    <th>Company</th>

                    <th>Email</th>

                    <th>Status</th>

                    <th>Priority</th>

                    <th>Source</th>

                    <th>Assigned</th>

                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {leads.map((lead) => (

                    <LeadRow
                        key={lead._id}
                        lead={lead}
                        onEdit={onEdit}
                        onAssign={onAssign}
                        onStatus={onStatus}
                        onView={onView}
                    />

                ))}

            </tbody>

        </table>

    );

};

export default LeadTable;