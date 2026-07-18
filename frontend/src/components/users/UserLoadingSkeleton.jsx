const UserLoadingSkeleton = () => {

    return (

        <table className="crm-table">

            <thead>

                <tr>

                    <th>Name</th>

                    <th>Email</th>

                    <th>Role</th>

                    <th>Status</th>

                    <th>Phone</th>

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

                    </tr>

                ))}

            </tbody>

        </table>

    );

};

export default UserLoadingSkeleton;