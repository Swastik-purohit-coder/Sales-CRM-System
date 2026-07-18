const DashboardCards = ({ stats = {} }) => {

    const cards = [

        {
            title: "Total Leads",
            value: stats.totalLeads || 0,
            color: "#2563eb",
        },

        {
            title: "Won Leads",
            value: stats.wonLeads || 0,
            color: "#16a34a",
        },

        {
            title: "Lost Leads",
            value: stats.lostLeads || 0,
            color: "#dc2626",
        },

        {
            title: "Revenue",
            value: `₹${stats.revenue || 0}`,
            color: "#ca8a04",
        },

    ];

    return (

        <div className="report-cards">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className="report-card"
                >

                    <h4>

                        {card.title}

                    </h4>

                    <h2
                        style={{
                            color: card.color,
                        }}
                    >

                        {card.value}

                    </h2>

                </div>

            ))}

        </div>

    );

};

export default DashboardCards;