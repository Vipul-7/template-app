import { getTemplates } from "@/lib/http";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DisplayTemplates from "@/components/DisplayTemplates";

const HomePage = () => {
    const [pageQuery, setPageQuery] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const {
        isPending,
        isError,
        error,
        data,
    } = useQuery({
        queryKey: ["template", pageQuery],
        queryFn: ({ signal }) => getTemplates({ pageQuery, signal }),
        placeholderData: keepPreviousData
    });

    useEffect(() => {
        if (data) {
            setTotalPages(data.totalPageCount);
        }
    }, [data]);

    return (
        <DisplayTemplates
            pageQuery={pageQuery}
            setPageQuery={setPageQuery}
            totalPages={totalPages}
            data={data}
            isPending={isPending}
            isError={isError}
            error={error}
            type="common"
        />
    )
};

export default HomePage;
