const ReportSkeleton = () => {

    return (

        <div>

            {Array.from({
                length: 6,
            }).map((_, i) => (

                <div
                    key={i}
                    style={{
                        height: 140,
                        marginBottom: 20,
                        borderRadius: 10,
                        background: "#f1f5f9",
                    }}
                />

            ))}

        </div>

    );

};

export default ReportSkeleton;