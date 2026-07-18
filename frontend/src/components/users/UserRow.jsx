import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";

const UserRow = ({
    user,
    onEdit,
    onDelete,
    onStatus,
}) => {

    return (

        <tr>

            <td>{user.fullName}</td>

            <td>{user.email}</td>

            <td>

                <UserRoleBadge
                    role={user.role}
                />

            </td>

            <td>

                <UserStatusBadge
                    status={user.status}
                />

            </td>

            <td>

                {user.phone}

            </td>

            <td>

                <button
                    onClick={() =>
                        onEdit(user)
                    }
                >
                    Edit
                </button>

                <button
                    onClick={() =>
                        onStatus(user)
                    }
                >
                    Status
                </button>

                <button
                    onClick={() =>
                        onDelete(user)
                    }
                >
                    Delete
                </button>

            </td>

        </tr>

    );

};

export default UserRow;