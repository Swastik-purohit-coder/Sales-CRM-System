const ExportPDFButton = ({
    onExport,
}) => {

    return (

        <button
            className="export-btn pdf-btn"
            onClick={onExport}
        >

            Export PDF

        </button>

    );

};

export default ExportPDFButton;