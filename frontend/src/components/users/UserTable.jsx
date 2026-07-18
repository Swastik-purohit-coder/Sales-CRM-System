import UserRow from "./UserRow";

const UserTable = ({
    users = [],
    loading,
    onEdit,
    onDelete,
    onStatus,
}) => {

    if (loading) {

        return <p>Loading...</p>;

    }

    return (

        <table className="crm-table">

            <thead>

                <tr>

                    <th>Name</th>

                    <th>Email</th>

                    <th>Role</th>

                    <th>Status</th>

                    <th>Phone</th>

                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {users.map((user) => (

                    <UserRow
                        key={user._id}
                        user={user}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onStatus={onStatus}
                    />

                ))}

            </tbody>

        </table>

    );

};

export default UserTable;