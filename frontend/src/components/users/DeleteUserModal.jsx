import userService from "../../services/userService";

const DeleteUserModal = ({
    open,
    close,
    refresh,
    user,
}) => {

    if (!open || !user) return null;

    const remove = async () => {

        await userService.deleteUser(user._id);

        refresh();

        close();

    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>

                    Delete User

                </h2>

                <p>

                    Are you sure you want to
                    delete

                    <strong>

                        {" "}
                        {user.fullName}

                    </strong>

                    ?

                </p>

                <div className="modal-actions">

                    <button
                        onClick={remove}
                    >

                        Delete

                    </button>

                    <button
                        onClick={close}
                    >

                        Cancel

                    </button>

                </div>

            </div>

        </div>

    );

};

export default DeleteUserModal;