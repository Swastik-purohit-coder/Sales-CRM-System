import { useRef } from "react";

const FileUpload = ({ onUpload }) => {

    const inputRef = useRef();

    const handleChange = (e) => {

        const file = e.target.files[0];

        if (file) {

            onUpload(file);

        }

    };

    return (

        <>

            <button
                type="button"
                onClick={() =>
                    inputRef.current.click()
                }
            >

                📎

            </button>

            <input
                ref={inputRef}
                type="file"
                hidden
                onChange={handleChange}
            />

        </>

    );

};

export default FileUpload;