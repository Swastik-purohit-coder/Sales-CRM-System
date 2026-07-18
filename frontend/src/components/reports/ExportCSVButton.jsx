const ExportCSVButton = ({
    onExport,
}) => {

    return (

        <button
            className="export-btn csv-btn"
            onClick={onExport}
        >

            Export CSV

        </button>

    );

};

export default ExportCSVButton;