import { useState } from "react";

const usePagination = (initialPage = 1) => {
    const [page, setPage] = useState(initialPage);

    const next = () => setPage((p) => p + 1);

    const previous = () =>
        setPage((p) => Math.max(1, p - 1));

    const reset = () => setPage(1);

    return {
        page,
        setPage,
        next,
        previous,
        reset,
    };
};

export default usePagination;