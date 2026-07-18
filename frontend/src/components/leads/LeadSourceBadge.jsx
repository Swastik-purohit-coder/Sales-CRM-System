const colors = {

    WEBSITE: "#2563eb",

    FACEBOOK: "#1d4ed8",

    INSTAGRAM: "#ec4899",

    REFERRAL: "#16a34a",

    LINKEDIN: "#0a66c2",

};

const LeadSourceBadge = ({
    source,
}) => {

    return (

        <span
            style={{
                color: "white",
                background:
                    colors[source] ||
                    "#6b7280",
                padding: "5px 10px",
                borderRadius: 6,
            }}
        >

            {source}

        </span>

    );

};

export default LeadSourceBadge;