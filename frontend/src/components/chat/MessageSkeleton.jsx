const MessageSkeleton = () => {

    return (

        <div
            style={{
                padding: 20,
            }}
        >

            {Array.from({
                length: 8,
            }).map((_, index) => (

                <div
                    key={index}
                    style={{
                        width:
                            Math.random() * 300 +
                            100,
                        height: 20,
                        background:
                            "#e5e7eb",
                        marginBottom: 15,
                        borderRadius: 8,
                    }}
                />

            ))}

        </div>

    );

};

export default MessageSkeleton;