const ImagePreview = ({
    file,
    remove,
}) => {

    if (!file) return null;

    return (

        <div className="image-preview">

            <img
                src={URL.createObjectURL(file)}
                alt=""
            />

            <button
                onClick={remove}
            >

                ✕

            </button>

        </div>

    );

};

export default ImagePreview;