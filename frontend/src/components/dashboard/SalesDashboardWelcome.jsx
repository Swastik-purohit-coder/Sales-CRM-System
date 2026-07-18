const SalesDashboardWelcome = ({
    user,
}) => {

    return (

        <div className="dashboard-welcome">

            <h1>

                Welcome

                {user?.fullName
                    ? `, ${user.fullName}`
                    : ""}

            </h1>

            <p>

                Manage leads,
                conversations,
                activities
                and reports.

            </p>

        </div>

    );

};

export default SalesDashboardWelcome;