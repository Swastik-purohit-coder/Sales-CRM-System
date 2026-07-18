import { useEffect, useState } from "react";

import "../components/profile/profile.css";

import profileService from "../services/profileService";

import {
    ProfileHeader,
    ProfileCard,
    ProfileStats,
    AvatarUploader,
    EditProfileModal,
    ChangePasswordModal,
    ProfileActivity,
    ProfileSkeleton,
} from "../components/profile";


const Profile = () => {

    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);

    const [stats, setStats] = useState({});

    const [activities, setActivities] = useState([]);

    const [editOpen, setEditOpen] = useState(false);

    const [passwordOpen, setPasswordOpen] = useState(false);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        setLoading(true);

        try {

            const res =
                await profileService.getProfile();

            const data =
                res.data?.data || res.data;

            setUser(data.user);

            setStats(data.stats || {});

            setActivities(
                data.activities || []
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const handleProfileSave = async (form) => {

        try {

            await profileService.updateProfile(
                form
            );

            setEditOpen(false);

            loadProfile();

        } catch (error) {

            console.log(error);

        }

    };

    const handlePasswordChange = async (
        form
    ) => {

        try {

            await profileService.changePassword(
                form
            );

            setPasswordOpen(false);

            alert(
                "Password updated successfully."
            );

        } catch (error) {

            console.log(error);

        }

    };

    const handleAvatarUpload = async (
        file
    ) => {

        try {

            const formData = new FormData();

            formData.append(
                "avatar",
                file
            );

            await profileService.uploadAvatar(
                formData
            );

            loadProfile();

        } catch (error) {

            console.log(error);

        }

    };

    if (loading)
        return <ProfileSkeleton />;

    return (

        <div className="page-container">

            <div className="page-header">

                <h1>

                    My Profile

                </h1>

                <div>

                    <button
                        onClick={() =>
                            setEditOpen(true)
                        }
                        style={{
                            padding: "8px 16px",
                            backgroundColor: "#2563eb",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: "500",
                            cursor: "pointer",
                            transition: "background-color 0.2s ease"
                        }}
                    >

                        Edit Profile

                    </button>

                    <button
                        onClick={() =>
                            setPasswordOpen(true)
                        }
                        style={{
                            padding: "8px 16px",
                            backgroundColor: "#f3f4f6",
                            color: "#374151",
                            border: "1px solid #d1d5db",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: "500",
                            cursor: "pointer",
                            marginLeft: 10,
                            transition: "background-color 0.2s ease"
                        }}
                    >

                        Change Password

                    </button>

                </div>

            </div>

            <AvatarUploader
                currentAvatar={
                    user?.avatar
                }
                onUpload={
                    handleAvatarUpload
                }
            />

            <ProfileHeader
                user={user}
            />

            <ProfileStats
                stats={stats}
            />

            <ProfileCard
                user={user}
            />

            <ProfileActivity
                activities={
                    activities
                }
            />

            <EditProfileModal
                open={editOpen}
                onClose={() =>
                    setEditOpen(false)
                }
                user={user}
                onSave={
                    handleProfileSave
                }
            />

            <ChangePasswordModal
                open={passwordOpen}
                onClose={() =>
                    setPasswordOpen(false)
                }
                onSave={
                    handlePasswordChange
                }
            />

        </div>

    );

};

export default Profile;