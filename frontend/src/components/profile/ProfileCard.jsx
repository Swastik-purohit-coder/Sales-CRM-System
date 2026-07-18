const ProfileCard = ({ user }) => {

    return (

        <div className="profile-card">

            <h3>Personal Information</h3>

            <div className="profile-info">

                <p>

                    <strong>Name :</strong>

                    {user?.fullName}

                </p>

                <p>

                    <strong>Email :</strong>

                    {user?.email}

                </p>

                <p>

                    <strong>Phone :</strong>

                    {user?.phone || "-"}

                </p>

                <p>

                    <strong>Department :</strong>

                    {user?.department || "-"}

                </p>

                <p>

                    <strong>Address :</strong>

                    {user?.address || "-"}

                </p>

                <p>

                    <strong>Joined :</strong>

                    {user?.createdAt?.slice(0,10)}

                </p>

            </div>

        </div>

    );

};

export default ProfileCard;