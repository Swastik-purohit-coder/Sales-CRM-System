import { useEffect, useState } from "react";

import userService from "../../services/userService";

import UserTable from "../../components/users/UserTable";
import UserFilters from "../../components/users/UserFilters";
import UserFormModal from "../../components/users/UserFormModal";
import DeleteUserModal from "../../components/users/DeleteUserModal";
import UserDetailsDrawer from "../../components/users/UserDetailsDrawer";
import UserLoadingSkeleton from "../../components/users/UserLoadingSkeleton";
import UserEmptyState from "../../components/users/UserEmptyState";
import UserPagination from "../../components/users/UserPagination";

const Users = () => {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const [filters, setFilters] = useState({
        search: "",
        role: "",
        status: "",
    });

    const [showForm, setShowForm] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

    const [showDrawer, setShowDrawer] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {

        loadUsers();

    }, [page, filters]);

    const loadUsers = async () => {

        setLoading(true);

        try {

            const res = await userService.getUsers({
                page,
                ...filters,
            });

            const data = res.data?.data || res.data;

            setUsers(data.users || data);

            setTotalPages(
                data.totalPages || 1
            );

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    const openCreateModal = () => {

        setSelectedUser(null);

        setShowForm(true);

    };

    const openEditModal = (user) => {

        setSelectedUser(user);

        setShowForm(true);

    };

    const openDeleteModal = (user) => {

        setSelectedUser(user);

        setShowDelete(true);

    };

    const openDrawer = (user) => {

        setSelectedUser(user);

        setShowDrawer(true);

    };

    const toggleStatus = async (user) => {

        try {

            await userService.toggleStatus(
                user._id
            );

            loadUsers();

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="page-container">

            <div className="page-header">

                <div>

                    <h1>

                        Users

                    </h1>

                    <p>

                        Manage all CRM users.

                    </p>

                </div>

                <button
                    onClick={openCreateModal}
                >

                    + Add User

                </button>

            </div>

            <UserFilters
                filters={filters}
                setFilters={setFilters}
            />

            {loading ? (

                <UserLoadingSkeleton />

            ) : users.length === 0 ? (

                <UserEmptyState />

            ) : (

                <>

                    <div className="table-container-responsive">

                        <UserTable
                            users={users}
                            loading={loading}
                            onEdit={openEditModal}
                            onDelete={openDeleteModal}
                            onStatus={toggleStatus}
                            onView={openDrawer}
                        />

                    </div>

                    <UserPagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />

                </>

            )}

            <UserFormModal
                open={showForm}
                close={() => setShowForm(false)}
                refresh={loadUsers}
                editUser={selectedUser}
            />

            <DeleteUserModal
                open={showDelete}
                close={() => setShowDelete(false)}
                refresh={loadUsers}
                user={selectedUser}
            />

            <UserDetailsDrawer
                open={showDrawer}
                close={() => setShowDrawer(false)}
                user={selectedUser}
            />

        </div>

    );

};

export default Users;