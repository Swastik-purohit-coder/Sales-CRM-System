const ProfileActivity = ({
    activities = [],
}) => {

    return (

        <div className="profile-card">

            <h3>

                Recent Activities

            </h3>

            {activities.length === 0 ? (

                <p>

                    No recent activity.

                </p>

            ) : (

                <ul className="activity-list">

                    {activities.map((activity) => (

                        <li key={activity._id}>

                            <strong>

                                {activity.action}

                            </strong>

                            <br />

                            <small>

                                {new Date(
                                    activity.createdAt
                                ).toLocaleString()}

                            </small>

                        </li>

                    ))}

                </ul>

            )}

        </div>

    );

};

export default ProfileActivity;