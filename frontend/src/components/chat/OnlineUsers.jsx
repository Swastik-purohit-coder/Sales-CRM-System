const OnlineUsers = ({
    users = [],
}) => {

    return (

        <div className="online-users">

            <h4>

                Online Users

            </h4>

            {users.map((user) => (

                <div
                    key={user._id}
                    className="online-user"
                >

                    <span
                        className="online-dot"
                    ></span>

                    {user.fullName}

                </div>

            ))}

        </div>

    );

};

export default OnlineUsers;