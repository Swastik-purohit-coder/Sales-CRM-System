const DashboardTable = ({
    title,
    leads = [],
}) => {

    return (

        <div className="dashboard-table">

            <h3>

                {title}

            </h3>

            <table>

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Status</th>

                        <th>Assigned</th>

                    </tr>

                </thead>

                <tbody>

                    {leads?.map((lead) => (

                        <tr
                            key={lead._id}
                        >

                            <td>

                                {lead.name}

                            </td>

                            <td>

                                {lead.email}

                            </td>

                            <td>

                                {lead.status}

                            </td>

                            <td>

                                {lead.assignedTo?.fullName}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

};

export default DashboardTable;