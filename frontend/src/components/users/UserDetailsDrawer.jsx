const UserDetailsDrawer = ({
    open,
    close,
    user,
}) => {

    if (!open || !user) return null;

    return (

        <div className="drawer">

            <div className="drawer-header">

                <h2>

                    User Details

                </h2>

                <button
                    onClick={close}
                >

                    X

                </button>

            </div>

            <div className="drawer-body">

                <p>

                    <strong>Name:</strong>

                    {user.fullName}

                </p>

                <p>

                    <strong>Email:</strong>

                    {user.email}

                </p>

                <p>

                    <strong>Phone:</strong>

                    {user.phone}

                </p>

                <p>

                    <strong>Role:</strong>

                    {user.role}

                </p>

                <p>

                    <strong>Status:</strong>

                    {user.status}

                </p>

            </div>

        </div>

    );

};

export default UserDetailsDrawer;