const LeadTimeline = ({
    timeline = [],
}) => {

    return (

        <div className="timeline">

            <h3>

                Timeline

            </h3>

            {timeline.length === 0 && (

                <p>

                    No Activities

                </p>

            )}

            {timeline.map((item) => (

                <div
                    key={item._id}
                    className="timeline-item"
                >

                    <strong>

                        {item.action}

                    </strong>

                    <p>

                        {item.description}

                    </p>

                    <small>

                        {item.createdAt}

                    </small>

                </div>

            ))}

        </div>

    );

};

export default LeadTimeline;