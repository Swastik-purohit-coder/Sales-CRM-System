import { useState } from "react";

const AvatarUploader = ({
    currentAvatar,
    onUpload,
}) => {

    const [preview, setPreview] = useState(currentAvatar);

    const handleChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setPreview(URL.createObjectURL(file));

        onUpload(file);

    };

    return (

        <div className="avatar-uploader">

            <img
                src={
                    preview ||
                    "https://ui-avatars.com/api/?name=User"
                }
                alt="avatar"
                className="profile-avatar"
            />

            <label className="upload-btn">

                Change Photo

                <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleChange}
                />

            </label>

        </div>

    );

};

export default AvatarUploader;