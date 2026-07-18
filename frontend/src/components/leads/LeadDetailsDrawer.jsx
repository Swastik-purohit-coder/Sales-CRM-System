const LeadDetailsDrawer = ({
    open,
    close,
    lead,
}) => {

    if (!open || !lead) return null;

    return (

        <div className="drawer">

            <div className="drawer-header">

                <h2>

                    Lead Details

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

                    {lead.name}

                </p>

                <p>

                    <strong>Email:</strong>

                    {lead.email}

                </p>

                <p>

                    <strong>Phone:</strong>

                    {lead.phone}

                </p>

                <p>

                    <strong>Company:</strong>

                    {lead.company}

                </p>

                <p>

                    <strong>Status:</strong>

                    {lead.status}

                </p>

                <p>

                    <strong>Priority:</strong>

                    {lead.priority}

                </p>

                <p>

                    <strong>Source:</strong>

                    {lead.source}

                </p>

            </div>

        </div>

    );

};

export default LeadDetailsDrawer;