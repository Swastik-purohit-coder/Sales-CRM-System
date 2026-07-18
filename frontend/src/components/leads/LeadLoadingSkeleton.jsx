const LeadLoadingSkeleton = () => {

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

                {Array.from({ length: 8 }).map((_, index) => (

                    <tr key={index}>

                        <td>Loading...</td>
                        <td>Loading...</td>
                        <td>Loading...</td>
                        <td>Loading...</td>
                        <td>Loading...</td>
                        <td>Loading...</td>
                        <td>Loading...</td>
                        <td>Loading...</td>

                    </tr>

                ))}

            </tbody>

        </table>

    );

};

export default LeadLoadingSkeleton;