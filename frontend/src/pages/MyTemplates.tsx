import { authContext } from "@/App";
import DisplayTemplates from "@/components/All templates/DisplayTemplates";
import { getUserTemplates } from "@/lib/http";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

const MyTemplatesPage = () => {
    const [pageQuery, setPageQuery] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const { user } = useContext(authContext);

    const {
        isPending,
        isError,
        error,
        data,
    } = useQuery({
        queryKey: ["template", user?.id, pageQuery],
        queryFn: ({ signal }) => getUserTemplates({ pageQuery, signal }),
        placeholderData: keepPreviousData,
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
            type="user"
        />
    );
}

export default MyTemplatesPage