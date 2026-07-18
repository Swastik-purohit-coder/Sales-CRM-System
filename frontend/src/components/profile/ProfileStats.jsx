const ProfileStats = ({ stats }) => {

    const items = [

        {
            title: "Assigned Leads",
            value: stats?.assigned || 0,
        },

        {
            title: "Won Leads",
            value: stats?.won || 0,
        },

        {
            title: "Lost Leads",
            value: stats?.lost || 0,
        },

        {
            title: "Messages",
            value: stats?.messages || 0,
        },

    ];

    return (

        <div className="profile-stats">

            {items.map((item) => (

                <div
                    key={item.title}
                    className="profile-stat-card"
                >

                    <h4>{item.title}</h4>

                    <h2>{item.value}</h2>

                </div>

            ))}

        </div>

    );

};

export default ProfileStats;