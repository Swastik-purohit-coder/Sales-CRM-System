const PerformanceTable = ({
    executives = [],
}) => {

    return (

        <table className="crm-table">

            <thead>

                <tr>

                    <th>

                        Executive

                    </th>

                    <th>

                        Assigned

                    </th>

                    <th>

                        Won

                    </th>

                    <th>

                        Lost

                    </th>

                    <th>

                        Revenue

                    </th>

                </tr>

            </thead>

            <tbody>

                {executives.map((user) => (

                    <tr key={user._id}>

                        <td>

                            {user.fullName}

                        </td>

                        <td>

                            {user.assigned}

                        </td>

                        <td>

                            {user.won}

                        </td>

                        <td>

                            {user.lost}

                        </td>

                        <td>

                            ₹{user.revenue}

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    );

};

export default PerformanceTable;