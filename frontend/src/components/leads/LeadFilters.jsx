const LeadFilters = ({
    filters,
    setFilters,
}) => {

    return (

        <div className="user-filters">

            <input
                placeholder="Search Lead"
                value={filters.search}
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        search:
                            e.target.value,
                    })
                }
            />

            <select
                value={filters.status}
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        status:
                            e.target.value,
                    })
                }
            >

                <option value="">

                    All Status

                </option>

                <option value="NEW">

                    NEW

                </option>

                <option value="CONTACTED">

                    CONTACTED

                </option>

                <option value="QUALIFIED">

                    QUALIFIED

                </option>

                <option value="WON">

                    WON

                </option>

                <option value="LOST">

                    LOST

                </option>

            </select>

            <select
                value={filters.priority}
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        priority:
                            e.target.value,
                    })
                }
            >

                <option value="">

                    All Priority

                </option>

                <option value="HIGH">

                    High

                </option>

                <option value="MEDIUM">

                    Medium

                </option>

                <option value="LOW">

                    Low

                </option>

            </select>

        </div>

    );

};

export default LeadFilters;