const DateRangeFilter = ({
    value,
    onChange,
}) => {

    return (

        <select
            value={value}
            onChange={(e) =>
                onChange(e.target.value)
            }
        >

            <option value="TODAY">

                Today

            </option>

            <option value="WEEK">

                Last Week

            </option>

            <option value="MONTH">

                Last Month

            </option>

            <option value="YEAR">

                Last Year

            </option>

        </select>

    );

};

export default DateRangeFilter;