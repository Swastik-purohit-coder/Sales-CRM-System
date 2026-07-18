const DashboardStatCard = ({
    title,
    value,
}) => {

    return (

        <div className="stat-card">

            <h4>{title}</h4>

            <h2>{value ?? 0}</h2>

        </div>

    );

};

export default DashboardStatCard;