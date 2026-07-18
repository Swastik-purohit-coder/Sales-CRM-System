const UserFilters = ({
    filters,
    setFilters,
}) => {
    return (
        <div className="user-filters">

            <input
                placeholder="Search user..."
                value={filters.search}
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        search: e.target.value,
                    })
                }
            />

            <select
                value={filters.role}
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        role: e.target.value,
                    })
                }
            >
                <option value="">
                    All Roles
                </option>

                <option value="ADMIN">
                    Admin
                </option>

                <option value="SALES">
                    Sales
                </option>

            </select>

            <select
                value={filters.status}
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        status: e.target.value,
                    })
                }
            >

                <option value="">
                    All Status
                </option>

                <option value="ACTIVE">
                    Active
                </option>

                <option value="INACTIVE">
                    Inactive
                </option>

            </select>

        </div>
    );
};

export default UserFilters;