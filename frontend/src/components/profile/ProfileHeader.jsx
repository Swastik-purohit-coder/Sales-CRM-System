const ProfileHeader = ({ user }) => {

    return (

        <div className="profile-header">

            <img
                src={
                    user?.avatar ||
                    "https://ui-avatars.com/api/?name=User"
                }
                alt="avatar"
                className="profile-avatar"
            />

            <div>

                <h2>{user?.fullName}</h2>

                <p>{user?.email}</p>

                <span className="profile-role">

                    {user?.role}

                </span>

            </div>

        </div>

    );

};

export default ProfileHeader;