const ProfileSkeleton = () => {

    return (

        <div>

            {Array.from({ length: 5 }).map((_, i) => (

                <div
                    key={i}
                    style={{
                        height: 120,
                        background: "#f1f5f9",
                        borderRadius: 10,
                        marginBottom: 20,
                    }}
                />

            ))}

        </div>

    );

};

export default ProfileSkeleton;