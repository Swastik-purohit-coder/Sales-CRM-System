const NotificationSkeleton = () => {

    return (

        <div>

            {Array.from({
                length: 6,
            }).map((_, i) => (

                <div
                    key={i}
                    style={{
                        height: 70,
                        background:
                            "#f1f5f9",
                        marginBottom: 15,
                        borderRadius: 8,
                    }}
                />

            ))}

        </div>

    );

};

export default NotificationSkeleton;