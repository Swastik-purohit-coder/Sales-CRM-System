const LeadFilters = ({
    filters,
    setFilters,
}) => {

    return (

        <div className="lead-filters">

            <input
                placeholder="Search..."
                value={filters.search}
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        search: e.target.value,
                    })
                }
            />

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

                    All

                </option>

                <option>

                    NEW

                </option>

                <option>

                    CONTACTED

                </option>

                <option>

                    QUALIFIED

                </option>

                <option>

                    WON

                </option>

                <option>

                    LOST

                </option>

            </select>

        </div>

    );

};

export default LeadFilters;