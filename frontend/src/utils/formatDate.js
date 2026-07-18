export const formatDateTime = (value) => {
    if (!value) {
        return "";
    }

    return new Date(value).toLocaleString();
};

export const formatDate = (value) => {
    if (!value) {
        return "";
    }

    return new Date(value).toLocaleDateString();
};
